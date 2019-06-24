var given = [1, -3, 2, -5, 7, 6, -1, -4, 11, -23];
//var given = [-2, 1, 2, 3, -20, 50, 60];

function sum(Arr) {
    var x = 0;
    Arr.forEach(element => {
        x = x + element;
    });
    return x;
}
function bruteForceSolve(arr) {
    //Find all possible Array;
    var allcombos = [];
    var largestSum = Number.NEGATIVE_INFINITY
    var largestStartIndex = -1;
    var largestStartLength = 0;
    var largestSumSubArray;
    var LengthwiseSum = {};
    for(var l=1; l <= arr.length; l++){
        //Now i is the length
        // Find all array
        console.log("      ====   finding all subarray of length ", l);
        // 10 is total length, l is 4, then 10-4 = 6 is index for iteration
        var runningSum = 0;
        for (let i = 0; i < arr.length - l + 1; i++) {
            //Copy L elements from the array to new one.            
            if(i==0){
                if(l===1){
                    runningSum = arr[0];
                } else {
                    runningSum = LengthwiseSum[l-1] +  arr[i+l-1];
                }
                LengthwiseSum[l] = runningSum;
            }else{
                runningSum = runningSum - arr[i-1] + arr[i+l-1];
            }
            console.log("sum - at ", i, l, runningSum);
            if(runningSum > largestSum){
                largestSum = runningSum;
                largestStartIndex = i;
                largestStartLength = l;
            }
        }
    }
    console.log(LengthwiseSum);
    console.log("Largest Sum is ", largestSum, "For Sub Array", largestSumSubArray, " Starting index", largestStartIndex, " - Length", largestStartLength);
}

console.log(bruteForceSolve(given));