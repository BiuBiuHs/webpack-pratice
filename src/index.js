// import utils from './utils/utils'
import {func1} from './utils/utils'
require('./main.css')
import App from './app.vue'
import Vue from 'vue'
new Vue({
    el: '#app',
    template: '<App/>',
    components: { App },
  })

console.log(func1(4,5));
console.log('我是黄帅 ，正在学习webpack打包嘎嘎嘎');