function findIndexIsNotZero(int8Array){
  var res = int8Array.findIndex(function (element, index, array){
    return element>0;
  })
}