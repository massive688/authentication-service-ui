import { Reducer } from 'redux';

import { Effect } from 'dva';
import { login, oauthVerify } from '@/service/oauth';

export interface OauthType {

}
export interface ResultType {
  code: number;
  message: string;
  error: string;
  data: any;
  location: string;
}
export interface OauthList {
  list: OauthType[];
  name: string;
  result: Partial<ResultType>;
}

export interface ModelType {
  namespace: string;
  state: Partial<OauthList>;
  effects: {
    fetch: Effect;
    verification: Effect;
  };
  reducers: {
    list: Reducer<Partial<OauthList>>;
    result: Reducer<Partial<OauthList>>;
  };
}

const Model: ModelType = {
  namespace: 'oauth',
  state: {
    list: [],
    result: {},
    name: "welcome this here, let's go oauth login"
  },
  effects: {
    *fetch({payload}, { call, put }) {
      const response = yield call(login, payload)
      yield put({
        type: 'list',
        payload: { name: 'very good' }
      })
    },
    *verification({payload}, { call, put }) {
      const result = yield call(oauthVerify, payload)
      yield put({
        type: 'result',
        payload: { result }
      })
      return Promise.resolve()
    },
  },

  reducers: {
    list(state, action) {
      return {
        ...state,
        list: action.payload,
        name: action.payload.name
      };
    },
    result(state, action) {
      return {
        result: action.payload.result
      };
    },
  },
};

export default Model;
