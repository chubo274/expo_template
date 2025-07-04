import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import Interceptor from './Interceptor';
import { ResponseModel } from './IResponseModel';

export default class DefaultInterceptor extends Interceptor {
  constructor() {
    super();
  }

  /**
   * @param {InternalAxiosRequestConfig} config
   * @param {IResource} resourceType
   * @return {InternalAxiosRequestConfig}
   */
  requestFulfilled = (config: InternalAxiosRequestConfig) => {
    return config;
  };

  requestReject = async (error: any) => {
    return await Promise.reject(error);
  };

  responseFulfilled = (response: AxiosResponse) => {
    console.info('responseRaw: ', response);
    return ResponseModel.createSuccess(response);
  };

  responseReject = async (error: AxiosError<any, any>) => {
    let status = 0;
    let statusText = '';
    let message = '';
    let rawError;
    if (error.response != null) {
      status = error.response.status;
      console.info(
        'DefaultInterceptorReject: ',
        error.response.status,
        error.response
      );

      const errorData = error.response.data;
      const errors: any[] | undefined = error.response.data?.errors;
      // if ((errors != null) && errors.length > 0) {
      //     message = errors[0].message
      //     rawError = errors
      // } else {
      const { statusCode, message: _message, code: _code } = errorData || {};
      // server was received message, but response smt
      status = !(status >= 200 && status < 300) ? status : statusCode;
      statusText = _code;
      message = _message || error?.response?.data?.errors?.[0]?.detail;
      rawError = errorData ?? errors;
      // }
    } else {
      console.error('DefaultInterceptorReject rawErr: ', error);

      // smt went wrong
      status = 500;
      message = error?.message;
    }
    return await Promise.reject(
      ResponseModel.createError(
        status,
        statusText,
        message,
        rawError,
        error?.request,
        error?.config,
        error?.response
      )
    );
  };
}
