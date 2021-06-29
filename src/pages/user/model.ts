import { Reducer } from 'redux';

import { Effect } from 'dva';
import {
  checkSign,
  login,
  logout,
  oauthAllow,
  oauthVerify,
} from '@/service/oauth';
import { ResultType } from '@/pages/model.data';

export interface OauthType {}
export interface UserState {
  list: OauthType[];
  name: string;
  result: Partial<ResultType>;
}

export interface ModelType {
  namespace: string;
  state: Partial<UserState>;
  effects: {
    login: Effect;
    check: Effect;
    logout: Effect;
    register: Effect;
  };
  reducers: {
    list: Reducer<Partial<UserState>>;
    result: Reducer<Partial<UserState>>;
  };
}

const Model: ModelType = {
  namespace: 'user',
  state: {
    result: {},
  },
  effects: {
    *check({ callback }, { call }) {
      yield call(checkSign);
    },
    *logout({ callback }, { call }) {
      yield call(logout);
      callback && callback();
    },
    *login({ payload }, { call, put }) {
      const result = yield call(login, payload);
      yield put({
        type: 'result',
        payload: { result },
      });
    },
    *register({ payload }, { call, put }) {
      const result = yield call(oauthAllow, payload);
      yield put({
        type: 'result',
        payload: { result },
      });
    },
  },

  reducers: {
    list(state, action) {
      return {
        ...state,
        list: action.payload,
        name: action.payload.name,
      };
    },
    result(state, action) {
      return {
        result: action.payload.result,
      };
    },
  },
};

export default Model;
