const DOMgrid = document.querySelectorAll('.cell')
const gameBoxDom = document.querySelector('.gameBox')
const statusMessage = document.getElementById('statusMessage')

//SCORES
const playerOneNameDom = document.querySelector('.name1')
const playerOneScoreDom = document.querySelector('.score1')

const playerTwoNameDom = document.querySelector('.name2')
const playerTwoScoreDom = document.querySelector('.score2')

//Reset Buttons
const resetScores = document.getElementById('resetScores')

//Object Contructor
function Player(name, marker,) {
    this.name = name;
    this.marker = marker;
    this.score = 0;
  }

const player1 = new Player('Player One', 'X',);
const player2 = new Player('Player Two', 'O',);

//GAME BOARD FUNCTION
function gameBoard(){
    let board = ['','','',  '','','', '','','']; 
  
  function resetBoard(board){
    board = ['','','',  '','','', '','','']; 
    gameDisplay(board)
    return board
  }
  function resetScores(){
  
  }
  
  function gameDisplay(board){
    DOMgrid.forEach(cell => {
      const index = parseInt(cell.getAttribute('data-index'));
      cell.innerHTML = board[index]
    });
  }
  
  return {board, resetBoard, gameDisplay, resetScores}
  }