import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import navi from "./components/navi.vue";
// import headers from  './headers.js';
import mainPanel from "./components/mainPanel.vue";
Vue.use(ElementUI);
// Vue.use(navi);
// Vue.use(mainPanel);
Vue.component('navi',navi);  //这才是正确的组件注册方式，一定不能单纯的写一个Vue.component(navi) https://blog.csdn.net/yxf0448/article/details/132822591
Vue.component('mainPanel',mainPanel);
// export default {
//   data() {
//     return{
//       headers
//     }
//   }
// };
export default {
  data(){
    return {};
  },
  components:{
    navi,
    mainPanel
  }
};
new Vue({
  el: '#app',
  render: h => h(App)
});
