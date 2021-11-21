import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, Typography } from 'antd';
import styles from './Welcome.less';

const CodePreview = ({ children }) => (
  <pre className={styles.pre}>
    <code>
      <Typography.Text copyable>{children}</Typography.Text>
    </code>
  </pre>
);

export default () => {
  return (
    <PageContainer>
      <Card>
        <Typography.Text
          strong
          style={{
            marginBottom: 12,
          }}
        >
          Welecom to OkEX Admin.
        </Typography.Text>
      </Card>
    </PageContainer>
  );
};
