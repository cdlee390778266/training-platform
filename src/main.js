// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router/router'
import ElementUI from 'element-ui';
import VeLine from 'v-charts/lib/line.common'
import VeRing from 'v-charts/lib/ring.common'
import 'element-ui/lib/theme-chalk/index.css';
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import App from './App'

import Utils from './js/utils.js'

Vue.prototype.$utils = Utils

Vue.config.productionTip = false

Vue.component(VeLine.name, VeLine)
Vue.component(VeRing.name, VeRing)
Vue.use(ElementUI);
Vue.use(VueAwesomeSwiper);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
});