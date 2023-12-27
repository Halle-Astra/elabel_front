<template>
<el-container>
  <el-aside width='20%' id="aside_image_list">
    <div style="margin-left:20px; margin-top:10px;">
      <!-- 关于 object-fit不起效https://segmentfault.com/q/1010000043121143 -->
      <!-- <el-scrollbar> -->
      <ul class="infinite-list" style="overflow:auto; width:200px;">
        <li v-for="image_obj in images_selected" :id="images_selected.name" style="list-style:none" class="infinite-list-item">
              <el-image  style="width:200px; height:100px; border-radius: 5px; margin-top:20px;"
              :src="image_obj.data"
              :alt="image_obj.name"
              fit="cover"
              lazy
              @click="send2label_process">
              </el-image>
              <el-divider ></el-divider>
        </li>
      </ul>
      <!-- </el-scrollbar> -->
    </div>
  </el-aside>
  <!-- <el-main style="display:flex ;justify-content:center ;align-items:center"> -->
  <el-main style="display:flex ;justify-content:center ;">
    <!-- action="http://localhost:5000/label.online/upload" -->
    <el-upload
      action="http://localhost:5000/label.online/upload"
      :on-remove="handleRemove"
      :before-upload="before_upload_image"
      list-type="picture"
      drag
      multiple
      id="main_upload_box"
      class="cls_placeholder">
      <!-- <i class="el-icon-plus"></i> -->
      <div class="upload_box" >
        <!-- https://m.imooc.com/wenda/detail/529884 -->
        <!-- <input type="file"> -->
        拖拽或点击上传图片
      </div>
    </el-upload>
<!--
    <el-dialog :visible.sync="dialogVisible">
      <el-image  style="width: 100px;height:100px; " :src="dialogImageUrl" alt=""  lazy=true fit="none"></el-image>
    </el-dialog> -->
    <!-- label_panel_src要记得放进export default里 -->
    <labelPanel :src="label_panel_src"  ref='main_label_panel'
      :component_class="label_panel_init_class"/>
  </el-main>
  <el-aside width=20%>
    <!-- <el-col span=24>
      <el-col span=22> -->
      <div class="right-row">
      <!-- <div style="width:80%; margin-left:10%; margin-right:10%;"> -->
        <el-upload
          action="http://localhost:5000/label.online/upload"
          :on-remove="handleRemove"
          :before-upload="before_upload_image"
          list-type="picture"
          drag
          multiple
          id="aside_upload_box"
          class="cls_placeholder unvisible"
          style="">
          <!-- <i class="el-icon-plus"></i> -->
          <div class="upload_box" >
            <!-- https://m.imooc.com/wenda/detail/529884 -->
            <!-- <input type="file"> -->
            拖拽或点击上传图片
          </div>
        </el-upload>
      </div>
      <div  class="right-row unvisible" @click="start_label" ref="main_panel_label_button"><el-button style="width:100%" >开始标注</el-button></div>
     <!-- </el-col>
  </el-col> -->
  </el-aside>
</el-container >
</template>

<script>

  // ComponentClass.prototype.method_name = function(first_argument) {  };

  import $ from "jquery";
  import labelPanel from "./labelPanel.vue";

  import Vue from "vue";
  Vue.component("labelPanel", labelPanel)
  // Vue.component()
  console.log('the labelpanel')
  console.log(labelPanel.data().EasyArray)
  var EArray = labelPanel.data().EasyArray;
  export default{
    data(){
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        disabled:false,
        images_selected:[],
        label_panel_src,
        label_panel_init_class:new EArray(["fat","content-horizontal-center","unvisible"]),
      }
    },
    // components:{
    //   label_panel: labelPanel
    // },
    methods: {
          start_label(){
            // console.log(labelPanel);
            this.$refs.main_label_panel.start_label();
          },
          handleRemove(file, fileList) {
            console.log("handle Remove",file, fileList);
          },
          handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
          },
          // before_upload_image,
          before_upload_image(file){
            var imagePromise = fileToBase64(file);
            var images_selected=this.images_selected;
            imagePromise.then(function(result){
              var filename = result[0];
              var b64_res = result[1];
              var json_data = {};
              json_data.name = filename;
              json_data.data = b64_res;
              // promise_result.name = filename;
              // promise_result.data = b64_res;
              images_selected.push(json_data);
              console.log(images_selected);
            });


            //阻止文件上传
            return false;
          },
          send2label_process(pointer_event){
            console.log(pointer_event);
            $("#main_upload_box")[0].classList.add("unvisible");
            $("#aside_upload_box")[0].classList.remove("unvisible");
            this.$refs.main_panel_label_button.classList.remove('unvisible');
            console.log('refs',this.$refs.main_label_panel);
            console.log('refs',this.$refs.main_label_panel.classList);
            console.log(this.$refs.main_label_panel.component_class);
            this.$refs.main_label_panel.component_class.remove('unvisible');
            this.label_panel_src=pointer_event.srcElement.currentSrc;
            // return label_panel_src;
          }
        },
    computed:{

    }
  };

  // 变量定义
  // var images_selected = [];
  var label_panel_src = ""; //最重要的是涉及作用域的问题，尤其是父子组件传输的时候，正常来讲，子组件只会渲染一次，而父组件会渲染很多次，所以父组件随意一点。
  // 函数定义

  // function before_upload_image(file){

  //   var imagePromise = fileToBase64(file);
  //   imagePromise.then(function(result){
  //     var filename = result[0];
  //     var b64_res = result[1];
  //     var json_data = {};
  //     json_data.name = filename;
  //     json_data.data = b64_res;
  //     images_selected.push(json_data);
  //     console.log(images_selected);
  //   });

  //   //阻止文件上传
  //   return false;
  // }

  function fileToBase64(file) {
    // https://www.cnblogs.com/yuzhihui/p/17041062.html
    return new Promise((resolve, reject) => {
      // 创建一个新的 FileReader 对象
      const reader = new FileReader();
      // 读取 File 对象
      reader.readAsDataURL(file);
      // 加载完成后
      reader.onload = function () {
        // 将读取的数据转换为 base64 编码的字符串
        const base64String = reader.result;
        // 解析为 Promise 对象，并返回 base64 编码的字符串
        resolve([file.name, base64String]);
      };

      // 加载失败时
      reader.onerror = function () {
        reject(new Error("Failed to load file"));
      };
    });
  }


  // var aside_image_list = $("#aside_image_list");
  // window


</script>

<style>
  .el-upload-dragger {      /*促使元素垂直居中*/
    display:grid;
    place-items:center;
  }

#aside_image_list {
  height:550px;
}

/*针对upload的dragger进行调整*/
#aside_upload_box > div[tabindex="0"] > div.el-upload-dragger{
  width: 100%;
}
#aside_upload_box >  div[tabindex="0"]{
  width:100%;
  /* height: 100px; */
}


::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background-color: #f5f5f5;
  border-radius: 8px;
}

::-webkit-scrollbar-thumb {
  background-color: #dcdcdc;
  border-radius: 8px;
  border: 2px solid #f5f5f5;
}

.cls_placeholder {}

.unvisible {
  display:none;
}

.right-row {
  width:80%; margin-left:10%; margin-right:10%;
  margin-top:10px;
  margin-bottom:10px;
}

</style>
