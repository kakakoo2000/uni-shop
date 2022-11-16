
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
//导入网络请求的包
import {$http} from '@escook/request-miniprogram'
uni.$http =$http
$http.baseUrl = 'https://www.uinav.com'
//发送请求前 请求拦截器
$http.beforeRequest=function(options){
  //展示loading的效果
  uni.showLoading({
    title:"数据加载中"
  })
}
//发送请求后 响应拦截器
$http.afterRequest = function(options){
  uni.hideLoading()
}
uni.$showMsg = function(title = "数据加载失败",duration="1500"){
  uni.showToast({
    title:"数据加载失败...",
    duration:1500,
    icon:"none"
  })
}
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif