import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import header from "./components/header.vue";
// import headers from  './headers.js';
import mainPanel from "./components/mainPanel.vue";
Vue.use(ElementUI);
Vue.use(header);
Vue.use(mainPanel);
// Vue.component(header);
// Vue.component(mainPanel);
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
    header,
    mainPanel
  }
};
new Vue({
  el: '#app',
  render: h => h(App)
});
