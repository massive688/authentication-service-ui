import React from 'react';
import { connect } from 'dva';
import { oauthLoading } from '@/pages/oauth/index.less';
import { Spin } from 'antd';

@connect(
  ({ loading }: { loading: { effects: { [key: string]: boolean } } }) => ({
    loading: loading.effects['user/logout'],
  }),
)
class Logout extends React.Component<any, any> {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/logout',
    });
  }

  render(): React.ReactNode {
    const { loading } = this.props;
    if (loading) {
      return (
        <div className={oauthLoading}>
          <Spin size={'large'}></Spin>
        </div>
      );
    }
    return <span></span>;
  }
}

export default Logout;
