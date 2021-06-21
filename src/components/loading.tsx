import React from 'react';
import { Spin } from 'antd';

export default () => (
  <div
    style={{
      display: 'flex',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Spin size={'large'}></Spin>
  </div>
);
