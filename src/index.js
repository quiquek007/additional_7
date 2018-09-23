module.exports = function solveSudoku(matrix) {
  /////////////////////
  // DECLARATION
  /////////////////////
  let log = console.log;
  let resolve = 'solving';
  let isCollission = false;
  let arraySolutions = [];
  let matrixUntilCollision = [];
  let arrays = [[0, 2, 0, 2], [0, 2, 3, 5], [0, 2, 6, 8],
    [3, 5, 0, 2], [3, 5, 3, 5], [3, 5, 6, 8],
    [6, 8, 0, 2], [6, 8, 3, 5], [6, 8, 6, 8]];

  /////////////////////
  // FUNCTIONS
  /////////////////////
  function getLostNumbers(idx) {
    let template = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (let i = arrays[idx][0]; i <= arrays[idx][1]; i++) {
      for (let j = arrays[idx][2]; j <= arrays[idx][3]; j++) {
        let index = template.indexOf(matrix[i][j]);
        if (~index) template.splice(index, 1);
      }
    }
    return template;
  }

  function fillOneNumber(idx, num) {
    for (let i = arrays[idx][0]; i <= arrays[idx][1]; i++) {
      for (let j = arrays[idx][2]; j <= arrays[idx][3]; j++) {
        if (matrix[i][j] === 0) {
          if (!hasNumberInLine(num, i) && !hasNumberInRow(num, j)) {
            matrix[i][j] = num;
            return;
          }
        }
      }
    }
    isCollission = true;
  }

  function hasNumberInLine(num, line) {
    let rez = matrix[line].filter(item => num === item);
    return rez.length !== 0 ? true : false; // if have `num` then true
  }

  function hasNumberInRow(num, row) {
    for (let i = 0; i < 9; i++) {
      if (matrix[i][row] === num) return true;
    }
    return false;
  }

  function getOportunities(idx, arr) {
    let opportunity = Array.from(arr);
    opportunity.fill(0);
    for (let k = 0; k < arr.length; k++) {
      for (let i = arrays[idx][0]; i <= arrays[idx][1]; i++) {
        for (let j = arrays[idx][2]; j <= arrays[idx][3]; j++) {
          if (matrix[i][j] === 0) {
            if (!hasNumberInLine(arr[k], i) && !hasNumberInRow(arr[k], j)) {
              opportunity[k]++;
            }
          }
        }
      }
    }
    return opportunity;
  }

  function getMinCountNulls(arr) {
    let min = 0;
    for (let i = 0; i < arr.length; i++) {
      if (arr[min].length === 0) min = i;
      if (arr[i].length < arr[min].length && arr[i].length > 0) min = i;
    }
    return min;
  }

  function isMatrixSolved() {

  }


  /////////////////////
  // MAIN
  /////////////////////
  while (resolve === 'solving') {

    for (let i = 0; i < 9; i++) {
      if (isCollission) break;
      let changed = false;
      let lostNumbers = getLostNumbers(i);
      if (lostNumbers.length === 0) continue;
      else if (lostNumbers.length === 1) {
        fillOneNumber(i, lostNumbers[0]);
        // log('ji ' + i);
        changed = true;
      }
      else {
        let opportunities = getOportunities(i, lostNumbers);
        while (opportunities.includes(1)) {
          fillOneNumber(i, lostNumbers[opportunities.indexOf(1)]);
          lostNumbers.splice(opportunities.indexOf(1), 1);
          opportunities.splice(opportunities.indexOf(1), 1);
          changed = true;
        }
      }
      if (changed) i = -1;
    }

    let missNumbers = [];
    for (let i = 0; i < 9; i++) {
      missNumbers.push(getLostNumbers(i));
    }

    if (missNumbers.filter(item => item.length === 0).length === 9) {
      // log(matrix);
      return matrix;
    }

    if (arraySolutions.length === 0) arraySolutions = missNumbers;
    if (matrixUntilCollision.length === 0) matrixUntilCollision = matrix;

    // log(isCollission);
    //if get stuck
    if (isCollission) {
      matrix = matrixUntilCollision;
      let minNulls = getMinCountNulls(arraySolutions);
      fillOneNumber(minNulls,arraySolutions[minNulls][0]);
      arraySolutions[minNulls].shift();
      isCollission = false;
    } else {
      // log(matrix);
      let minNulls = getMinCountNulls(missNumbers);
      fillOneNumber(minNulls,missNumbers[minNulls][0]);
    }

    // let itemOpportunity = getOportunities(minNulls, missNumbers[minNulls]);
    // let itemMaxOpportunity = Math.max.apply(null, itemOpportunity);
    // let itemIndex = itemMaxOpportunity;
    // for (let i = 0; i < itemOpportunity.length; i++) {
    //   if (itemMaxOpportunity === itemOpportunity[i]) itemIndex = i;
    // }
    // let itemChange = itemOpportunity[itemIndex];//  !!!
    // log(itemOpportunity);
    // log(itemMaxOpportunity);
    // log(itemIndex);
    // log(itemChange);
    // log(missNumbers[minNulls]);
    // log(minNulls);
    // log(matrix);

    if (arraySolutions.filter(item => item.length !== 0).length === 0) resolve = 'unresolve';;

  }
  // log(matrix);
  return matrix;
};
