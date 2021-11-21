import { GET, POST } from '@/utils/request';

export async function getCastList(params) {
  const { pageNumber, pageSize, ...res } = params;
  try {
    const result = await GET('/nfts', {
      params: {
        ...res,
      },
    });
    return {
      list: result,
      total: 40,
    };
  } catch (error) {
    return {
      list: [],
    };
  }
}

/** */
export async function getCastById({ tokenId }) {
  return GET('/nfts/' + tokenId);
}
/** 通过id得到实体 */
export async function getCastShowById({ id }) {
  return GET('/nfts/' + id);
}

export async function createCast(data) {
  return (
    POST('/nfts/create'),
    {
      data,
    }
  );
}

export async function setCastCover(data) {
  return (
    POST('/nfts/setCover'),
    {
      data,
    }
  );
}

export async function setCastVideo(data) {
  return (
    POST('/nfts/setVideo'),
    {
      data,
    }
  );
}

export async function UpdateCast(data) {
  return (
    POST('/nfts/update'),
    {
      data,
    }
  );
}
