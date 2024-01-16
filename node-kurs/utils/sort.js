function createSort(arr){
      arr = sortArr(arr);
      return arr;
  }
  function sortArr(arr) {
    arr.sort((a, b) => {
        if (a.prices == null) {
            return 1;
        }
        if (b.prices == null) {
            return 0;
        }
        if (b.prices != null && a.prices != null) {
            return b.prices.price_min.amount - a.prices.price_min.amount;
        }
    })
    return arr;
}
function pushNewObj(newArr, id, arr){
    for(let i = 0; i < arr.length; i++){
        if(id == arr[i].id){
            newArr.push(arr[i]);
        }
    }
    return newArr
}
function delObj(id, arr){
    let newArr = [];
    for(let i = 0; i < arr.length; i++){
        if(id != arr[i].id){
            newArr.push(arr[i]);
        }
    }
    return newArr
}
  module.exports = { 
    createSort,
    pushNewObj,
    delObj
 };