import React, { Dispatch } from 'react';
import { connect } from 'dva';
import { ResultType } from '@/pages/model.data';
import { Button, Checkbox, Col, Form, Input, Row, Spin } from 'antd';
import { md5Encrypt } from '@/utils/encrypt';
import { oauthLoading } from '@/pages/oauth/index.less';
interface LoginProps {
  result: ResultType;
  dispatch: Dispatch<any>;
  loading: boolean;
}
interface LoginState {}
@connect(
  ({
    user: { result },
    loading,
  }: {
    user: { result: ResultType };
    loading: { effects: { [key: string]: boolean } };
  }) => ({
    result,
    loading: loading.effects['oauth/check'],
  }),
)
class Login extends React.Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);
    const { dispatch } = this.props;
    dispatch({
      type: 'user/check',
    });
  }

  componentDidMount(): void {}

  componentDidUpdate(
    prevProps: Readonly<LoginProps>,
    prevState: Readonly<LoginState>,
    snapshot?: any,
  ): void {}

  render(): React.ReactNode {
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };
    const tailLayout = {
      wrapperCol: { offset: 8, span: 16 },
    };
    const { loading } = this.props;
    if (loading) {
      return (
        <div className={oauthLoading}>
          <Spin size={'large'}></Spin>
        </div>
      );
    }

    const onFinish = (values: any) => {
      console.log('Success:', values);
      const { dispatch } = this.props;
      let password = values.password;
      dispatch({
        type: 'user/login',
        payload: { ...values, password: md5Encrypt(password) },
      });
    };

    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
    };

    return (
      <Row justify="center" style={{ marginTop: '20px' }}>
        <Col xs={23} sm={16} md={12} lg={10} xl={8}>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label=""
              name="username"
              rules={[
                {
                  required: true,
                  message: '用户名不能为空/Please input your username!',
                },
              ]}
            >
              <Input placeholder={'请输入用户名/username'} size={'large'} />
            </Form.Item>

            <Form.Item
              label=""
              name="password"
              rules={[
                {
                  required: true,
                  message: '密码不能为空/Please input your password!',
                },
              ]}
            >
              <Input.Password
                placeholder={'请输入密码/password'}
                size={'large'}
              />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                shape="round"
                block
                size={'large'}
                htmlType="submit"
              >
                登 录
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    );
  }
}
export default Login;
