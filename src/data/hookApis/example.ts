import { AxiosError } from 'axios';
import { ResponseModel } from '../axios/interceptor/IResponseModel';
import { useApiMutation, useApiQuery } from '../react-query/hooks';

// Specific API hooks - examples using your URLs
export const useGetUser = (userId: string) => {
  return useApiQuery<{ id: string; name: string; email: string }>(
    ['user', userId],
    {
      resource: '/store-api/account/user-info',
      params: { userId },
    },
    {
      enabled: !!userId,
    }
  );
};

export const useLogin = () => {
  return useApiMutation<
    { token: string; user: any },
    { email: string; password: string }
  >(
    variables => ({
      method: 'POST',
      resource: '/store-api/mobile/account/login',
      body: variables,
    }),
    {
      onSuccess: (data: ResponseModel<{ token: string; user: any }>) => {
        console.info('Login successful:', data);
      },
      onError: (error: AxiosError<any>) => {
        console.error('Login failed:', error);
      },
    }
  );
};

export const useSignup = () => {
  return useApiMutation<
    { success: boolean; user: any },
    { email: string; password: string; name: string }
  >(
    variables => ({
      method: 'POST',
      resource: '/store-api/mobile/register',
      body: variables,
    }),
    {
      onSuccess: (data: ResponseModel<{ success: boolean; user: any }>) => {
        console.info('Signup successful:', data);
      },
      onError: (error: AxiosError<any>) => {
        console.error('Signup failed:', error);
      },
    }
  );
};

export const useUpdateUserProfile = () => {
  return useApiMutation<
    { success: boolean; user: any },
    { name?: string; email?: string; avatar?: any }
  >(
    variables => ({
      method: 'PUT',
      resource: '/store-api/account/user-update',
      body: variables,
    }),
    {
      onSuccess: (data: ResponseModel<{ success: boolean; user: any }>) => {
        console.info('Profile updated:', data);
      },
      onError: (error: AxiosError<any>) => {
        console.error('Profile updated:', error);
      },
    }
  );
};

export const useUpdateUserAvatar = () => {
  return useApiMutation<
    { success: boolean; avatarUrl: string },
    { avatar: File | any }
  >(
    variables => ({
      method: 'POSTFORM',
      resource: '/store-api/account/update-avatar',
      body: variables,
      isFormDataType: true,
    }),
    {
      onSuccess: (
        data: ResponseModel<{ success: boolean; avatarUrl: string }>
      ) => {
        console.info('Avatar updated:', data);
      },
      onError: (error: AxiosError<any>) => {
        console.error('Avatar updated:', error);
      },
    }
  );
};

export const useGetVideoList = (params?: any) => {
  return useApiQuery<{ videos: any[]; total: number }>(['videos', params], {
    resource: '/store-api/video/list',
    queryParams: params,
  });
};

export const useLikeVideo = () => {
  return useApiMutation<{ success: boolean }, { videoId: string }>(
    variables => ({
      method: 'POST',
      resource: '/store-api/video/likes',
      body: variables,
    }),
    {
      onSuccess: () => {
        console.info('Video liked successfully');
      },
    }
  );
};
