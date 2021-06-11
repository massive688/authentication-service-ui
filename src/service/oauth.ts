import request from '@/utils/request';

export declare interface ParamsType {

}

export async function login(params: ParamsType) {
  return request.post('/api/oauth/sign', {
    data: params,
  });
}

export async function oauthVerify(params: ParamsType) {
  return request.head('/oauthapi/oauth/verify', {
    data: params,
  });
}
