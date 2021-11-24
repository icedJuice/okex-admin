import React, { useEffect } from 'react';
import pickBy from 'lodash/pickBy';
import { Form, Input, Button, message, Spin } from 'antd';
import ImageUpload from '@/components/ImageUpload';
import { connect } from 'react-redux';

function UpdateCast({ location, getTokenById, createOrUpdateToken, getLoading, updateLoading }) {
  const tokenId = location.query.tokenId;
  const [form] = Form.useForm();

  const onFinish = async (formData) => {
    const updateParams = pickBy(formData, (e) => e !== undefined);
    const isNew = !updateParams.id;
    const keyLength = Object.keys(updateParams).length;

    if (isNew) {
      // 新建
      if (keyLength === 0) {
        message.error('未填写任何内容');
        return;
      }
    } else {
      // 编辑
      if (keyLength <= 1) {
        message.error('未填写任何内容');
        return;
      }
    }
    const { error, data } = await createOrUpdateToken(updateParams);
    if (error) {
      message.error(error.message);
    } else {
      message.success('操作成功');
    }
  };

  const getEditInfo = async () => {
    const editdata = await getTokenById(tokenId);
    form.setFieldsValue(editdata);
  };

  useEffect(() => {
    if (tokenId) {
      getEditInfo();
    }
  }, [tokenId]);
  return (
    <Spin spinning={getLoading || updateLoading}>
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item label="coverpage" name="coverInfo">
          <ImageUpload accept=".jpg,.jpeg,.png,.bmp,.webp" />
        </Form.Item>
        <Form.Item label="Video" name="videoInfo">
          <ImageUpload accept=".mp4" />
        </Form.Item>

        <Form.Item label="Name of collection" name="name">
          <Input />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input />
        </Form.Item>

        <Form.Item label="Creator Name" name="author">
          <Input />
        </Form.Item>

        <Form.Item label="NFT Name" name="collectionName">
          <Input />
        </Form.Item>

        <Form.Item label="Number of Editions" name="edition">
          <Input />
        </Form.Item>
        <Form.Item label="rareLevel" name="rareLevel">
          <Input />
        </Form.Item>
        <Form.Item label="tokenId" name="tokenId">
          <Input />
        </Form.Item>
        <Form.Item label="id" name="id" hidden>
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
}

const mapStateToProps = ({ cast, loading }) => ({
  data: cast.editingToken,
  getLoading: loading.effects['cast/getTokenById'] === true,
  updateLoading: loading.effects['cast/createOrUpdateToken'] === true,
});

const mapDispatchToProps = (dispatch) => ({
  getTokenById: (tokenId) => {
    return dispatch({
      type: 'cast/getTokenById',
      payload: { tokenId },
    });
  },
  createOrUpdateToken: (payload) => {
    return dispatch({
      type: 'cast/createOrUpdateToken',
      payload,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateCast);
