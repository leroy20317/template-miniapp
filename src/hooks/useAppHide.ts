import { onMounted, ref } from 'vue';

export const useAppHide = () => {
  const isHide = ref(false);

  onMounted(() => {
    uni.onAppHide(() => {
      console.log('切屏');
    });
  });

  return isHide;
};
