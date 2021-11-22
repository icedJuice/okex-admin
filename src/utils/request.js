import { message } from 'antd';
import { request } from 'umi';

const CODE_SUCCESS = 0;
const BASE_API_PATH = '/api/v1';
const defaultErrorMessage = '未知错误，请稍后再试';

const errorMsgMap = {
  403: '用户未授权',
};

const getData =
  (method) =>
  async (url, params = {}, options = {}) => {
    try {
      const res = await request(BASE_API_PATH + url, {
        method,
        ...params,
        ...options,
      });
      if (res.code === CODE_SUCCESS) {
        return res.data;
      }
      const errorMsg = errorMsgMap[res.code];
      message.error(errorMsg || defaultErrorMessage);
      return null;
    } catch (error) {
      message.error(error.message || defaultErrorMessage);
      return null;
    }
  };

export const GET = getData('GET');
export const POST = getData('POST');
