let r1 = [0, 0, 0, 0];
let r2 = [0, 0, 0, 0];
let r3 = [0, 0, 0, 0];
let r4 = [0, 0, 0, 0];

var first = 1;
var second = 2;
var current = first;
var finished = false;
var valid = true;
var playCnt = 0;

/**
 * to determine which row col effected
 * @param {*} userclick
 */

function flip(userclick) {
  if (finished == false) {
    playCnt++;
    let tmp = userclick.id.split(",");
    //console.log(separate);
    let clickrow = Number(tmp[0]);
    let clickcol = Number(tmp[1] - 1);

    switch (clickrow) {
      case 1:
        if (r1[clickcol] != 0) {
          valid = false;
          break;
        }
        r1[clickcol] = current;
        break;
      case 2:
        if (r2[clickcol] != 0) {
          valid = false;
          break;
        }
        r2[clickcol] = current;
        break;
      case 3:
        if (r3[clickcol] != 0) {
          valid = false;
          break;
        }
        r3[clickcol] = current;
        break;
      case 4:
        if (r4[clickcol] != 0) {
          valid = false;
          break;
        }
        r4[clickcol] = current;
        break;
    }

    //change player
    if (valid == true) {
      userclick.style.transform = "rotateY(180deg)";
      if (current == first) {
        userclick.style.content = "url(./pikachu.avif)";
        document.getElementById("turn").innerText = " Computer  Turn";
        document.getElementById("initial").style.content =
          "url(./nidorina.avif)";
        current = second;
        computer();
      } else {
        userclick.style.content = "url(./nidorina.avif)";
        document.getElementById("turn").innerText = " Player 1 Turn";
        document.getElementById("initial").style.content =
          "url(./pikachu.avif)";
        current = first;
      }
    }
    checkWhoWin();
  }
}

/**
 * win or draw check
 */
function checkWhoWin() {
  // vertical check
  if (vertical(first) == true) {
    finished = true;
    document.getElementById("winner").innerText = "Player 1 win!";
  } else if (vertical(second) == true) {
    finished = true;
    document.getElementById("winner").innerText = "Computer win!";
  }
  // horizontal check
  else if (horizontal(first) == true) {
    finished = true;
    document.getElementById("winner").innerText = "Player 1 win!";
  } else if (horizontal(second) == true) {
    finished = true;
    document.getElementById("winner").innerText = "Computer win!";
  }
  // diagonal check
  else if (diagonal(first) == true) {
    finished = true;
    document.getElementById("winner").innerText = "Player 1 win!";
  } else if (diagonal(second) == true) {
    finished = true;
    document.getElementById("winner").innerText = "Computer win!";
  } else if (playCnt == 16) {
    finished = true;
    document.getElementById("winner").innerText = "Draw!";
  }
}

/**
 * vertical win check
 * @param {*} player
 * @returns
 */
function vertical(player) {
  for (let index = 0; index < 4; index++) {
    if (
      r1[index] == player &&
      r2[index] == player &&
      r3[index] == player &&
      r4[index] == player
    ) {
      return true;
    }
  }
  return false;
}

/**
 * horizontal win check
 * @param {*} player
 * @returns
 */
function horizontal(player) {
  let tmpArr = [r1, r2, r3, r4];
  for (let i = 0; i < tmpArr.length; i++) {
    var cnt = 0;
    for (let j = 0; j < tmpArr.length; j++) {
      if (tmpArr[i][j] == player) {
        //r1[0],r2[0],r3[0],r4[0]...
        cnt++;
      }
    }
    if (cnt == 4) {
      return true;
    }
  }
  return false;
}

/**
 * diagonal win check
 * @param {*} player
 * @returns
 */
function diagonal(player) {
  //left diagonal
  if (
    r1[0] == player &&
    r2[1] == player &&
    r3[2] == player &&
    r4[3] == player
  ) {
    return true;
  }
  //right diagonal
  if (
    r4[0] == player &&
    r3[1] == player &&
    r2[2] == player &&
    r1[3] == player
  ) {
    return true;
  }
  return false;
}

/**
 * Player 2 (computer turns)
 */
function computer() {
  //document.getElementById(row + "" + col).click();
  var row, col;
  // get valid position in which no element there
  while (true) {
    row = Math.floor(Math.random() * 4 + 1);
    col = Math.floor(Math.random() * 4 + 1);
    console.log(row + "" + col);
    if (isValidPos(row, col - 1)) {
      break;
    }
  }

  var tmpArr = [r1, r2, r3, r4];
  var flag = false;
  //check win posibility by computer first
  if (winProbabilityByComputer(tmpArr, second)) {
    flag = true;
  }

  //check horizontal win probability by player 1 , check array by array
  else if (horizontalProbability(tmpArr, first)) {
    flag = true;
  }

  //check vertical win probability by player 1
  else if (verticalProbability(tmpArr, first) == true) {
    flag = true;
    //console.log("reachHere vertical" + ":" + flag);
  }

  //check diagonal win probability by player 1
  else if (diagonalProbability(tmpArr, first) == true) {
    flag = true;
  }

  // if there is not any win possibility for both player 1 and computer,
  // set at random position
  if (flag == false) {
    // if not horizontal nor vertical, do random
    setTimeout(() => {
      document.getElementById(row + "," + col).click();
    }, 2000);
  }
}

/**
 * check if the postion is empty or already taken
 * @param {*} row
 * @param {*} col
 * @returns
 */
function isValidPos(row, col) {
  switch (row) {
    case 1:
      if (r1[col] == 0) {
        return true;
      }
      return false;
    case 2:
      if (r2[col] == 0) {
        return true;
      }
      return false;
    case 3:
      if (r3[col] == 0) {
        return true;
      }
      return false;
    case 4:
      if (r4[col] == 0) {
        return true;
      }
      return false;
  }
}
function horizontalProbability(arr, player) {
  for (let index = 0; index < arr.length; index++) {
    if (H_Probability(arr[index], player) == true) {
      return true;
    }
  }
  return false;
}
/**
 * check horizontal win probability by player 1
 * @param {*} array
 * @param {*} player
 * @returns
 */
function H_Probability(array, player) {
  let count = 0;
  let blank = 0;
  var isFree = false;
  var row = array === r1 ? 1 : array === r2 ? 2 : array === r3 ? 3 : 4;
  for (let index = 0; index < array.length; index++) {}
  for (let index = 0; index < array.length; index++) {
    if (array[index] == player) {
      console.log(array);
      count++;
    } else {
      if (array[index] == 0) {
        blank = index;
        isFree = true;
      }
    }
  }
  if (count == 3 && isFree) {
    blank += 1;
    let forceClick = row + "," + blank;
    setTimeout(() => {
      document.getElementById(forceClick).click();
    }, 2000);
    return true;
  }
  return false;
}

/**
 * check vertical win probability by player 1
 * @param {*} arr
 * @param {*} player
 * @returns
 */
function verticalProbability(arr, player) {
  var row;
  col = 0;
  var isFree = false;
  for (let i = 0; i < 4; i++) {
    var cnt = 0;
    for (let j = 0; j < 4; j++) {
      if (arr[j][i] == player) {
        //r1-0,r2-0,r3-0,r4-0...
        cnt++;
        console.log(cnt);
      } else {
        row = j + 1;
      }
    }
    if (cnt == 3) {
      col = i + 1;
      if (arr[row - 1][col - 1] == 0) {
        isFree = true;
      }
      break;
    }

    //console.log("row is:" + row + " column is:" + col);
  }
  if (isFree) {
    let forceClick = row + "," + col;
    setTimeout(() => {
      document.getElementById(forceClick).click();
    }, 2000);
    return true;
  }
  return false;
}

/**
 * check diagonal win probability by player 1
 * @param {*} arr
 * @param {*} player
 * @returns
 */
function diagonalProbability(arr, player) {
  let diaArr1 = [arr[0][0], arr[1][1], arr[2][2], arr[3][3]];
  let diaArr2 = [arr[3][0], arr[2][1], arr[1][2], arr[0][3]];

  if (leftDiagonalProbability(diaArr1, player)) {
    return true;
  } else if (rightDiagonalProbability(diaArr2, player)) {
    return true;
  } else return false;
}

/**
 * check left diagonal win probability by player 1
 * @param {*} diaArr1
 * @param {*} player
 * @returns
 */
function leftDiagonalProbability(diaArr1, player) {
  var count = 0;
  var row,
    col = 0;
  var isFree = false;
  for (let index = 0; index < diaArr1.length; index++) {
    if (diaArr1[index] == player) {
      count++;
    } else {
      row = index + 1;
      col = index + 1;
      if (diaArr1[index] == 0) {
        isFree = true;
      }
    }
  }
  //console.log("diagonal count: " + count);
  //console.log("address is: "+row+","+col);
  if (count == 3 && isFree) {
    console.log("reachHere: leftDiagonal, player: " + player);
    let forceClick = row + "," + col;
    setTimeout(() => {
      document.getElementById(forceClick).click();
    }, 2000);
    return true;
  }
  return false;
}

/**
 * Check right diagonal win probability by player 1
 * @param {*} diaArr2
 * @param {*} player
 * @returns
 */
function rightDiagonalProbability(diaArr2, player) {
  var count = 0;
  var row,
    col = 0;
  var isFree = false;
  for (let index = 0; index < diaArr2.length; index++) {
    if (diaArr2[index] == player) {
      count++;
    } else {
      row = 3 - index + 1;
      col = index + 1;
      if (diaArr2[index] == 0) {
        isFree = true;
      }
    }
  }
  //console.log("diagonal count: " + count);
  //console.log("address is: "+row+","+col);
  if (count == 3 && isFree) {
    console.log("reachHere: rightdiagonal");
    let forceClick = row + "," + col;
    setTimeout(() => {
      document.getElementById(forceClick).click();
    }, 2000);
    return true;
  }
  return false;
}

/**
 * check win all horizontal, vertical and diagonal win probability by computer,
 * @param {*} arr
 * @returns
 */
function winProbabilityByComputer(arr) {
  if (horizontalProbability(arr, second)) {
    return true;
  }
  if (verticalProbability(arr, second)) {
    return true;
  }
  if (diagonalProbability(arr, second)) {
    return true;
  } else return false;
}


