import { request } from 'umi';
import { getUserToken } from '@/utils/auth';
const token = getUserToken();

async function uploadImage(file) {
  const data = new FormData();
  data.append('file', file);
  const res = await request('https://file.rarelab.space/upload?token=' + token, {
    method: 'POST',
    data,
  });
  return res;
}

export default uploadImage;
