import { ref } from 'vue';


export const useCount = (iniCount: number, callback?) => {
  const count = ref(iniCount);
  const isCanGo = ref(true);

  let timer: any = null;


  const timeGo = () => {
    if (count.value === 0) {
      clearInterval(timer);
      count.value = iniCount;
      isCanGo.value = true;
      callback?.();
    }
    if (count.value > 0) {
      count.value = count.value - 1;
    }
  };

  const go = () => {
    if (!isCanGo.value) return;
    clearInterval(timer);
    isCanGo.value = false;
    timeGo();
    timer = setInterval(() => {
      timeGo();
    }, 1000);
  };

  const cancel = () => {
    clearInterval(timer);
    isCanGo.value = true;
    count.value = iniCount;
  };

  return {
    count,
    go,
    isCanGo,
    cancel,
  };
};
