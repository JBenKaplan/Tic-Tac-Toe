////////////////////////////////
// Global Variables Here
let cells = document.querySelectorAll('.box')

const resetButton = document.getElementById('resetButton')

const playerX = 'X'
const playerO = 'O'
const human = true
const computer = true
let currentPlayer = playerX

let scoreO = 0
let scoreX = 0
let draw = 0
let playCount = 0

////////////////////////////////
//Functions For Game Logic Here

//Random Color generator in HEX for text.
const colorChange = (e, currentPlayer) => {
  let i = e.target.id
  if (currentPlayer === 'O') {
    //change color of text in div to pink
    cells[i].style.color = 'pink'
  } else {
    //change color of text in div to blue
    cells[i].style.color = 'blue'
  }
}

//Method to switch players while
const playerSwitch = () => {
  document.getElementById('turn').innerHTML = `${currentPlayer} begins!`
  if (currentPlayer === 'O') {
    currentPlayer = playerX
    document.getElementById('turn').innerHTML = `O's turn`
  } else {
    currentPlayer = playerO
    document.getElementById('turn').innerHTML = `X's turn`
  }
}

//Random Color generator returns hex value
const randomColor = () => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16)
}

//Game Function
const playGame = (e) => {
  let i = e.target.id
  console.log('Cell: ' + i)
  if (cells[i].innerHTML == '') {
    playerSwitch()
    cells[i].innerHTML = currentPlayer
    cells[i].style.color = randomColor()
    playCount++
    console.log('Play Count: ' + playCount)
    if (checkWin()) {
      document.getElementById(
        'turn'
      ).innerHTML = `${currentPlayer} is the winner!`
      document.querySelector('.grid').removeEventListener('click', playGame)
      if (currentPlayer == playerO) {
        scoreO++
        console.log(scoreO + 'Current ScoreO')
        console.log(
          document.getElementById('oScore').innerHTML + 'InnerText of id ScoreO'
        )
        document.getElementById('oScore').innerHTML = scoreO
      } else {
        scoreX++
        document.querySelector('#xScore').innerHTML = scoreX
      }
      return
    }
    if (playCount == 9) {
      draw++
      document.querySelector('#dScore').innerHTML = draw
      console.log('Draw: ' + draw)
      document.querySelector('#turn').innerHTML = "It's a draw!"
      document.querySelector('.grid').removeEventListener('click', playGame)
      return
    }
  }
}

//AI game function
const playAI = (e) => {
  document.querySelector('#turn').innerHTML = 'Playing AI'
  playCount = 0
  currentPlayer = human
  if (currentPlayer == human) {
  }
}

const turnAI = () => {}
//Reset Function to clear board. Keeps point values.
const showReset = () => {
  document.querySelector('resetButton').style.visibility = 'show'
  resetButton.innerHTML = 'Play Again?'
}

//checks win condition of each combinaton from top left, top right, center, and bottom left
const checkWin = () => {
  //check wins from top left box horizontal, vertical, and diagonal
  if (cells[0].innerHTML === currentPlayer) {
    if (
      cells[1].innerHTML === currentPlayer &&
      cells[2].innerHTML === currentPlayer
    ) {
      return true
    }
    if (
      cells[3].innerHTML === currentPlayer &&
      cells[6].innerHTML === currentPlayer
    ) {
      return true
    }
    if (
      cells[4].innerHTML === currentPlayer &&
      cells[8].innerHTML === currentPlayer
    ) {
      return true
    }
  }
  //check wins from center horizontal and vertical
  if (cells[4].innerHTML === currentPlayer) {
    if (
      cells[3].innerHTML === currentPlayer &&
      cells[5].innerHTML === currentPlayer
    ) {
      return true
    }
    if (
      cells[1].innerHTML === currentPlayer &&
      cells[7].innerHTML === currentPlayer
    ) {
      return true
    }
  }
  //check wins from top right box vertical and diagonal
  if (cells[2].innerHTML === currentPlayer) {
    if (
      cells[5].innerHTML === currentPlayer &&
      cells[8].innerHTML === currentPlayer
    ) {
      return true
    }
    if (
      cells[4].innerHTML === currentPlayer &&
      cells[6].innerHTML === currentPlayer
    ) {
      return true
    }
  }
  //check win on bottom
  if (cells[6].innerHTML === currentPlayer) {
    if (
      cells[7].innerHTML === currentPlayer &&
      cells[8].innerHTML === currentPlayer
    ) {
      return true
    }
  }
}

const resetGame = () => {
  playerSwitch()
  resetButton.innerHTML = 'Reset'
  playCount = 0
  document.querySelector('.grid').addEventListener('click', playGame)
  for (let i = 0; i < cells.length; i++) {
    if (cells[i] !== '') {
      cells[i].innerHTML = ''
      // document.querySelector('#turn').innerHTML = `${currentPlayer} Begins!`
    }
  }
}
////////////////////////////////
// Event Listeners Here
document.querySelector('.grid').addEventListener('click', playGame)

document.querySelector('.AI').addEventListener('click', playAI)

resetButton.addEventListener('click', resetGame)
////////////////////////////////
//Sources Found and Used
//https://www.w3schools.com/jsref/event_target.asp
