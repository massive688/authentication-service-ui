import request from '@/utils/request';

export declare interface ParamsType {}

export async function login(params: ParamsType) {
  return request.post('/api/oauth/sign', {
    data: params,
  });
}
export async function logout() {
  return request.post('/api/oauth/logout');
}

export async function oauthVerify(params: any) {
  let urlParams = new URLSearchParams(),
    name;
  for (name in params) {
    if (params[name]) {
      urlParams.append(name, params[name]);
    }
  }
  return request.post('/oauthapi/oauth/verify', {
    data: urlParams,
  });
}

export async function oauthDenied(params: ParamsType) {
  return request.post('/oauthapi/oauth/reject', {
    data: params,
  });
}

export async function oauthAllow(params: ParamsType) {
  return request.post('/oauthapi/oauth/agree', {
    data: params,
  });
}
