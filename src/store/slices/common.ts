import { defineStore } from 'pinia';
import dayjs, { Dayjs } from 'dayjs';
import { getServerTime } from '@/store/services/common';

export const common = defineStore('common', {
  state: () => {
    return {
      serverTime: '' as unknown as Dayjs,
      difference: 0,
      timer: null as any,
    };
  },
  actions: {
    async storeGetSeverTime() {
      const { data } = await getServerTime();
      if (data) {
        this.serverTime = dayjs(data?.date);
        this.difference = dayjs().diff(dayjs(data.date.concat('+08:00')));
        this.runServerTime();
      }
    },
    runServerTime() {
      if (this.timer) clearInterval(this.timer);
      this.timer = setInterval(() => {
        this.serverTime = this.serverTime?.add(1, 'second') || null;
      }, 1000);
    },
  },
  getters: {
    nowTime: (state) => {
      return state.serverTime || dayjs().subtract(state.difference, 'milliseconds');
    },
  },
});
