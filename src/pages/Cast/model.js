import { getCastList, getCastById } from '@/services';
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
      const res = yield call(getCastById, payload);
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

    *createOrUpdateToken({ payload }, { call }) {
      const res = yield call('');
    },
  },
};

export default CastModel;
