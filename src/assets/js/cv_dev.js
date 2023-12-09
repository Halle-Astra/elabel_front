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
