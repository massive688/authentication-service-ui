import { connect } from 'dva';
import React, { Dispatch } from 'react';
import { OauthType } from '@/pages/oauth/model';
import { Button, Spin } from 'antd';
import { md5Encrypt } from '@/utils/encrypt';
import QRCode from 'qrcode.react';
import { oauthLoading } from './index.less';
import dispatcher from '@@/plugin-model/helpers/dispatcher';
import { ResultType } from '@/pages/model.data';

declare interface OauthProps {
  list: OauthType[];
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
  url: string;
  type?: string;
  clientId?: string;
  redirectUri?: string;
  responseType?: string;
  codeChallenge?: string;
  codeChallengeMethod?: string;
  scope?: string;
  state?: string;
  safeCode?: string;
  preLoading?: boolean;
}

@connect(
  ({
    oauth: { list, name, result },
    loading,
  }: {
    oauth: { list: OauthType[]; name: string; result: ResultType };
    loading: { effects: { [key: string]: boolean } };
  }) => ({
    list,
    name,
    loadedResult: result,
    loading: loading.effects['oauth/verification'],
  }),
)
class Index extends React.Component<OauthProps, OauthState> {
  state: OauthState = {
    preLoading: true,
    url: 'https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&tn=baidu&wd=ts%20react%20qrcode&oq=%2560import%2520%253D%2560%2520is%2520not%2520supported%2520by%2520%2540babel%252Fplugin-transfor%2520m-typescript&rsv_pq=f537b18100048234&rsv_t=9d0fuyx%2BaeEw29G2QKg5bzWVexVicl4VLRvJkK1bmTKmFsGF8LmzLk5aSGg&rqlang=cn&rsv_enter=0&rsv_dl=tb&rsv_btype=t&inputT=13301&rsv_sug3=23&rsv_sug1=8&rsv_sug7=100&rsv_sug2=0&rsv_sug4=14363',
  };

  constructor(props: OauthProps) {
    super(props);
    //grant authorization
    let {
      dispatch,
      location: {
        query: {
          client_id,
          redirect_uri,
          response_type,
          state,
          scope,
          code_challenge,
          code_challenge_method,
          safeCode,
        },
      },
    } = this.props;
    dispatch({
      type: 'oauth/verification',
      payload: {
        clientId: client_id,
        redirectUri: redirect_uri,
        responseType: response_type,
        scope: scope,
        state: state,
        codeChallenge: code_challenge,
        codeChallengeMethod: code_challenge_method,
        safeCode: safeCode,
      },
    });
  }
  componentDidMount() {
    const {
      match: { params: type },
    } = this.props;
    this.setState({ type: type });
  }

  componentDidUpdate(
    prevProps: Readonly<OauthProps>,
    prevState: Readonly<OauthState>,
    snapshot?: any,
  ): void {
    const {
      loadedResult: { code, message, data },
      history,
    } = this.props;
    if (code === 2000) {
      if (!data.signed) {
        history.push('sign');
      }
    }
  }

  setPreLoadingFalse = () => {
    this.setState({ preLoading: false });
  };
  clickContinueFetch = () => {};
  noAllow = () => {};
  allowAuthorize = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'oauth/allow',
      callback: (res: any) => {
        let { code, data } = res;
        if (code === 2000) {
          window.location.href = data.redirect;
        }
      },
    });
  };
  render() {
    const { url } = this.state;
    const {
      loadedResult: { code, message, data },
      history,
      loading,
    } = this.props;
    if (loading) {
      return (
        <div className={oauthLoading}>
          <Spin size={'large'}></Spin>
        </div>
      );
    }
    if (code !== 2000) {
      let errmsg = [];
      try {
        errmsg =
          (message && message.startsWith('[') && JSON.parse(message)) ||
          message;
        errmsg = (Array.isArray(errmsg) && errmsg[0]) || errmsg;
      } catch (e) {}
      if (errmsg) {
        return <div>{errmsg}</div>;
      }
    } else {
      switch (data.scope) {
        case 'single':
          this.allowAuthorize();
          return;
        case 'sign-api':
        case 'sign-auth':
          return (
            <div>
              <Button onClick={this.noAllow}>No</Button>
              <Button onClick={this.allowAuthorize}>Allow</Button>
            </div>
          );
      }
    }
    return (
      <div>
        {this.props.name}
        <b>{this.props.loading ? '加載中' : '未动'}</b>
        <Button type="primary" onClick={this.clickContinueFetch}>
          Button
        </Button>
        <div>
          <QRCode value={url} style={{ margin: '30px' }} />
        </div>
      </div>
    );
  }
}

export default Index;
