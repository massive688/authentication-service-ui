import { connect } from 'dva';
import React, { Dispatch } from 'react';
import { OauthType, ResultType } from '@/pages/oauth/model';
import { Button, Spin } from 'antd';
import { md5Encrypt } from '@/utils/encrypt';
import QRCode from 'qrcode.react';
import { oauthLoading } from './index.less';

declare interface OauthProps {
  list:OauthType[];
  name: string;
  dispatch: Dispatch<any>;
  loading: boolean;
  route: any;
  routes: any;
  history: any;
  location: any;
  match: any;
  loadedResult: ResultType;
}
declare interface OauthState {
  url:string;
  type?: string,
  clientId?: string,
  redirectUri?: string,
  responseType?: string,
  codeChallenge?: string,
  codeChallengeMethod?: string,
  scope?: string,
  state?: string,
  safeCode?: string,
  preLoading?: boolean,
}

@connect(({oauth: { list, name, result }, loading}:{
  oauth: { list: OauthType[], name:string, result:ResultType },
  loading: { effects: { [key: string]: boolean } }
})=>({list, name, loadedResult:result, loading: loading.effects['oauth/verification']}))
class Index extends React.Component<OauthProps, OauthState>{

  state:OauthState = {
    preLoading: true,
    url: 'https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&tn=baidu&wd=ts%20react%20qrcode&oq=%2560import%2520%253D%2560%2520is%2520not%2520supported%2520by%2520%2540babel%252Fplugin-transfor%2520m-typescript&rsv_pq=f537b18100048234&rsv_t=9d0fuyx%2BaeEw29G2QKg5bzWVexVicl4VLRvJkK1bmTKmFsGF8LmzLk5aSGg&rqlang=cn&rsv_enter=0&rsv_dl=tb&rsv_btype=t&inputT=13301&rsv_sug3=23&rsv_sug1=8&rsv_sug7=100&rsv_sug2=0&rsv_sug4=14363'
  }

  constructor(props:OauthProps) {
    super(props);
    let {dispatch,match:{params:type},location:
      {
        query: {
            client_id,
            redirect_uri,
            response_type,
            state,
            scope,
            code_challenge,
            code_challenge_method,
            safeCode
          }
      }
    } = props;
    this.setState({type:type})

    //grant authorization
    dispatch({
      type: 'oauth/verification',
      payload: {
        clientId: client_id,
        redirectUri: redirect_uri,
        responseType: response_type,
        scope: scope,
        state:state,
        codeChallenge: code_challenge,
        codeChallengeMethod: code_challenge_method,
        safeCode: safeCode,
      }
    })
  }
  componentDidMount() {
    let Referer = document.referrer;
    console.log(Referer)
    this.props.dispatch({type:'oauth/fetch', payload: {...this.state}})
    setTimeout(this.setPreLoadingFalse,5000)
  }
  setPreLoadingFalse = ()=>{
    this.setState({preLoading: false})
  }
  clickContinueFetch = () => {
  }
  loginWx = () => {
    // let resultUrl = 'https://account.adream.org/cas/loginApi?client_id=wxuser&service=https%3A%2F%2Fedu.adream.org%2Floading&code=001nhL000jBpQL112E000Z6JwX1nhL0w&state=STATE';
    // "001nhL000jBpQL112E000Z6JwX1nhL0w"
    // "011mx2100ThGQL1b0I2004usrT2mx21t"
    // console.log(resultUrl)
  }
  render() {
    const {preLoading, url} = this.state;
    const {loadedResult:{code, message, data, error}, loading} = this.props;
    if (loading) {
      return <div className={oauthLoading}>
        <Spin size={'large'}></Spin>
      </div>
    }
    if (error) {
      return <div>{error}</div>
    }
    if (code !== 2000) {
      // return <div>{message.replace(/(\[|\])/g, '')}</div>
      return <div>{JSON.parse(message||'[]').join(',')}</div>
    }
    return (<div>
      {this.props.name}<b>{this.props.loading?'加載中':'未动'}</b>
      <Button type="primary" onClick={this.clickContinueFetch}>Button</Button>
      <Button type="primary" onClick={this.loginWx}>LoginWx</Button>
      <div>
        <QRCode value={url} style={{margin:'30px'}}
        ></QRCode>
      </div>
    </div>);
  }

}

export default Index;
