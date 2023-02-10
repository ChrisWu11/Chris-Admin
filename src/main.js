import { BrowserTracing } from "@sentry/tracing";
import * as Sentry from "@sentry/vue";
import * as echarts from 'echarts'; // 5.0版本的echarts引入方法
// three.js
// import * as THREE from 'three'
// import iView from 'iview' // 导入组件库
// 引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vue from 'vue';
// 引入mock
// import '../mock';
import App from './App.vue';
// 引入全局样式
import './assets/css/index.css';
import router from './router';
// 引入axios
// import axios from 'axios'
// 引入Vuex
// import Vuex from 'vuex'
import store from './store/index';
// 注册permission
import './utils/permission';
// import 'iview/dist/styles/iview.css' // 导入样式
Vue.prototype.$echarts = echarts


Sentry.init({
  Vue,
  dsn: "https://3a368e0ed5894de6a50bb3510c27b717@o4504105306750976.ingest.sentry.io/4504105318481920",
  release: 'test@0.1.0',
  integrations: [
    new BrowserTracing({
      routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      tracingOrigins: ["localhost", "my-site-url.com", /^\//],
    }),
  ],
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

// Vue.prototype.$axios = axios
// Vue.use(Vuex)
Vue.use(ElementUI)
// Vue.use(iView)
Vue.config.productionTip = false

// const scene = new THREE.Scene()

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
