import { createApp } from 'vue';
import './styles/index.scss';
import App from './App.vue';
import store from '@/store';
import router from '@/router';

import 'element-plus/theme-chalk/dark/css-vars.css';

createApp(App).use(store).use(router).mount('#app');
