import { GET, POST } from '@/utils/request';
import { request } from 'umi';
/**
 *
 * data: {username, password}
 */
// export async function login(data) {
//   /api/v1/admin/login
// }

export async function getCastList(params) {
  const { pageNumber, pageSize, ...res } = params;
  try {
    const result = await GET('/nfts', {
      params: {
        ...res,
      },
    });
    return {
      list: result?.data || [],
      total: result?.meta?.total,
    };
  } catch (error) {
    return {
      list: [],
    };
  }
}

export async function getCastById({ tokenId }) {
  return GET('/nfts/' + tokenId);
}
export async function getCastShowById({ id }) {
  return GET('/nfts/' + id);
}

export async function createCast(data) {
  return POST('/nfts/create', {
    data,
  });
}

// export async function createCast(data) {
//   return request('/api/v1/nfts/create', {
//     method: 'POST',
//     data,
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });
// }

export async function setCastCover(data) {
  return POST('/nfts/setCover', { data });
}

export async function setCastVideo(data) {
  return POST('/nfts/setVideo', { data });
}

export async function UpdateCast(data) {
  return POST('/nfts/update', { data });
}
