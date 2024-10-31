<template>
  <view class="box">
    <img :src="`${staticHost}/bgc.png`" alt="" class="banner" />

    <view class="content">
      <view class="title">登陆</view>
      <view class="titleLine" />
      <view class="form">
        <view class="input-box" style="margin-bottom: 50rpx">
          <img :src="`/static/svg/phone.svg`" alt="" />
          <picker
            mode="selector"
            :range="areaList"
            range-key="name"
            :value="areaIndex"
            @change="handleAreaChange"
          >
            <view class="area-code">+{{ areaList?.[areaIndex]?.value || '' }}</view>
          </picker>
          <input v-model="phone" class="input" placeholder="请输入常用手机号" />
        </view>
        <view class="input-box">
          <img :src="`/static/svg/password.svg`" alt="" />
          <input v-model="code" class="input" placeholder="请输入手机验证码" />
          <view
            :class="{
              text: true,
              disable: isSending || !checkPhone(),
            }"
            @click="getCode"
          >
            {{ codeBtnText }}
          </view>
        </view>

        <view :class="{ 'error-tip': true, show: !!errMsg }">
          {{ errMsg }}
        </view>
        <view class="btn" @click="handleLogin">登陆</view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { getCode, codeLogin } from '@/store/services/user';
import { mapState } from 'pinia';
import useUserStore from '@/store/slices/user';

let timer;
export default {
  name: 'Login',
  data() {
    return {
      staticHost: '/static/confirmPhone',
      phone: '',
      code: '',
      isSending: false,
      timeCount: 59,
      codeBtnText: '获取验证码',
      errMsg: '',
      areaIndex: 0,
    };
  },

  computed: {
    ...mapState(useUserStore, ['areaList']),
  },
  methods: {
    // ...mapActions("user", ["getLoginUserInfo"]),

    handleAreaChange(e) {
      const value = e.detail.value;
      this.areaIndex = value;
    },

    checkPhone(needMsg = false) {
      const { phone } = this;
      if (!phone) {
        if (needMsg) {
          this.errMsg = '请输入手机号';
        }
        return false;
      }
      if (!/^\d{5,}$/.test(phone)) {
        if (needMsg) {
          this.errMsg = '手机号码格式错误';
        }
        return false;
      }
      return true;
    },

    // 倒计时
    timeCountDown() {
      let timeCount = this.timeCount;
      this.isSending = true;
      this.codeBtnText = timeCount + 's后重获';
      timer = setInterval(() => {
        this.codeBtnText = timeCount + 's后重获';
        timeCount--;
        if (timeCount < 0) {
          clearInterval(timer);
          this.codeBtnText = '获取验证码';
          this.isSending = false;
          this.timeCount = 59;
        }
      }, 1000);
    },

    getCode() {
      if (this.isSending) return;
      const { phone, areaIndex, areaList } = this;
      if (!this.checkPhone(true)) {
        return;
      }
      const area = areaList[areaIndex].id;
      this.timeCountDown();
      this.errMsg = '';

      getCode({ phone, area_code: area }).then((res) => {
        uni.showToast({
          title: res.message || '短信验证码已发出',
        });
      });
    },

    handleLogin() {
      if (!this.checkPhone(true)) {
        return;
      }
      const { phone, code, areaIndex, areaList } = this;
      if (!code) {
        this.errMsg = '请输入验证码';
        return;
      }
      const area = areaList[areaIndex].id;
      this.errMsg = '';
      uni.showToast({
        title: '请稍后...',
        icon: 'loading',
      });

      codeLogin({ phone, code, area_code: area, tianc: 2612203042567290 })
        .then((res) => {
          uni.showToast({
            title: '登录成功',
          });
          const auth = res.login.auth;
          uni.setStorageSync('auth', auth);
          uni.setStorageSync('hasLogined', true);
          uni.reLaunch({
            url: '/pages/index/index',
          });
        })
        .catch((err) => {
          console.log('err', err);
          uni.showToast({
            title: err,
            icon: 'error',
          });
        });
    },
  },
};
</script>

<style lang="scss">
.box {
  width: 100vw;
  height: 100vh;
  position: relative;

  .banner {
    width: 100%;
    height: 680rpx;
    position: relative;
    top: -30rpx;
  }

  .content {
    position: absolute;
    padding-top: 40rpx;
    bottom: 0;
    height: calc(100vh - 640rpx);
    width: 100%;
    background: #ffffff;
    border-radius: 60rpx 60rpx 0px 0px;

    .title {
      position: relative;
      text-align: center;
      margin: 0 auto;
      font-size: 36rpx;
      line-height: 50rpx;
      color: #19191b;
    }

    .titleLine {
      position: relative;
      width: 78rpx;
      height: 6rpx;
      background: #4e6ef3;
      margin: 6rpx auto 0;
    }

    .form {
      margin-top: 90rpx;
      padding: 0 30rpx;
      box-sizing: border-box;

      .input-box {
        margin: 30rpx auto;
        font-size: 28rpx;
        height: 90rpx;
        padding: 0 40rpx;
        background: #f5f6f7;
        border-radius: 45rpx;
        display: flex;
        align-items: center;
        box-sizing: border-box;

        image {
          width: 34rpx;
          height: 40rpx;
          flex-shrink: 0;
          margin-right: 20rpx;
        }

        .area-code {
          line-height: 40rpx;
          width: 100rpx;
          font-size: 28rpx;
          color: #000000;
          display: flex;
          align-items: center;

          .area-icon {
            width: 28rpx;
            height: 28rpx;
            padding: 5rpx;
            margin: 0;
            box-sizing: border-box;
          }
        }

        input {
          flex: 1;

          &::placeholder {
            color: #3333;
          }
        }

        .text {
          font-size: 28rpx;
          color: #4e6ef3;
          width: 5em;
          text-align: center;
          margin-left: 10rpx;

          &.disable {
            color: rgb(164, 164, 164);
          }
        }
      }

      .error-tip {
        margin-top: 20rpx;
        line-height: 33rpx;
        height: 72rpx;
        font-size: 24rpx;
        color: #f56666;
        margin-left: 40rpx;
        visibility: hidden;
        transition: all 0.2s;
        opacity: 0;

        img {
          position: relative;
          width: 26rpx;
          height: 26rpx;
          margin-right: 7.5rpx;
          top: 3rpx;
        }

        &.show {
          visibility: visible;
          opacity: 1;
        }
      }

      .btn {
        margin: 0 auto;
        font-size: 28rpx;
        color: #ffffff;
        height: 80rpx;
        line-height: 80rpx;
        text-align: center;
        background: #4e6ef3;
        border-radius: 40rpx;
      }
    }
  }
}
</style>
