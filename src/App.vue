<template>
  <el-col :span="24">
    <el-row>
      <el-col :span="24">
        <navi/>
      </el-col>
    </el-row>

    <el-divider></el-divider>


    <el-row type="flex" justify="center" >
      <el-col :span="24" >

          <!-- <el-aside width="200px">Aside</el-aside> -->
          <!-- <el-container> -->
          <mainPanel/>
      </el-col>
    </el-row>

    <el-row>
       <div style="float:right">
            <!-- 版权内容请在本组件"内容配置-版权"处填写 -->
            <p>Copyright © 版权所有：星星哎/王精东 &nbsp;<a href="https://beian.miit.gov.cn/" target="_blank">粤ICP备xxx号</a></p>
       </div>
    </el-row>
        <!-- <el-container>
          <el-footer>Footer</el-footer>
        </el-container> -->
</el-col>


</template>
<!-- <link rel="stylesheet" tpye="text/css" href="./assets/css/main.css"> -->


<script>


// import Vue from 'vue';
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// import App from './App.vue';
// import navi from "./components/navi.vue";
// // import headers from  './headers.js';
// import mainPanel from "./components/mainPanel.vue";
// Vue.use(ElementUI);

// // Vue.component(header);
// // Vue.component(mainPanel);
// // export default {
// //   data() {
// //     return{
// //       headers
// //     }
// //   }
// // };
// export default {
//   data(){
//     return {};
//   },
//   components:{
//     navi,
//     mainPanel
//   }
// };
// new Vue({
//   el: '#app',
//   render: h => h(App)
// });

</script>

<style>


</style>
