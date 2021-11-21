import React, { useEffect, useState } from 'react';
import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { IMAGE_CDN_PATH } from '@/constants';

const getFileInfo = (url) => {
  const [_u, name, type] = url?.match(/\/(.[^\/]+)\.(\w+)$/) || [];
  return { name, type };
};

const revertFileListFromValue = (value) => {
  // console.log();
  // if (!value || !value.id) {
  //   return [];
  // }
  return [
    {
      name: value.url,
      percent: 100,
      status: 'done',
      type: '',
      uid: value.id,
    },
  ];
};

const uploadprops = {
  name: 'file',
  action: '/upload?token=111',
  maxCount: 1,
  headers: {
    authorization: 'authorization-text',
  },
};

export default function ({ value, onChange }) {
  const handleChange = (info, rr) => {
    if (info.fileList.length === 0) {
      onChange({ id: '', url: '' });
      return;
    }
    if (info.file.status == 'uploading') {
    }
    if (info.file.status == 'done') {
      const res = info.file.response;
      onChange({
        id: res.id,
        url: IMAGE_CDN_PATH + '/' + res.url,
      });
    }
    if (info.file.status == 'error') {
      message.error('上传失败');
    }
  };
  console.log('value', value);
  return (
    <>
      <Upload
        defaultFileList={value ? revertFileListFromValue(value) : []}
        {...uploadprops}
        onChange={handleChange}
      >
        <Button icon={<UploadOutlined />}>点击上传</Button>
      </Upload>
    </>
  );
}
