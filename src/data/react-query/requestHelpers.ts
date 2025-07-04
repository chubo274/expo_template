import { IConfigRequest, HTTPMethod } from '@/src/data/axios';

// Helper functions to create request configs
export const createGetRequest = (
  resource: string,
  params?: any,
  queryParams?: any
): IConfigRequest => ({
  method: 'GET',
  resource,
  params,
  queryParams,
});

export const createPostRequest = (
  resource: string,
  body?: any,
  isFormDataType = false
): IConfigRequest => ({
  method: 'POST',
  resource,
  body,
  isFormDataType,
});

export const createPutRequest = (
  resource: string,
  body?: any,
  isFormDataType = false
): IConfigRequest => ({
  method: 'PUT',
  resource,
  body,
  isFormDataType,
});

export const createDeleteRequest = (
  resource: string,
  params?: any
): IConfigRequest => ({
  method: 'DELETE',
  resource,
  params,
});

export const createFormRequest = (
  resource: string,
  body?: any
): IConfigRequest => ({
  method: 'POSTFORM',
  resource,
  body,
  isFormDataType: true,
});

// Generic request builder
export const createRequest = (
  method: HTTPMethod,
  resource: string,
  options?: {
    body?: any;
    params?: any;
    queryParams?: any;
    isFormDataType?: boolean;
    timeout?: number;
  }
): IConfigRequest => ({
  method,
  resource,
  ...options,
});
