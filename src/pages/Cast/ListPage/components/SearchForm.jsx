import React from 'react';

import { Form, Input, Button, Space, Select } from 'antd';

function SearchFrom({ onFinish, onCreate }) {
  return (
    <div>
      <Form name="basic" layout="inline" onFinish={onFinish} autoComplete="off">
        <Form.Item label="token ID" name="tokenId">
          <Input style={{ width: 300 }} allowClear />
        </Form.Item>
        <Form.Item label="状态" name="status">
          <Select allowClear style={{ width: 150 }}>
            <Select.Option value={0}>全部</Select.Option>
            <Select.Option value={1}>未上链</Select.Option>
            <Select.Option value={2}>已上链</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              搜索
            </Button>
            <Button type="primary" onClick={onCreate}>
              新增
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
}

export default SearchFrom;
