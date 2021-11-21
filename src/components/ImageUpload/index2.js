import React from 'react';
import { Upload, message, Image } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

import styles from './style.less';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  // const isLt2M = file.size / 1024 / 1024 < 2;
  // if (!isLt2M) {
  //   message.error('Image must smaller than 2MB!');
  // }
  return isJpgOrPng;
}

/**
 * @property type 类型， image， video，
 */

const TYPE_IMAGE = 'image';
const TYPE_VIDEO = 'video';

class ImageUpload extends React.Component {
  state = {
    loading: false,
  };

  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
    this.props.onChange(info.response);
  };

  render() {
    console.log('upload...', this.props);
    const { loading, imageUrl } = this.state;
    const { value, type } = this.props;

    const { url } = this.props.value || {};

    const showUrl = imageUrl || url;

    return (
      <>
        <Upload
          name="file"
          listType="picture-card"
          className={styles.uploadBox}
          showUploadList={false}
          action="/upload?token=111"
          beforeUpload={beforeUpload}
          onChange={this.handleChange}
        >
          <div className="upload-box">
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div>Upload</div>
          </div>
        </Upload>
        <p>{showUrl}</p>
      </>
    );
  }
}

export default ImageUpload;
