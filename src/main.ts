import { createSSRApp } from 'vue';
import * as Pinia from 'pinia';
import App from './App.vue';
import api from '@/utils/api';
import './tailwind.css';

export function createApp() {
  const app = createSSRApp(App);
  app.use(Pinia.createPinia());
  app.config.globalProperties.$api = api;
  return {
    app,
    Pinia, // 此处必须将 Pinia 返回
  };
}
