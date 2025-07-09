import ApiGateway, { IConfigRequest } from 'data/axios';
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ResponseModel } from '../axios/interceptor/IResponseModel';

interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

// Helper function to make API calls using your custom ApiGateway
const callApi = async <T = any>(
  request: IConfigRequest
): Promise<ResponseModel<T>> => {
  const response: ResponseModel<T> = await ApiGateway.execute(request);
  return response;
};

// Generic hooks for API calls
export const useApiQuery = <T = any>(
  key: string | string[],
  request: Omit<IConfigRequest, 'method'>,
  options?: Omit<
    UseQueryOptions<ResponseModel<T>, AxiosError<ApiError>>,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery<ResponseModel<T>, AxiosError<ApiError>>({
    queryKey: Array.isArray(key) ? key : [key],
    queryFn: () => callApi<T>({ ...request, method: 'GET' }),
    ...options,
  });
};

export const useApiMutation = <TData = any, TVariables = any>(
  requestBuilder: (variables: TVariables) => IConfigRequest,
  options?: UseMutationOptions<
    ResponseModel<TData>,
    AxiosError<ApiError>,
    TVariables
  >
) => {
  return useMutation<ResponseModel<TData>, AxiosError<ApiError>, TVariables>({
    mutationFn: (variables: TVariables) =>
      callApi<TData>(requestBuilder(variables)),
    ...options,
  });
};
