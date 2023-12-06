
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
    toString(){
      return this.value.join(" ");
    }
    indexOf(item,positive){
      var index = this.value.indexOf(item);
      return index;
    }
  }

  import $ from "jquery"

  export default{
    data(){
      return {
        EasyArray,
        label_params:{
          pos_points: new EasyArray([]),
          neg_points: new EasyArray([])
        },
        image_wo_label:null
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
        var img = new Image();
        img.src = this.src; // 这一行是核心代码
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
          this.image_wo_label = canvas_element.getContext('2d').getImageData(0,0, resized_width, resized_height);
        }
      },
      add_pos(point_event){
        $('body')[0].classList.add('cannot_select');

        const x = point_event.offsetX;
        const y = point_event.offsetY;
        if (!is_in_points([x,y], this.label_params.pos_points)){
          this.label_params.pos_points.add([x,y]);
        }
        while (is_in_points([x,y], this.label_params.neg_points)){
          this.label_params.neg_points.remove([x,y]);
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
        while (is_in_points([x,y], this.label_params.pos_points)){
          this.label_params.pos_points.remove([x,y]);
        }
        if (!is_in_points([x,y], this.label_params.neg_points)){
          this.label_params.neg_points.add([x,y]);
        }
        // this.canvas_show();

        var canvas_element = this.$refs.label_panel_canvas;
        let ctx = canvas_element.getContext('2d');
        this.canvas_draw_points(ctx);
      },
      canvas_draw_points(ctx){
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
        console.log('执行结束， 现在的点集是', this.label_params)
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
  console.log('the value of point, is ', point)
  console.log('the value of is_in,' ,is_in)
  console.log('the value of point_site', point_site);
  console.log('the value of points_set', points_set)
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
  -ms-user-select: none; /*对chrome无效*/
  user-select: none; /*这个是目前对chrome来讲有效的*/
}

</style>
