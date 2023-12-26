
<template>
<div :class="root_class" @keyup.enter="start_label" tabindex='2'>
  <!-- 本组件中，这个元素将称为image_helper,起到辅助但重要的作用 -->
  <img :src="src" class="unvisible"  ref="img_label_panel1" @load="canvas_show"/>

  <div class="content-horizontal-center">
  <!-- 目前canvas的这两个class先放着，以后再思考怎么利用 -->
    <canvas class="label_panel_center w90"
      ref='label_panel_canvas'
      @click="add_pos"
      @dblclick="add_neg"

      >

    </canvas>

  </div>
  <!-- <div class="content-horizontal-center"> -->
      <!-- <img ref="test_image" :src="src"/> -->
      <!-- <canvas ref="temp" ></canvas> -->
    <!-- </div> -->
  <!-- <div class="content-horizontal-center"> -->
      <!-- <img ref="test_image" :src="src"/> -->
      <!-- <canvas ref="temp" ></canvas> -->
  <!-- </div> -->
  <!-- <a>{{src}}</a> -->
</div>

</template>

<script>
  function isSame(item1, item2){
    return item1.toString()===item2.toString();
  }

  var EasyArray =class {
    constructor(value=[]){
      if (typeof(value)==='string'){
        value = value.split(' ');
      }
      this.value = value;
    }
    add(item){
      this.value.push(item);
    }
    remove(item){
      var site = this.value.indexOf(item);
      if (site > -1){
        this.value.splice(site,1);
      }
    }
    removeByIndex(site){
      if (site > -1){
        this.value.splice(site,1);
      }
    }
    toString(){
      return this.value.join(" ");
    }
    indexOf(item,positive){
      var index = this.value.indexOf(item);

      // 针对对象元素的情况， 比如array
      var index2=-1;
      for (let ii =0;ii<this.value.length;ii++){
        // console.log('kkkk',this.value.length)
        let t_i=this.value[ii];
        if(isSame(t_i,item)){
          index2=ii;
        }
      }
      index=Math.max(index,index2);
      return index;
    }
  }

  import $ from "jquery"
  // import '../assets/js/cv_dev.js'
  // console.log(findIndexIsNotZero)
  import  {b64_to_imageData, mask2colormask, addMask} from "../assets/js/cv_dev.js"

  export default{
    created(){
      // console.log('现有元素有',this.$refs)
      // this.$refs.label_panel_canvas.onkeyup=function(e){
      //   console.log(e)
      // }
    },
    data(){
      return {
        EasyArray,
        label_params:{
          pos_points: new EasyArray([]),
          neg_points: new EasyArray([])
        },
        image_wo_label:null,
        current_labeled_b64 : ""
      }
    },
    props: {
      src: {type: String, proxy:true, default:"defaultvalue"},
      component_class: {
        // type: EasyArray,
        proxy:true,
        default:new EasyArray(["fat","content-horizontal-center"])
      }
    },
    methods:{
      canvas_show (){
        var image_helper = this.$refs.img_label_panel1;
        var canvas_element = this.$refs.label_panel_canvas;
        let image_wo_label = this.image_wo_label;
        var img = new Image();
        img.src = this.src; // 这一行是核心代码
        var origin = this; // 666， 突发奇想，竟然解决了
        img.onload = function() {
          var original_height = this.height;
          var original_width = this.width;
          var container_element = image_helper.parentElement;
          var container_height = container_element.clientHeight;
          var container_width = container_element.clientWidth;
          var container_hwratio = container_height/container_width;
          var original_hwratio = original_height/original_width;
          var resized_height = 0;
          var resized_width = 0;
          if (original_hwratio>container_hwratio){
            resized_height = container_height;
            resized_width = resized_height/original_hwratio;
          } else{
            resized_width = container_width;
            resized_height = resized_width * original_hwratio;
          }
          img.style.height = resized_height+'px';
          img.style.width = resized_width+'px';
          canvas_element.height = resized_height;
          canvas_element.width = resized_width;

          canvas_element.getContext('2d').drawImage(image_helper, 0,0, resized_width, resized_height);
          image_wo_label = canvas_element.getContext('2d').getImageData(0,0, resized_width, resized_height);
          // console.log('this image label', image_wo_label);
          origin.set_image_wo_label(image_wo_label);
        }
      },
      add_pos(point_event){
        $('body')[0].classList.add('cannot_select');

        const x = point_event.offsetX;
        const y = point_event.offsetY;
        // 简单的增加样本点可以用[x,y]，因为不涉及索引问题
        if (!is_in_points([x,y], this.label_params.pos_points)){
          this.label_params.pos_points.add([x,y]);
          console.log('正样本添加')
        }

        // 删除时必须要用索引
        let point = [x,y];
        let site_point_in_neg = this.label_params.neg_points.indexOf(point);
        while (site_point_in_neg>-1){
          this.label_params.neg_points.removeByIndex(site_point_in_neg);
          site_point_in_neg = this.label_params.neg_points.indexOf(point);
          console.log('负样本删除')
        }
        var canvas_element = this.$refs.label_panel_canvas;
        let ctx = canvas_element.getContext('2d');
        this.canvas_draw_points(ctx);

      },
      add_neg(point_event){
        // var canvas_element = this.$refs.label_panel_canvas;
        const x = point_event.offsetX;
        const y = point_event.offsetY;
        // let ctx = canvas_element.getContext('2d');

        if (!is_in_points([x,y], this.label_params.neg_points)){
          this.label_params.neg_points.add([x,y]);
          console.log('负样本增加')
        }

        let point = [x,y];
        let site_point_in_pos = this.label_params.pos_points.indexOf(point);
        while (site_point_in_pos>-1){
          this.label_params.pos_points.removeByIndex(site_point_in_pos);
          site_point_in_pos = this.label_params.pos_points.indexOf(point);
          console.log('正样本删除')
        }
        // this.canvas_show();  // 详见Bug1

        var canvas_element = this.$refs.label_panel_canvas;
        let ctx = canvas_element.getContext('2d');
        this.canvas_draw_points(ctx);
      },
      canvas_draw_points(ctx){
        //既然都已经所有点都重绘了，不如就干脆一开始就重绘原图
        var canvas_element = this.$refs.label_panel_canvas;
        canvas_element.getContext('2d').putImageData(this.image_wo_label,0,0);


        var points = this.label_params.pos_points.value;
        for(var i=0; i<points.length;i++){
          var point = points[i];
          draw_dot(ctx, point[0], point[1],'g');
        }
        var points = this.label_params.neg_points.value;
        for (var i=0; i<points.length;i++){
          var point = points[i];
        //for (let point in this.label_params.neg_points.value){
          draw_dot(ctx, point[0], point[1], 'r');
        }
      },
      set_image_wo_label(image_wo_label){
        this.image_wo_label = image_wo_label;
      },
      start_label(){
        let img_b64 = imageData2dataUrl(this.image_wo_label);
        let canvas_element = this.$refs.label_panel_canvas;
        let image_original = this.image_wo_label;
        let image_temp = this.$refs.test_image;
        let real_this = this;
        let data = {
            image: img_b64,
            pos_points : this.label_params.pos_points.value,
            neg_points : this.label_params.neg_points.value
          };
        let data_obj = JSON.stringify(data);   // flask接收到json的核心代码，这样子，flask不能再使用request.values,而要使用request.json
        console.log('已通知服务器开始标注')
        $.ajax({
          url:"http://localhost:5000/label.online/sam/upload",
          type:'post',
          // dataType:'json',
          contentType:'application/json', // 为了保证flask里可以用request.json
          data: data_obj,
          success: function (mask){
            console.log("服务器标注完成")
            // image_temp.src = mask;
            // image_temp.style.display='none';
            real_this.update_current_labeled_b64(mask);
            // console.log("一阶段完成")
            // let promise_temp =   b64_to_imageData(mask);
            // let mask_temp = "";
            // promise_temp.then(function(result){
            //   mask_temp = result;
            // })
            // mask_temp = promise_temp;
            // console.log("data", mask_temp);
            let mask_promise = b64_to_imageData(mask);
            mask_promise.then(result=> { // 得，记起来这个promise的特点和用法了，这种不彻底的回调地狱！
              console.log('data', result) //这时候是一个预期的imageData了, 但是因为经过canvas，所以是一个4通道的。
              // real_this.$refs.temp.getContext('2d').putImageData(result, 0,0/*  */)
              // let colormask = mask2colormask(result);
              // real_this.$refs.temp.width = result.width;
              // real_this.$refs.temp.height =  result.height;
              // real_this.$refs.temp.getContext('2d').putImageData(result,0,0);
              let image_with_label = addMask(image_original, result,[0,8,95]);
              canvas_element.getContext('2d').putImageData(image_with_label,0,0);
              console.log("图像融合结束")
            })

            }
        })

      },
      update_current_labeled_b64(result){ //方便更新一些变量，这是临时方案，估计要存的变量还是不少的，所以还是用一个对象存比较好
        this.current_labeled_b64 = result;
      }
    },
    computed:{
      root_class (){
        // if (typeof(this.component_class
        return this.component_class.toString();
      }
    }
  }


function is_in_points(point,points_set){
  let point_site = points_set.indexOf(point);
  let is_in = false;
  if (point_site > -1){
    is_in = true;
  }

  return is_in;
}

function draw_dot(ctx, x,y,color='r',r=3){
  if (color === 'r'){
    color = "rgba(255,0,0,0.8)";
  }  else if(color==='g') {
    color = "rgba(0,255,0,0.5)"
  }
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x,y, r,0,2*Math.PI);  //arc+stroke就可以实现多边形绘制了
  // ctx.stroke();
  ctx.fill();
  ctx.closePath();
}

function imageData2dataUrl(imageData){
  let canvas_temp = document.createElement('canvas');
  canvas_temp.height=imageData.height;
  canvas_temp.width=imageData.width;
  // console.log(canvas_temp, canvas_temp.height);

  canvas_temp.getContext('2d').putImageData(imageData,0,0);
  return canvas_temp.toDataURL();
}


</script>

<style>

.fat {
  width: 100%;
  height: 100%;
  /* background-color: red; */
}

.content-horizontal-center{
  display: grid;
  place-items: center;
}

.unvisible {
  display: none;
}

.cannot_select {
  -ms-user-select: none; /*对chrome无效*/
  user-select: none; /*这个是目前对chrome来讲有效的*/
}

</style>
