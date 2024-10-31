import { qs } from '@/utils/util';
const client = 'miniapp';

export default {
  get<T = any>(options: {
    params?: Record<string, any>;
    url: string;
    headers?: Record<string, any>;
  }) {
    const params = options.params;
    const url = options.url;

    return new Promise<T>((resolve, reject) => {
      uni.request({
        url: url,
        data: {
          client,
          ...params,
          auth: uni.getStorageSync('auth'),
          // auth:testAuth
        },
        header: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          ...options.headers,
        },
        method: 'GET',
        success: ({ data }: Record<string, any>) => {
          resolve(data);
        },
        fail: (error) => {
          reject(error || '');
        },
      });
    });
  },

  post<T = any>({
    data,
    params,
    url,
    isForm,
    headers,
  }: {
    data: any;
    params?: Record<string, any>;
    url: string;
    isForm?: boolean;
    headers?: Record<string, any>;
  }) {
    console.log('post data params', data, params);
    return new Promise<T>((resolve, reject) => {
      const search = qs(params || {});
      uni.request({
        url: `${url}${search ? `?${search}` : ''}`,
        data: data,
        header: {
          ...(isForm
            ? { 'Content-Type': 'application/x-www-form-urlencoded' }
            : { Accept: 'application/json' }),
          ...headers,
        },
        method: 'POST',
        success: ({ data }: Record<string, any>) => {
          resolve(data);
        },
        fail: (error) => {
          reject(error || '网络错误');
        },
      });
    });
  },

  // put(options: any) {
  //   const { url, header = {}, data } = options;
  //   return new Promise(async(resolve, reject) => {
  //     const [err, result = {}]: any = await uni.request({
  //       method: 'PUT',
  //       url: url,
  //       data: data,
  //       header: { client: 'miniapp', ...header },
  //     });
  //     if (err || result.data.status !== 'success') {
  //       reject(err || result.message || '网络错误')
  //       uni.showToast({
  //         title: result.message || '网络错误',
  //         mask: true,
  //         icon: 'none',
  //         duration: 1200,
  //       })
  //       return
  //     }
  //     resolve(result.data)
  //   })
  // },

  // delete(options: any) {
  //   const { url, header = {}, data } = options;
  //   return new Promise(async (resolve, reject) => {
  //     const [err, result = {}]: any = await uni.request({
  //       method: 'DELETE',
  //       url: url,
  //       data: data,
  //       header: { client: 'miniapp', ...header },
  //     });
  //     if (err || result.data.status !== 'success') {
  //       reject(err || result.message || '网络错误')
  //       uni.showToast({
  //         title: result.message || '网络错误',
  //         mask: true,
  //         icon: 'none',
  //         duration: 1200,
  //       })
  //       return
  //     }
  //     resolve(result.data)
  //   })
  // },
};
