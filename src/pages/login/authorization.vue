<template>
  <view class="auth-page">
    <image class="auth-logo" :src="imgPath + 'logo.png'" lazy-load></image>
    <text class="auth-title">微信账号一键登录</text>
    <!-- <button class="login-mask-wxbtn" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">
      <image class="auth-wxlogo" :src="imgPath + 'wx.png'" lazy-load></image>
      <text class="auth-wxtitle">微信账号一键登录</text>
    </button> -->
    <view class="login-mask-phonebtn" @click="gotoLogin">
      <image class="auth-phonelogo" :src="imgPath + 'phone.png'" lazy-load></image>
      <text class="auth-phonetitle">手机号登录</text>
    </view>

    <image class="auth-bg" :src="imgPath + 'bg.png'" lazy-load></image>
  </view>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import useUserStore from '@/store/slices/user';
import requestUrl from '@/utils/url';
export default {
  data() {
    return {
      imgPath: requestUrl.aliImgHost,
    };
  },

  computed: {
    ...mapState('useUserStore', ['loginUserInfo']),
  },
  onHide() {
    console.log('authorization onHide');
  },
  onShow() {
    console.log('authorization onShow');
  },
  methods: {
    ...mapActions(useUserStore, ['getLoginUserInfo', 'wxAuthorization']),
    ...mapActions('prize', ['getPhone']),

    getPhoneNumber({ detail }) {
      const examId = uni.getStorageSync('examIdFromQrCode');
      console.log('getPhoneNumber', detail);
      if (detail.errMsg === 'getPhoneNumber:ok') {
        this.wxAuthorization({
          encryptedData: detail.encryptedData,
          iv: detail.iv,
          sessionKey: uni.getStorageSync('session_key'),
          unionId: uni.getStorageSync('unionId'),
          appName: 'examcloud',
        })
          .then((data) => {
            console.log('微信授权登录 ', data);
            // if (!data.student) {
            //   uni.showToast({
            //     title: '您的手机号已经绑定HR，请换其他手机号登录',
            //     icon: null,
            //   });
            //   return;
            // }
            if (data.status === 'success') {
              uni.showToast({ title: '登录成功' });
              this.getLoginUserInfo({
                auth: data.auth,
                cb: (res) => {
                  // 应客户爸爸的需求，不要求用户的信息是否完善，只要有手机号就行
                  res.infoFlag = true;
                  console.log('已经完善', res);
                  if (res.auth) {
                    uni.reLaunch({
                      url: '/pages/index/index',
                    });
                  }
                },
              });
              uni.setStorage({ key: 'auth', data: data.auth });
              uni.setStorageSync('hasLogined', true);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        console.log('未授权');
      }
    },

    //点击跳转到手机号登录
    gotoLogin() {
      uni.navigateTo({
        url: '/pages/login/login',
      });
    },
  },
};
</script>

<style lang="scss">
.auth-page {
  width: 100%;
  // height: 100%;
  height: 100vh;
  position: relative;
  // background-image: url("../../static/bg.png") 100% 100% no-repeat fixed ;
  // background-size: 615rpx 262rpx;

  .auth-logo {
    width: 150rpx;
    height: 150rpx;
    margin-top: 100rpx;
    padding-left: 50rpx;
  }
  .auth-title {
    margin-top: 50rpx;
    margin-bottom: 100rpx;
    font-size: 44rpx;
    color: #000;
    padding-left: 50rpx;
  }
  .login-mask-wxbtn {
    height: 100rpx;
    width: 86%;
    background-color: #62b900;
    color: #fff;
    text-align: center;
    line-height: 100rpx;
    font-size: 36rpx;
    margin: 30rpx 50rpx;
    border-radius: 10rpx;

    .auth-wxlogo {
      width: 52rpx;
      height: 52rpx;
      vertical-align: middle;
    }
    .auth-wxtitle {
      margin-left: 15rpx;
    }
  }
  .login-mask-phonebtn {
    height: 100rpx;
    width: 86%;
    background-color: #3388ff;
    color: #fff;
    text-align: center;
    line-height: 100rpx;
    font-size: 36rpx;
    margin: 30rpx 50rpx;
    border-radius: 10rpx;

    .auth-phonelogo {
      width: 52rpx;
      height: 52rpx;
      vertical-align: middle;
    }
    .auth-phonetitle {
      margin-left: 15rpx;
    }
  }
  .auth-bg {
    width: 80%;
    height: 360rpx;
    position: absolute;
    right: 0;
    bottom: 0;
  }
}
</style>
