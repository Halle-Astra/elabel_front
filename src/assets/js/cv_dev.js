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




function alphaBlend(image1, image2){

}

export async function b64_to_imageData(image_str){
  // 此函数的传入必须自带data:image头
  let image = document.createElement('img');
  // image.style.display = "none";

  // document.getElementsByTagName("div")[0].appendChild(image);
  // image.onload = function(){
  // }
  let result = "";
  let loaded_flag = false;
  let promise_onload = new Promise(()=>{
    image.onload = async function(){
        let can_temp = document.createElement("canvas");
        let ctx = can_temp.getContext('2d');
        ctx.drawImage(image, 0,0, image.naturalWidth, image.naturalHeight);
        let image_data = ctx.getImageData(0,0,image.width, image.height);
        result = image_data;
        loaded_flag=true;
        console.log("原生的高度", image.naturalWidth, image.naturalHeight);
      }
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
  await promise_onload;
  return result;
  // while (1){
  //   if (loaded_flag){return result;}
  // }
  // let timer_temp = setInterval(function(){
  //   if (loaded_flag){
  //     return result;
  //   }
  // },20);


}

