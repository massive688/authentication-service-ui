import React from 'react';
import { connect } from 'dva';
import { ResultType } from '@/pages/model.data';
import { Button, Checkbox, Form, Input } from 'antd';
interface LoginProps {
  result: ResultType;
}
interface LoginState {}
@connect(({ user: result }: { user: { result: ResultType } }) => ({ result }))
class Login extends React.Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);
  }

  render(): React.ReactNode {
    // return <div>
    //   <Form>
    //     <Input placeholder={'请输入用户名'}></Input>
    //     <Input type={'password'} placeholder={'请输入密码'}></Input>
    //     <Button>登录</Button>
    //   </Form>
    // </div>;
    //http://localhost:8050/oauth/authorize?client_id=hjt676gf769&code_challenge=Qn3Kywp0OiU4NK_AFzGPlmrcYJDJ13Abj_jdL08Ahg8%3D&code_challenge_method=S256&redirect_uri=http://localhost:8050/account/oauthcode&scope=sign-auth&response_type=code&state=alsd

    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };
    const tailLayout = {
      wrapperCol: { offset: 8, span: 16 },
    };

    const onFinish = (values: any) => {
      console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
    };

    return (
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
export default Login;
