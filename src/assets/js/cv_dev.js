// 原本是打算自己重头写一个类似opencv的图像处理库，但是现在发现fabric可能能够实现，因此此代码暂时搁置
function findIndexIsNotZero(int8Array){
  var res = int8Array.findIndex(function (element, index, array){
    return element>0;
  });//res 将是第一个满足条件的index
  return res;
}

function findLastIndexIsNotZero(int8Array){
  var res = int8Array.findLastIndex(function(element, index, array){
    return element>0;
  });
  res = int8Array.length-res;
  return res;
}

function findIndicesAreNotZero(int8Array){
  var index1 = findIndexIsNotZero(int8Array);
  var index2 = findLastIndexIsNotZero(int8Array);

  var indices = [] ;
  // for (var i=index1;i)

}




// function alphaBlend(image1, image2){

// }

export function b64_to_imageData(image_str){
  // 此函数的传入必须自带data:image头
  let image = document.createElement('img');
  // image.style.display = "none";

  // document.getElementsByTagName("div")[0].appendChild(image);
  // image.onload = function(){
  // }
  let result = "";
  let loaded_flag = false;
  let promise_onload = new Promise((resolve)=>{
    image.onload =  function(){
        let can_temp = document.createElement("canvas");
        let ctx = can_temp.getContext('2d');
        can_temp.height = image.height;
        can_temp.width = image.width;
        ctx.drawImage(image, 0,0, image.naturalWidth, image.naturalHeight);
        let image_data = ctx.getImageData(0,0,image.naturalWidth, image.naturalHeight);
        result = image_data;
        loaded_flag=true;
        console.log("原生的高度", image.naturalWidth, image.naturalHeight);
        console.log('普通高度',image.width, image.height)
        resolve(result);
      }
  // image.src = image_str;
  // return promise_onload;

  });


  // image.onload = function(){ //https://segmentfault.com/q/1010000018951630
  //   let can_temp = document.createElement("canvas");
  //   let ctx = can_temp.getContext('2d');
  //   ctx.drawImage(image, 0,0, image.naturalWidth, image.naturalHeight);
  //   let image_data = ctx.getImageData(0,0,image.width, image.height);
  //   result = image_data;
  //   loaded_flag=true;
  //   console.log("原生的高度", image.naturalWidth, image.naturalHeight);

  // }
  image.src = image_str;
  // await promise_onload;
  // return promise_onload;
  // return result;
  return promise_onload;
  // while (1){
  //   if (loaded_flag){return result;}
  // }
  // let timer_temp = setInterval(function(){
  //   if (loaded_flag){
  //     return result;
  //   }
  // },20);
}

export function mask2colormask(mask_imageData, color){ // 将黑白图变成彩色图
  // console.log(mask_imageData.data.length);
  let colormask_array = new Uint8ClampedArray(mask_imageData.data);
  let colormask = new ImageData(colormask_array, mask_imageData.width, mask_imageData.height);
  // console.log(colormask);
  for (i = 0; i<mask_imageData.length; i+4){
    if (mask_imageData.data[i] > 0){
      colormask.data[i] = color[0] ;
      colormask.data[i+1] = color[1];
      colormask.data[i+2] = color[2];
      colormask.data[i+3] = mask_imageData.data[i];
    }
    else{
      colormask.data[i+3] = 0;
    }
  }
  return colormask;
}

export function addMask(image, mask_imageData, color){ // 这里的mask_imageData是<h,w>
  console.log(image.data.length, mask_imageData.data.length)
  let image_new = new Uint8ClampedArray(image.data);
  let result = new ImageData(image_new, mask_imageData.width, mask_imageData.height);
  for (let i = 0; i<image.data.length;i= i+4){
    // console.log(mask_imageData.data[i/4])
    if (mask_imageData.data[i] > 0){
      // console.log(i)
      // console.log(result.data[i])
      result.data[i] = result.data[i]+color[0]  ;
      // console.log(result.data[i])
      result.data[i+1] = result.data[i+1]+color[1];
      result.data[i+2] = result.data[i+2]+color[2];
      // console.log("more jmore /* */")
      // result.data[i+3] = mask_imageData.data[i];
    }
    // else{
    //   result.data[i+3] = 0;
    // }
  }

  return result;
}


export function segment_labeled_4c(image,labeled){
  let result = new Uint8ClampedArray(image.data);
  for ( let ii = 0; ii < result.length;ii+=4){
    result[ii+4]=labeled.data[ii];
  }
  result = new ImageData(result, image.width, image.height);
  return  result;
}
