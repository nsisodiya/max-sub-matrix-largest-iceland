var { Matrix } = require("./util");

const NS_PER_SEC = 1e9;
function clock(start) {
  if (!start) return process.hrtime();
  var diff = process.hrtime(start);
  return diff[0] * NS_PER_SEC + diff[1];
}

var mat = new Matrix(6, 6);
mat.seed([
  [0, 0, 0, 0, 0, 1],
  [0, 0, 0, 1, 0, 1],
  [1, 1, 0, 1, 0, 1],
  [1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 1, 0],
  [0, 1, 0, 0, 0, 0]
]);
mat.print();

var start = clock();
var allIsLands = mat.solve();
var duration = clock(start);
console.log("=== Took " + duration/1000 + " miliseconds");
console.log(allIsLands);
