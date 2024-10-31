<template>
  <view class="exam-title mt-[60rpx]">home{{ currentPage.value }}</view>
</template>

<script setup lang="ts">
import { onShow, onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';

const currentPage = ref(1);
const onClick = (_e, id, isFinish) => {
  if (isFinish) return;
  uni.navigateTo({
    url: `/pages/exam-detail/exam-detail?id=${id}`,
  });
};

const goLogin = () => {
  uni.navigateTo({
    url: `/pages/login/login`,
  });
};

onLoad(async () => {
  // loadData();
});

onShow(() => {
  uni.hideHomeButton();
});
</script>

<style lang="scss" scoped>
.check-login-btn {
  width: 690rpx;
  height: 80rpx;
  margin: 30rpx auto;
  border-radius: 100rpx;
  line-height: 80rpx;
  background: #4e6ef3;
  font-size: 34rpx;
  text-align: center;
  color: #ffffff;
}

.list-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: calc(100vh - 140rpx);

  .exam-title {
    font-size: 32rpx;
    color: #333333;
    margin: 23rpx 30rpx;
    height: 45rpx;
    display: flex;
    align-items: center;
    font-weight: bold;

    &::before {
      content: '';
      margin-right: 16rpx;
      width: 6rpx;
      height: 32rpx;
      background: #4e6ef3;
      border-radius: 4px;
    }
  }

  .list-item {
    // width: 690rpx;
    height: 329rpx;
    margin-left: 30rpx;
    margin-right: 30rpx;
    margin-bottom: 30rpx;
    position: relative;
    border-radius: 11px;
    overflow: hidden;

    image {
      width: 100%;
      height: 329rpx;
    }

    .bgc {
      position: absolute;
      height: 120rpx;
      padding: 16rpx 36rpx;
      bottom: 0;
      left: 0;
      right: 0;
      opacity: 0.7;
      background: rgba(0, 0, 0, 0.7);
      border-radius: 0 0 11rpx 11rpx;
    }

    .info-box {
      position: absolute;
      height: 120rpx;
      padding: 16rpx 28rpx;
      bottom: 0;
      left: 0;
      right: 0;

      .title {
        font-size: 28rpx;
        width: 590rpx;
        overflow: hidden;
        margin-bottom: -10rpx;
        word-break: break-all;
        white-space: nowrap;
        -webkit-line-clamp: 1;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        display: -webkit-box;
        color: #ffffff;
      }

      .category {
        font-size: 24rpx;
        color: #ffffff;
      }

      .company {
        margin-top: 8rpx;
        display: flex;
        align-items: center;

        .logo {
          width: 30rpx;
          height: 30rpx;
          border-radius: 50%;
          margin-right: 10rpx;
        }

        text {
          font-size: 24rpx;
          color: #c0c0c0;
        }
      }

      .btn {
        position: absolute;
        bottom: 24rpx;
        right: 28rpx;
        line-height: 60rpx;
        width: 180rpx;
        height: 60rpx;
        background: #ffffff;
        border-radius: 30rpx;
        font-size: 24rpx;
        color: #62656f;
        text-align: center;

        &.disabled {
          background: #d3d3d3;
        }
      }
    }
  }
}
</style>
