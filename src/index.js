module.exports = function solveSudoku(matrix) {

  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (matrix[r][c] === 0) {
        matrix[r][c] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      }
    }
  }
  solve(matrix);
  if(checkIfCompleat(matrix) && checkForRirht(matrix)) return matrix;
  searchSolve(matrix);
  return matrix;


  
function solve(matrix) {
  for (let hm = 0; hm < 5; hm++) {
    onlyVars(matrix);
    onlyVars(matrix);
    onlyVars(matrix);
    onlyVars(matrix);
    onlyVars(matrix);
    onlyVars(matrix);
    onlyVars(matrix);
    for (let rr = 0; rr < 9; rr++) {
      ifHiddenInRow(rr, matrix);
    }
    onlyVars(matrix);
    onlyVars(matrix);
    onlyVars(matrix);
    onlyVars(matrix);
    onlyVars(matrix);
    onlyVars(matrix);
    onlyVars(matrix);
    for (let cc = 0; cc < 9; cc++) {
      ifHiddenInCol(cc, matrix);
    }

    onlyVars(matrix);
    onlyVars(matrix);
    onlyVars(matrix);
    onlyVars(matrix);
    onlyVars(matrix);
    onlyVars(matrix);
    onlyVars(matrix);
    for (let a = 0; a < 9; a += 3) {
      for (let b = 0; b < 9; b += 3) {
        ifHiddenInSec(a, b, matrix);
      }
    }
  }

  onlyVars(matrix);
  onlyVars(matrix);
  onlyVars(matrix);
  onlyVars(matrix);
  onlyVars(matrix);
  onlyVars(matrix);
  onlyVars(matrix);
}

function searchSolve(matrix) {
  all: for (let kk = 0; kk < 9; kk++) {
    for (let oo = 0; oo < 9; oo++) {
      if (Array.isArray(matrix[kk][oo])) {
        for (let pp = 0; pp < matrix[kk][oo].length; pp++) {          
            matrix[kk][oo] = matrix[kk][oo][pp];
            solve(matrix);
            checkIfCompleat(matrix);
            if (checkIfCompleat(matrix)) {
              if (checkForRirht(matrix)) {
                break all;
              } else {
                searchSolve(matrix);
              }
            }
          }
        }
      }
  }
  return matrix;
}

function checkIfCompleat(matrix) {
  let chSumI = 0;
  for (r = 0; r < 9; r++) {
    for (c = 0; c < 9; c++) {
      if (Number.isInteger(matrix[r][c])) {
        chSumI += 1;
      }
    }
  }
  if (chSumI == 81) {
    return true;
  } else {
    return false
  }
}

function checkForRirht(matrix) {
  let chSumErr = 0;
  let sumsum = 0;
  outerR: for (i = 0; i < 9; i++) {
    for (j = 0; j < 9; j++) {
      sumsum += rowFor(i)[j];
    }
    if (sumsum == 45) {
      chSumErr += 1;
      sumsum = 0;
    } else {
      break outerR;
    }
  }
  if (chSumErr != 9) return false;
  // outerC: for
  outerC: for (i = 0; i < 9; i++) {
    for (j = 0; j < 9; j++) {
      sumsum += columnFor(i)[j];
    }
    if (sumsum == 45) {
      chSumErr += 1;
      sumsum = 0;
    } else {
      break outerC;
    }
  }
  if (chSumErr != 18) return false;
  // outerS: for
  if (chSumErr != 27) return false;
  return true;
}

function onlyVars(matrix) {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      onlyVarsfor(r, c);
    }
  }
  return matrix;
}

function rowFor(k) {
  return matrix[k];
}

function columnFor(o) {
  let col = [];
  for (m = 0; m < 9; m++) {
    col[m] = matrix[m][o];
  }
  return col;
}

function sectorFor(p, q) {
  let s = [];
  let t, u;
  let l = 0;
  var minR, maxR, minC, maxC;
  if (0 <= p && p < 3) {
    minR = 0;
    maxR = 2;
  }
  if (p >= 3 && p < 6) {
    minR = 3;
    maxR = 5;
  }
  if (6 <= p && p < 9) {
    minR = 6;
    maxR = 8;
  }
  if (0 <= q && q < 3) {
    minC = 0;
    maxC = 2;
  }
  if (q >= 3 && q < 6) {
    minC = 3;
    maxC = 5;
  }
  if (6 <= q && q < 9) {
    minC = 6;
    maxC = 8;
  }
  for (t = minR; t <= maxR; t++) {
    for (u = minC; u <= maxC; u++) {
      s[l] = matrix[t][u];
      l++;
    }
  }
  return s;
}

function ifHiddenInRow(row, matrix) {

  function arrElem(row) {
    let makeArrR = [];
    let Row = rowFor(row);
    for (i = 0; i < 9; i++) {
      if (Row[i].length > 1 && makeArrR.length == 0) {
        makeArrR = Row[i];
      } else if (Row[i].length > 1) {
        makeArrR = makeArrR.concat(Row[i]);
      }
    }
    return makeArrR;
  }

  let elem, count;
  let renewArrElem = arrElem(row);
  for (c = 0; c < 9; c++) {
    if (rowFor(row)[c].length > 1) {
      for (elem = 0; elem < rowFor(row)[c].length; elem++) {
        count = 0;
        for (i = 0; i < renewArrElem.length; i++) {
          if (rowFor(row)[c][elem] == renewArrElem[i]) {
            count += 1;
          }
        }
        if (count == 1) {
          rowFor(row)[c] = rowFor(row)[c][elem];
          renewArrElem = arrElem(row);
        }
      }
    }
  }
  // return makeArrR;
  return matrix;
}

function ifHiddenInCol(column, matrix) {
  // arrElemC(column);
  function arrElemC(column) {
    let makeArrC = [];
    let Col = columnFor(column);
    for (i = 0; i < 9; i++) {
      if (Col[i].length > 1 && makeArrC.length == 0) {
        makeArrC = Col[i];
      } else if (Col[i].length > 1) {
        makeArrC = makeArrC.concat(Col[i]);
      }
    }
    return makeArrC;
  }

  let elem, count;
  let renewarrElemC = arrElemC(column);
  let Colcol = columnFor(column);
  for (r = 0; r < 9; r++) {
    if (Colcol[r].length > 1) {
      for (elem = 0; elem < Colcol[r].length; elem++) {
        count = 0;
        for (i = 0; i < renewarrElemC.length; i++) {
          if (Colcol[r][elem] == renewarrElemC[i]) {
            count += 1;
          }
        }
        if (count == 1) {
          Colcol[r] = Colcol[r][elem];
          renewarrElemC = arrElemC(column);
        }
      }
    }
  }
  for (j = 0; j < 9; j++) {
    matrix[j][column] = Colcol[j];
  }

  // return Colcol;
  return matrix;
}

function ifHiddenInSec(rs, cs, matrix) {
  // arrElemS(rs,cs);
  function arrElemS(rs, cs) {
    let makeArrS = [];
    let Sec = sectorFor(rs, cs);
    for (i = 0; i < 9; i++) {
      if (Sec[i].length > 1 && makeArrS.length == 0) {
        makeArrS = Sec[i];
      } else if (Sec[i].length > 1) {
        makeArrS = makeArrS.concat(Sec[i]);
      }
    }
    return makeArrS;
  }

  let elem, count;
  let renewarrElemS = arrElemS(rs, cs);
  let Secsec = sectorFor(rs, cs);
  for (let s = 0; s < 9; s++) {
    if (Secsec[s].length > 1) {
      for (elem = 0; elem < Secsec[s].length; elem++) {
        count = 0;
        for (i = 0; i < renewarrElemS.length; i++) {
          if (Secsec[s][elem] == renewarrElemS[i]) {
            count += 1;
          }
        }
        if (count == 1) {
          Secsec[s] = Secsec[s][elem];
          renewarrElemS = arrElemS(rs, cs);
        }
      }
    }
  }
  for (k = 0; k < 3; k++) {
    matrix[rs][cs + k] = Secsec[k];
    matrix[rs + 1][cs + k] = Secsec[k + 3];
    matrix[rs + 2][cs + k] = Secsec[k + 6];
  }
  // return Secsec;
  return matrix;
}

function onlyVarsfor(hor, vert) {
  if (matrix[hor][vert].length > 1) {
    let rF = rowFor(hor);
    for (let i = 0; i < matrix[hor][vert].length; i++) {
      for (let j = 0; j < 9; j++) {
        if (matrix[hor][vert][i] == rF[j]) {
          matrix[hor][vert].splice(i, 1);
          if (matrix[hor][vert].length == 1) {
            matrix[hor][vert] = matrix[hor][vert][0];
            break;
          } else {
            i--;
          }
        }
      }
    }
    let cF = columnFor(vert);
    for (i = 0; i < matrix[hor][vert].length; i++) {
      for (j = 0; j < 9; j++) {
        if (matrix[hor][vert][i] == cF[j]) {
          matrix[hor][vert].splice(i, 1);
          if (matrix[hor][vert].length == 1) {
            matrix[hor][vert] = matrix[hor][vert][0];
            break;
          } else {
            i--;
          }
        }
      }
    }
    let sF = sectorFor(hor, vert);
    for (i = 0; i <= matrix[hor][vert].length; i++) {
      for (j = 0; j < 9; j++) {
        if (matrix[hor][vert][i] === sF[j]) {
          matrix[hor][vert].splice(i, 1);
          if (matrix[hor][vert].length == 1) {
            matrix[hor][vert] = matrix[hor][vert][0];
            break;
          } else {
            i--;
          }
        }
      }
    }
  }
  return matrix[hor][vert];
}

}

