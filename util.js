class Matrix {
  constructor(n, m) {
    this.numrows = n;
    this.numcolumns = m;
    this.generateMatrix();
  }

  generateMatrix() {
    var rows = [];
    for (var j = 0; j < this.numrows; j++) {
      var columns = [];
      for (var i = 0; i < this.numcolumns; i++) {
        columns.push({
          val: Math.round(Math.random()),
          visited: false
        });
      }
      rows.push(columns);
    }
    this.data = rows;
  }
  seed(data) {
    var self = this;
    data.forEach(function(rows, RowIndex) {
      rows.forEach(function(data, ColIndex) {
        self.data[RowIndex][ColIndex].val = data;
        self.data[RowIndex][ColIndex].visited = false;
      });
    });
  }
  print() {
    for (var j = 0; j < this.data.length; j++) {
      console.log(
        this.data[j].map(function(V) {
          return V.val;
        })
      );
    }
  }
  iterate(callback) {
    this.data.forEach(function(V, i) {
      V.forEach(function(U, j) {
        callback(U, i, j);
      });
    });
  }

  findConnectedNeighbour(i, j, collection) {
    // since we are visiting, i,j, lets put visited true
    this.getData(i, j).visited = true;
    collection.push(`${i}x${j}`);

    //Left
    var canWeGoLeft =
      j - 1 >= 0 &&
      this.getData(i, j - 1).visited === false &&
      this.getData(i, j - 1).val === 1;
    if (canWeGoLeft) {
      this.findConnectedNeighbour(i, j - 1, collection);
    }

    //Right
    var canWeGoRight =
      j + 1 <= this.numcolumns - 1 &&
      this.getData(i, j + 1).visited === false &&
      this.getData(i, j + 1).val === 1;
    if (canWeGoRight) {
      this.findConnectedNeighbour(i, j + 1, collection);
    }

    //UP
    var canWeGoUp =
      i - 1 >= 0 &&
      this.getData(i - 1, j).visited === false &&
      this.getData(i - 1, j).val === 1;
    if (canWeGoUp) {
      this.findConnectedNeighbour(i - 1, j, collection);
    }

    //Down
    var canWeGoDown =
      i + 1 <= this.numrows - 1 &&
      this.getData(i + 1, j).visited === false &&
      this.getData(i + 1, j).val === 1;
    if (canWeGoDown) {
      this.findConnectedNeighbour(i + 1, j, collection);
    }
  }
  solve() {
    // Return the total iselands of connected 1.
    //Step 1 - iterate over all the elements and put flag - visited is true, so that, we will not process it again.

    // If you find, 1, then Put inside island and Keep on expanding island, until it is not possible to extend.
    // then resume the process.
    //console.log("Solving Matrix");
    var self = this;
    var allIsLands = [];
    this.iterate(function(cell, i, j) {
      //Value, Row index, Col Index
      //console.log("visiting cell", cell);
      if (cell.visited === false) {
        cell.visited = true;
        if (cell.val === 1) {
          //found island;
          var island = [];
          //console.log("found starting cell");
          self.findConnectedNeighbour(i, j, island);
          //console.log(`We have found island with length ${island.length}`,island);
          allIsLands.push(island);
        }
      }
    });
    return allIsLands;
  }
  getData(i, j) {
    //index start with 0;
    try {
      return this.data[i][j];
    } catch (error) {
      console.log("Error accessing data", i, j);
    }
  }
  printLarge() {
    this.iterate(function(U, i, j) {
      console.log(U, i, j);
    });
  }
}

module.exports = {
  Matrix
};
