import { message } from 'antd';
import { request } from 'umi';
import { getUserToken, setUserToken, removeUserToken } from '@/utils/auth';

const CODE_SUCCESS = 0;
const host = process.env.NODE_ENV === 'development' ? '' : 'https://www.rarelab.space';
const BASE_API_PATH = host + '/api/v1';
const defaultErrorMessage = '未知错误，请稍后再试';

const errorMsgMap = {
  401: '用户未授权',
};

const getData =
  (method) =>
  async (url, params = {}, options = {}) => {
    try {
      const token = getUserToken();
      const res = await request(BASE_API_PATH + url, {
        method,
        ...params,
        ...options,
        headers: {
          'user-token': token,
        },
      });
      if (res.code === CODE_SUCCESS) {
        return res;
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
