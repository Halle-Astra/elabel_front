// import Vue from 'vue';
// import ElementUI, { Upload } from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// import App from './App.vue';
// import {ref} from 'vue';
// import './assets/css/main.css';

// Vue.use(ElementUI);
export default{
  data(){
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      disabled:false
      }
    },
  methods: {
        handleRemove(file, fileList) {
          console.log("handle Remove",file, fileList);
        },
        handlePictureCardPreview(file) {
          this.dialogImageUrl = file.url;
          console.log("长在");
          console.log(file);
          this.dialogVisible = true;
        }
      }
};



// // 将上传图标自己定义好
// var upload_box_father = $("#upload_box").parent;
// console.log(upload_box_father)

// var upload_box = document.getElementById("upload_box");
// // console.log(upload_box);
// var upload_box_parent = upload_box.parentElement;
