import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
// 全局指令注册
import { lazyPlugin } from '@/directives';
import { componentPlugin } from '@/components/index';

import App from './App.vue';
import router from './router';

import '@/styles/common.scss';

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(router);
app.use(lazyPlugin);
app.use(componentPlugin);

app.mount('#app');
