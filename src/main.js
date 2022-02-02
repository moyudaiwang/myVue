// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// 导入ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import 'jquery/dist/jquery.min'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import VueResource from 'vue-resource'
import axios from 'axios'
import VueAxios from 'vue-axios'
import BaiduMap from 'vue-baidu-map'
//主题（放最后加载）
import '../theme/index.css'
// 导入font-awesome(导入就可以直接用了)

Vue.config.productionTip = false

Vue.use(ElementUI, {size: 'medium'})
Vue.use(VueResource)
Vue.prototype.$axios = axios
Vue.use(BaiduMap, {
  ak: "cAVUjID0iSnAQgt5dyIM2iKUlBdw3eSc"
})
/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
