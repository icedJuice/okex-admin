import { ACCESS_TOKEN, TOKEN_ACCESS } from '@/constants';

export const getUserToken = () => {
  const tokenString = localStorage.getItem(ACCESS_TOKEN);
  if (!tokenString) {
    return '';
  }
  const [token, modify] = tokenString.split(';');
  if (!token || !modify) {
    removeUserToken();
    return '';
  }
  const enable = Date.now() - Number(modify) < TOKEN_ACCESS;
  if (enable) {
    setUserToken(token);
    return token;
  }
  removeUserToken();
  return '';
};

export const removeUserToken = () => {
  localStorage.removeItem(ACCESS_TOKEN);
};

export const setUserToken = (token) => {
  if (!token) {
    return null;
  }
  const tokenString = token + ';' + Date.now();
  localStorage.setItem(ACCESS_TOKEN, tokenString);
  return token;
};
