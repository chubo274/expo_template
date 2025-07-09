import ZustandPersist from 'store/persist';
import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';
import { baseUrl } from '../resource';
import AuthenticationInterceptor from './interceptor/AuthenticationInterceptor';
import DefaultInterceptor from './interceptor/DefaultAppInterceptor';
import { ResponseModel } from './interceptor/IResponseModel';
import { RetryInterceptor } from './interceptor/RetryInterceptor';

export type HTTPMethod =
  | 'POST'
  | 'GET'
  | 'PUT'
  | 'PATCH'
  | 'DELETE'
  | 'POSTFORM';

export interface IConfigRequest {
  method: HTTPMethod;
  resource: string;
  isFormDataType?: boolean;
  body?: any;
  params?: any;
  queryParams?: any;
  timeout?: number;
}
class ApiGateway {
  _instanceAxios = axios.create();
  configTimeout = 30 * 1000;
  requestConfig!: AxiosRequestConfig;

  constructor() {
    this._addDefaultInterceptors();
    this._addInterceptors();
  }

  private readonly _addDefaultInterceptors = () => {
    const authenticationInterceptor = new AuthenticationInterceptor();
    this._instanceAxios.interceptors.request.use(
      authenticationInterceptor.requestFulfilled
    );

    const defaultInterceptor = new DefaultInterceptor();
    this._instanceAxios.interceptors.request.use(
      defaultInterceptor.requestFulfilled,
      defaultInterceptor.requestReject
    );
    this._instanceAxios.interceptors.response.use(
      defaultInterceptor.responseFulfilled,
      defaultInterceptor.responseReject
    );

    const retryInterceptor = new RetryInterceptor(this._instanceAxios);
    this._instanceAxios.interceptors.response.use(
      retryInterceptor.responseFulfilled,
      retryInterceptor.responseReject
    );
  };

  private readonly _addInterceptors = () => {
    // some expand interceptors default can be add here!
  };

  execute = (config: IConfigRequest) => {
    const {
      method,
      resource,
      body,
      isFormDataType,
      params,
      queryParams,
      timeout,
    } = config;
    const { Token } = ZustandPersist.getState();

    let data = body;
    if (isFormDataType) {
      data = parseFormData(body);
    }
    if (method == 'GET') {
      data = undefined;
    }
    const headers = {
      Accept: 'application/json',
      'Content-Type': isFormDataType
        ? 'multipart/form-data'
        : 'application/json', // Content-Type = 'application/json' == null
      Authorization: '',
      'sw-access-key': 'SWSCRUDICUUXCTDTDHHKRWW1NA',
    };
    if (Token?.token) headers['Authorization'] = Token?.token;
    const urlQueryParams =
      resource + `?${qs.stringify(queryParams, { skipNulls: true })}`;

    const configRequest: AxiosRequestConfig<any> = {
      baseURL: baseUrl.value,
      timeout: timeout || this.configTimeout,
      headers,
      url: queryParams ? urlQueryParams : resource,
      method,
      params,
      paramsSerializer: {
        encode: (params: any) =>
          qs.stringify(params, {
            skipNulls: true,
            // arrayFormat: 'brackets'
          }),
      },
      data,
    };

    if (!configRequest?.baseURL || !configRequest?.url) {
      const error = ResponseModel.createError(
        400,
        '400',
        'Invalid request configuration',
        'Invalid request configuration',
        configRequest,
        configRequest
      );
      return Promise.resolve(error);
    }

    switch (method) {
      case 'DELETE':
        return this._instanceAxios.delete(configRequest.url!, configRequest);
      case 'GET':
        return this._instanceAxios.get(configRequest.url!, configRequest);
      case 'PATCH':
        return this._instanceAxios.patch(
          configRequest.url!,
          configRequest?.data,
          configRequest
        );
      case 'POST':
        return this._instanceAxios.post(
          configRequest.url!,
          configRequest?.data,
          configRequest
        );
      case 'PUT':
        return this._instanceAxios.put(
          configRequest.url!,
          configRequest?.data,
          configRequest
        );
      case 'POSTFORM':
        return this._instanceAxios.postForm(
          configRequest.url!,
          configRequest?.data,
          configRequest
        );

      default:
        const error = ResponseModel.createError(
          405,
          '405',
          'Unsupported HTTP method',
          'Unsupported HTTP method',
          configRequest,
          configRequest
        );
        return Promise.resolve(error);
    }
  };
}

export default new ApiGateway();

// helper function to create a request config
const parseFormData = (data: any): FormData => {
  const bodyFormData = new FormData();
  Object.keys(data).forEach((key: string) => {
    if (Array.isArray(data[key])) {
      data[key].forEach((value: any) => {
        bodyFormData.append(`${key}[]`, value);
      });
    } else {
      bodyFormData.append(key, data[key]);
    }
  });
  return bodyFormData;
};
