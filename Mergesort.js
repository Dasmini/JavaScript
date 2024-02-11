// Merge sort
const arr = [1,90,0,5,1,3];
console.log("Initial Array : ", arr)
// let sorted_arr = []
function mergeSort(arr){
  let sorted_arr =[];
  const mid = Math.floor(arr.length/2);
  const left_half = arr.slice(0,mid);
  const right_half = arr.slice(mid , arr.length)
  // console.log( mid , left_half , right_half);
  if(arr.length <= 1){
  return arr;
  } else {
    const left = mergeSort(left_half);
    const right = mergeSort(right_half);
    while(left.length > 0 || right.length > 0){
      if(left[0] <= right[0]){
        sorted_arr.push(left[0]);
        left.shift();
      } 
      else if(right[0] < left[0]) {
        sorted_arr.push(right[0]);
        right.shift();
      }
      else if(left.length == 0){
        sorted_arr.push(right[0])
        right.shift();
      }
      else if(right.length == 0){
        sorted_arr.push(left[0]);
        left.shift();
      }
    }
    return sorted_arr;
  } 
  
}

console.log("Sorted Array : ", mergeSort(arr));
