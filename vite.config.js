import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import Uni from '@dcloudio/vite-plugin-uni';
import tailwindcss from 'tailwindcss';
import nested from 'tailwindcss/nesting';
import postcssPresetEnv from 'postcss-preset-env';
import uniTailwind from '@uni-helper/vite-plugin-uni-tailwind';
import tailwindcssConfig from './tailwind.config.ts'; // 注意匹配实际文件

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [
        nested(),
        tailwindcss({
          config: tailwindcssConfig,
        }),
        postcssPresetEnv({
          stage: 3,
          features: { 'nesting-rules': false },
        }),
      ],
    },
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ['legacy-js-api'],
      }
    }
  },
  plugins: [
    // @ts-ignore
    Uni.default(),
    uniTailwind({
      /* options */
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('src', import.meta.url)),
    },
  },
});
