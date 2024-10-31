export {}; // 必须保留
declare module '@vue/runtime-core' {}

export interface API<T> {
  status: number;
  data: T;
}
