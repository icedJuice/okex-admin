import React from 'react';
import dayjs from 'dayjs';
import { Link } from 'umi';
import { Table, Spin, Image } from 'antd';

function TableList({ data, loading, onPageChange }) {
  const { pageSize, pageNumber, total, list = [] } = data || {};
  const columns = [
    {
      title: '序号',
      key: 'id',
      render: (d, r, i) => {
        return pageSize * (pageNumber - 1) + i + 1;
      },
    },
    {
      title: '名称',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: '封面',
      dataIndex: 'coverUrl',
      render: (coverUrl) => {
        return coverUrl ? <Image width={120} src={coverUrl} /> : null;
      },
    },
    {
      title: '创建时间',
      key: 'createdAt',
      dataIndex: 'createdAt',
      render: (createdAt) => {
        return dayjs(createdAt).format('YYYY-MM-DD HH:mm');
      },
    },
    {
      title: 'ownerAddress',
      key: 'receivedAddress',
      dataIndex: 'receivedAddress',
    },
    {
      title: 'tokenId',
      key: 'tokenId',
      dataIndex: 'tokenId',
    },
    {
      title: 'contractAddress',
      key: 'contractAddress',
      dataIndex: 'contractAddress',
    },
    {
      title: '操作',
      key: 'action',
      width: 120,
      render: (_, record) => {
        return (
          <>
            <Link to={`/cast/update?tokenId=${record.tokenId}`}>编辑</Link>
          </>
        );
      },
    },
  ];

  const pagination = {
    current: pageNumber,
    pageSize: pageSize,
    total,
    showTotal: (t) => `共${t}条`,
    onChange: (pageNumber, pageSize) => {
      onPageChange({
        pageNumber,
        pageSize,
      });
    },
  };

  return (
    <Spin spinning={loading}>
      <Table
        columns={columns}
        dataSource={list || []}
        pagination={pagination}
        rowKey={(d) => d.id}
      />
    </Spin>
  );
}

export default TableList;
