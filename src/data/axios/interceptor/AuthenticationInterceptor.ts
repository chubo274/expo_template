import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import qs from 'qs';
import Interceptor from './Interceptor';
import ZustandPersist from 'store/persist';

export default class AuthenticationInterceptor extends Interceptor {
  constructor() {
    super();
  }

  /**
   * @param {InternalAxiosRequestConfig} config
   * @param {IResource} resourceType
   * @return {InternalAxiosRequestConfig}
   */
  requestFulfilled = (config: InternalAxiosRequestConfig) => {
    const { Token } = ZustandPersist.getState();

    const contentType = config.headers['Content-Type'];
    if (contentType === 'application/x-www-form-urlencoded') {
      config.data = qs.stringify(config.data);
    }

    if (Token?.token) {
      config.headers.Authorization = Token?.token;
    }

    return config;
  };

  requestReject = async (error: any) => {
    return await Promise.reject(error);
  };

  responseFulfilled = (response: AxiosResponse) => response;

  responseReject = async (error: AxiosError) => await Promise.reject(error);
}
