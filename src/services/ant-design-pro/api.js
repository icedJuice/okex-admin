// @ts-ignore

/* eslint-disable */
import { request } from 'umi';
/** 获取当前的用户 GET /api/currentUser */
import { POST } from '@/utils/request';
import { getUserToken, setUserToken, removeUserToken } from '@/utils/auth';
import { defaultUserName, defaultUserPw } from '@/constants';
import md5 from 'md5';

const userInfo = {
  success: true,
  data: {
    name: 'Admin',
    avatar: '',
    userid: '00000001',
    email: 'admin@okex.com',
    signature: '',
    title: '',
    group: '',
    tags: [],
    notifyCount: 1,
    unreadCount: 2,
    country: 'China',
    access: 'admin',
  },
};

export async function currentUser(options) {
  return new Promise((resolve, reject) => {
    const token = getUserToken();
    if (!token) {
      reject('用户未登录');
    } else {
      setTimeout(() => {
        resolve(userInfo);
      }, 500);
    }
  });
  // return request('/api/currentUser', {
  //   method: 'GET',
  //   ...(options || {}),
  // });
}
/** 退出登录接口 POST /api/login/outLogin */

export async function outLogin(options) {
  // return new Promise((resove) => {
  //   removeUserToken();
  //   resolve();
  // })
  return request('/api/login/outLogin', {
    method: 'POST',
    ...(options || {}),
  });
}
/** 登录接口 POST /api/login/account */

const logSuccessData = {
  currentAuthority: 'admin',
  status: 'ok',
  type: 'account',
};

export async function login(body, options) {
  return new Promise((resolve) => {
    const { autoLogin, password, type, username } = body;
    const pw = md5(password);
    setTimeout(() => {
      const isMatch = username === defaultUserName && pw === defaultUserPw;
      if (isMatch) {
        setUserToken(pw);
        resolve(logSuccessData);
      } else {
        reject('loginFaild');
      }
      // POST('/admin/login', { data: { username, password: pw } }).then((token) => {

      // });
    }, 600);
  });
  return request('/api/login/account', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
/** 此处后端没有提供注释 GET /api/notices */

export async function getNotices(options) {
  return request('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}
/** 获取规则列表 GET /api/rule */

export async function rule(params, options) {
  return request('/api/rule', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}
/** 新建规则 PUT /api/rule */

export async function updateRule(options) {
  return request('/api/rule', {
    method: 'PUT',
    ...(options || {}),
  });
}
/** 新建规则 POST /api/rule */

export async function addRule(options) {
  return request('/api/rule', {
    method: 'POST',
    ...(options || {}),
  });
}
/** 删除规则 DELETE /api/rule */

export async function removeRule(options) {
  return request('/api/rule', {
    method: 'DELETE',
    ...(options || {}),
  });
}
