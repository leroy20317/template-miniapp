import { defineStore } from 'pinia';
import requestUrl from '@/utils/url';
import api from '@/utils/api';
import { getAreaCodeList, userAuthorization } from '@/store/services/user';
import type { UserState } from '@/store/services/user';

const useUserStore = defineStore('user', {
  state: () => {
    return {
      loginInfo: {} as UserState,
      areaList: [] as { name; id; value }[],
    };
  },
  actions: {
    getCodeList() {
      getAreaCodeList().then((res) => {
        this.areaList = res.data;
      });
    },
    // 用户信息
    getLoginUserInfo({ auth, cb }: { auth: string; cb?: (res: Record<string, any>) => void }) {
      return new Promise<UserState>((resolve, reject) => {
        api
          .get<UserState>({ url: requestUrl.myInfo, params: { auth } })
          .then((res) => {
            console.log('获取用户信息', res);
            delete res.wxxPermission;
            // @ts-ignore
            this.loginInfo = res;
            uni.setStorage({
              key: 'userInfoLogin',
              data: res,
            });
            uni.setStorage({
              key: 'infoComplete',
              data: res.infoFlag,
            });
            cb?.(res);
            resolve(res);
          })
          .catch((err) => {
            console.log('获取用户信息', err);
            reject(err);
          });
      });
    },
    setLoginUserInfo(data: UserState) {
      // @ts-ignore
      this.loginInfo = data;
    },
    // 微信授权登录
    wxAuthorization(data: any) {
      console.log('wxAuthorization data', data);
      return userAuthorization(data);
    },
  },
});
export default useUserStore;
