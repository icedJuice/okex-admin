import React, { useEffect, useState } from 'react';
import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { IMAGE_CDN_PATH } from '@/constants';

const revertFileListFromValue = (value) => {
  if (!value || !value.id) {
    return [];
  }
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

export default function ({ value, onChange, ...props }) {
  const [fileList, setFlieList] = useState(revertFileListFromValue(value));

  useEffect(() => {
    setFlieList(revertFileListFromValue(value));
  }, [value]);

  const handleChange = (info) => {
    if (info.fileList.length === 0) {
      onChange({ id: '', url: '' });
      return;
    }
    if (info.file.status == 'uploading') {
      setFlieList([
        {
          name: info.file.name,
          percent: 50,
          status: 'uploading',
          type: '',
          uid: info.file.uid,
        },
      ]);
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
  return (
    <>
      <Upload fileList={fileList} {...uploadprops} {...props} onChange={handleChange}>
        <Button icon={<UploadOutlined />}>点击上传</Button>
      </Upload>
    </>
  );
}
