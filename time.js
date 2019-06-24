//Purpose of this to find time complexity of algorithm

var { Matrix } = require("./util");

const NS_PER_SEC = 1e9;

function clock(start) {
  if (!start) return process.hrtime();
  var diff = process.hrtime(start);
  return diff[0] * NS_PER_SEC + diff[1];
}

var mat;
var allData = {
    x: [],//Nodes 
    y: [],//Time Taken
    type: "scatter"
};

function getBaseLog(x, y) {
    return Math.log(y) / Math.log(x);
  }
for (var i = 1; i <= 100; i++) {
  var mat = new Matrix(i, i);
  var start = clock();
  mat.solve();
  var duration = clock(start);
  console.log("Took " + duration + " nanoseconds");
  allData.x.push(i);
  allData.y.push(Math.sqrt(duration));
}


console.log(allData);