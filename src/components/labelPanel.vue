
<template>
<div :class="root_class">
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
  <!-- <a>{{src}}</a> -->
</div>
</template>

<script>
  var EasyArray =class {
    constructor(value){
      console.log('the value is '+value);
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
      console.log('the site of item ', item, 'is ', site);
      if (site > -1){
        this.value.splice(site,1);
      }
      console.log('the value now is ',this.value);
    }
    toString(){
      return this.value.join(" ");
    }
  }

  import $ from "jquery"

  export default{
    data(){
      return {
        EasyArray,
        fig_points:{
          pos_points: [],
          neg_points: []
        }
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
        console.log('the image helper ', image_helper);
        // console.log('the value of props is '+props)
        var img = new Image();
        img.src = this.src; // 这一行是核心代码
        img.onload = function() {
          console.log($("canvas"))
          // console.log("the value of canvas is ", img)
          var original_height = this.height;
          var original_width = this.width;
          // console.log("the value of height is "+ original_height);
          // var canvas_element = $("canvas")[0];
          // var canvas_element =
          // canvas_element.height = original_height;
          // canvas_element.width = original_width;

          // resize the image
          // var image_helper = $("img")[0];
          // var image_helper = ;
          var container_element = image_helper.parentElement;
          // console.log('the value of original height '+original_height);
          // console.log('the value of original width '+original_width);
          // console.log('the value of container, ');
          // console.log(container_element);
          var container_height = container_element.clientHeight;
          var container_width = container_element.clientWidth;
          // console.log("the value of container_height "+container_height);
          // console.log('the value of container width '+container_width);
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
          // image_helper.height = resized_height;
          // image_helper.width = resized_width;
          img.style.height = resized_height+'px';
          img.style.width = resized_width+'px';
          // console.log('the height of img '+img.clientHeight);
          // console.log("the height of resized_height "+ resized_height);
          // console.log('the width of resized_width '+ resized_width);

          canvas_element.height = resized_height;
          canvas_element.width = resized_width;

          // $("canvas")[0].getContext('2d').drawImage(image_helper, 0,0, resized_width, resized_height);
          canvas_element.getContext('2d').drawImage(image_helper, 0,0, resized_width, resized_height);
        }
      },
      add_pos(point_event){
        $('body')[0].classList.add('cannot_select');
        var canvas_element = this.$refs.label_panel_canvas;
        const x = point_event.offsetX;
        const y = point_event.offsetY;
        let ctx = canvas_element.getContext('2d');
        ctx.fillStyle = "rgba(0,255,0,0.5)"
        ctx.beginPath();
        ctx.arc(x,y, 2,0,2*Math.PI);  //arc+stroke就可以实现多边形绘制了
        // ctx.stroke();
        ctx.fill();
        ctx.closePath();

      },
      add_neg(point_event){
        var canvas_element = this.$refs.label_panel_canvas;
        const x = point_event.offsetX;
        const y = point_event.offsetY;
        let ctx = canvas_element.getContext('2d');
        ctx.fillStyle = "rgba(255,255,255,1)";
        ctx.beginPath();
        ctx.arc(x,y, 2,0,2*Math.PI);  //arc+stroke就可以实现多边形绘制了
        // ctx.stroke();
        ctx.fill();
        ctx.closePath();
        console.log($('body')[0])
        // $('body')[0].classList.remove('cannot_select');

        ctx.fillStyle = "rgba(255,0,0,0.8)";
        ctx.beginPath();
        ctx.arc(x,y, 2,0,2*Math.PI);  //arc+stroke就可以实现多边形绘制了
        // ctx.stroke();
        ctx.fill();
        ctx.closePath();
        console.log($('body')[0])
        // $('body')[0].classList.remove('cannot_select');
      }
    },
    computed:{
      root_class (){
        // if (typeof(this.component_class
        return this.component_class.toString();
      }
    }
  }



  // $("#img_label_panel1").change = function (){
  //   console.log('the value of props is '+props)
  //   var img = new Image();
  //   img.src = props["src"];
  //   img.onload = function() {
  //     $("canvas")[0].draw_img(img, 0,0);
  //     console.log("the value of canvas is ", img)
  //   }
  // }




</script>

<style>

.fat {
  width: 100%;
  height: 100%;
  background-color: red;
}

.content-horizontal-center{
  display: grid;
  place-items: center;
}

.unvisible {
  display: none;
}

.cannot_select {
  -ms-user-select: none;
}

</style>
