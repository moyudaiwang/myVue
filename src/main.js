// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'jquery/dist/jquery.min'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import VueResource from 'vue-resource'
import axios from 'axios'
import VueAxios from 'vue-axios'
// 导入ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 导入font-awesome(导入就可以直接用了)

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VueResource)
Vue.prototype.$axios = axios

/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
