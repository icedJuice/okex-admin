import {
  getCastList,
  getCastById,
  createCast,
  UpdateCast,
  setCastCover,
  setCastVideo,
} from '@/services';
import pickBy from 'lodash/pickBy';
const initParams = {
  pageSize: 20,
  pageNumber: 1,
};

const initData = {
  ...initParams,
  list: [],
  total: 0,
};

const CastModel = {
  namespace: 'cast',
  state: {
    filterParams: { ...initParams },
    data: { ...initData },
    // 正在编辑的token数据
    editingToken: null,
  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: {
    *getCastList({ payload }, { call, put, select }) {
      const filterParams = yield select((state) => state.cast.filterParams);
      const params = { ...filterParams, ...(payload || {}) };
      params.limit = params.pageSize;
      params.skip = params.pageSize * (params.pageNumber - 1);
      const addition = {
        pageNumber: params.pageNumber,
        pageSize: params.pageSize,
      };
      delete params.pageNumber;
      delete params.pageSize;

      const data = yield call(getCastList, { ...params, ...filterParams });
      yield put({
        type: 'updateState',
        payload: {
          data: {
            ...data,
            ...addition,
          },
        },
      });
    },

    *setFliterParams({ payload }, { call, put, select }) {
      const payloadParams = pickBy(payload, (e) => e !== undefined);
      const filterParams = yield select((state) => state.cast.filterParams);
      const newFilterParams = {
        ...payloadParams,
        pageSize: payloadParams.pageSize || filterParams.pageSize,
        pageNumber: 1,
      };
      yield put({
        type: 'updateState',
        payload: { filterParams: newFilterParams },
      });
      yield put({
        type: 'getCastList',
      });
    },

    *getTokenById({ payload }, { call, put }) {
      const response = yield call(getCastById, payload);
      const res = response.data;
      res.coverInfo = {
        id: res.coverId,
        url: res.coverUrl,
      };
      res.videoInfo = {
        id: res.videoId,
        url: res.videoUrl,
      };
      yield put({
        type: 'updateState',
        payload: {
          editingToken: res,
        },
      });
      return res;
    },

    *createOrUpdateToken({ payload }, { call, select }) {
      const editingToken = yield select((state) => state.cast.editingToken || {});
      const isUpdate = Boolean(payload.id);
      const {
        name = '',
        description = '',
        author = '',
        collectionName = '',
        edition = '',
        rareLevel = '',
        tokenId = '',
        coverInfo,
        videoInfo,
      } = payload;

      const params = {
        name,
        description,
        author,
        collectionName,
        edition,
        rareLevel,
        tokenId,
      };

      if (!isUpdate) {
        params.coverId = coverInfo?.id || '';
        params.videoId = videoInfo?.id || '';
      }

      const response = yield call(isUpdate ? UpdateCast : createCast, params);
      const res = response.data;
      const currentId = editingToken.id || res?.id;

      if (isUpdate) {
        // 如果封面有更新，调用接口更新
        if (coverInfo.id !== editingToken.coverId) {
          yield call(setCastCover, { id: currentId, coverId: coverInfo.id });
        }
        // 如果视频有变更， 调用接口更新
        if (videoInfo.id !== editingToken.videoId) {
          yield call(setCastVideo, { id: currentId, coverId: videoInfo.id });
        }
      }

      return {};
    },
  },
};

export default CastModel;
