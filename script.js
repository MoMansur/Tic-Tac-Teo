const DOMgrid = document.querySelectorAll('.cell');
const gameBoxDom = document.querySelector('.gameBox');
const statusMessage = document.getElementById('statusMessage');

// SCORES
const playerOneNameDom = document.querySelector('.name1');
const playerOneScoreDom = document.querySelector('.score1');
const playerTwoNameDom = document.querySelector('.name2');
const playerTwoScoreDom = document.querySelector('.score2');

// Reset Buttons
const resetScoresButton = document.getElementById('resetScores');
const playAgainButton = document.getElementById('playAgain');
const quickPlayButton = document.getElementById('quickPlay');

document.addEventListener('DOMContentLoaded', () => {
  const userModal = document.getElementById('userModal');
  const userForm = document.getElementById('userForm');
  const startGameButton = document.getElementById('startGameButton');


  startGameButton.addEventListener('click', () => {
    userModal.style.display = 'block';
  });



function Player(name, marker,) {
  this.name = name;
  this.marker = marker;
  this.score = 1;
  this.winner = function() {
    console.log(`${this.name} is the winner`)
    let theScore = this.score++
    return theScore
  };
  this.resetScore = ()=>{
    console.log(this.winner())
     return this.score = 0;
  }
}


  userForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const player1Name = document.getElementById('player1Name').value;
    const player2Name = document.getElementById('player2Name').value;
    const player1Marker = document.querySelector('input[name="player1Marker"]:checked').value;
    const player2Marker = document.querySelector('input[name="player2Marker"]:checked').value;

    if (player1Marker === player2Marker) {
      const formErrorP = document.getElementById('formErrorP');
      formErrorP.innerHTML = `You can't have the same marker`;
    } else {
      userModal.style.display = 'none';

      player1.setName(player1Name);
      player2.setName(player2Name);
      player1.setMark(player1Marker);
      player2.setMark(player2Marker);

      playerOneNameDom.innerHTML = `${player1.getName()} (${player1.getMark()})`;
      playerTwoNameDom.innerHTML = `${player2.getName()} (${player2.getMark()})`;

      player1.resetScore();
      player2.resetScore();
      updateScores();
      gamePlay.playRound(getBoard);
    }
  });
});

function Player(name) {
  let playerName = name;
  let score = 0;
  let mark = '';

  const setMark = (value) => { mark = value; };
  const getMark = () => mark;
  const setName = (newName) => { playerName = newName; };
  const getName = () => playerName;

  const increaseScore = () => { score++; };
  const getScore = () => score;
  const resetScore = () => { score = 0; };

  return { setMark, getMark, setName, getName, increaseScore, getScore, resetScore };
}

const player1 = Player('Player One');
const player2 = Player('Player Two');
player1.setMark('X');
player2.setMark('O');

const gameBoard = (() => {
  let board = ['', '', '', '', '', '', '', '', ''];

  function resetBoard() {
    board = ['', '', '', '', '', '', '', '', ''];
    gameDisplay(board);
    return board;
  }

  function gameDisplay(board) {
    DOMgrid.forEach(cell => {
      const index = parseInt(cell.getAttribute('data-index'));
      cell.innerHTML = board[index];
    });
  }

  return { board, resetBoard, gameDisplay };
})();

const getBoard = gameBoard.board;

const gameFunctions = (() => {
  function scoreCounter(gameOver) {
    if (gameOver === 'X') {
      player1.increaseScore();
      updateScores();
      scoreDom('X');
    } else if (gameOver === 'O') {
      player2.increaseScore();
      updateScores();
      scoreDom('O');
    }
  }

  function scoreDom(x) {
    if (x === 'X') {
      playerOneNameDom.innerHTML = `${player1.getName()} (${player1.getMark()})`;
      playerOneScoreDom.innerHTML = player1.getScore();
      statusMessage.innerHTML = `${player1.getMark()} is the winner`;
    } else {
      playerTwoNameDom.innerHTML = `${player2.getName()} (${player2.getMark()})`;
      playerTwoScoreDom.innerHTML = player2.getScore();
      statusMessage.innerHTML = `${player2.getMark()} is the winner`;
    }
  }

  function animateCells(indexes, color1, color2, duration) {
    indexes.forEach(index => {
      const cell = document.querySelector(`.cell[data-index="${index}"]`);
      if (cell) {
        let isColor1 = true;
        let font = true;
        const intervalId = setInterval(() => {
          cell.style.backgroundColor = isColor1 ? color1 : color2;
          cell.style.fontSize = font ? '5rem' : '3rem';

          isColor1 = !isColor1;
          font = !font;
        }, 500);

        setTimeout(() => {
          clearInterval(intervalId);
          cell.style.backgroundColor = '';
        }, duration);
      }
    });
  }

  const checkForWins = (board) => {
    const winningCombos = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    for (const positions of winningCombos) {
      const [a, b, c] = positions;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        const theWinIndex = [a, b, c];
        animateCells(theWinIndex, 'rgb(39, 76, 74)', 'lightseagreen', 2000);
        return board[a];
      }
    }
    if (board.every(cell => cell !== "")) {
      statusMessage.innerText = 'A TIE';
      return true;
    }
    return false;
  };

  return { checkForWins, scoreCounter };
})();

statusMessage.innerText = 'Play';

// GAME PLAY FUNCTION
const gamePlay = (() => {
  let activePlayer = player1;
  let isWaitingForReset = false;  // Flag to track if the game is waiting for a reset

  const switchPlayerTurn = () => {
    if (isWaitingForReset) return; // Prevent switching turn if waiting for reset
    activePlayer = activePlayer === player1 ? player2 : player1;
    statusMessage.innerText = `${activePlayer.getMark()} is your Turn`;
  };

  const getActivePlayer = () => activePlayer;

  function gameOverFunc(gameOver) {
    if (gameOver) {
      isWaitingForReset = true; // Set the flag to true
      setTimeout(() => {
        resetBoard();
        isWaitingForReset = false; // Reset the flag after the board is reset
      }, 2000);
    }
  }

  function resetBoard() {
    getBoard.forEach((_, index) => {
      getBoard[index] = '';
    });
    gameBoard.resetBoard(getBoard);
  }

  function playerInsertMarker(board) {
    gameBoxDom.addEventListener('click', (e) => {
      if (isWaitingForReset) return; // Prevent adding marker if waiting for reset

      const clickedGrid = e.target;
      const index = parseInt(clickedGrid.getAttribute('data-index'));

      if (board[index] !== "") {
        board[index] = board[index];
      } else {
        board[index] = getActivePlayer().getMark();
        switchPlayerTurn();
      }
      gameBoard.gameDisplay(board);

      let gameOver = gameFunctions.checkForWins(board);
      gameFunctions.scoreCounter(gameOver);
      gameOverFunc(gameOver);
    });
  }

  function playRound(board) {
    gameBoard.resetBoard(board);
    playerInsertMarker(board);
  }

  playRound(getBoard);

  function playerNewRound(board) {
    gameBoard.resetBoard(getBoard);
    playerInsertMarker(board);
  }
  

  return {
    playRound,
    playerNewRound,
    playerInsertMarker,
    getActivePlayer,
    switchPlayerTurn,
  };
})();

function updateScores() {
  playerOneScoreDom.innerHTML = player1.getScore();
  playerTwoScoreDom.innerHTML = player2.getScore();
}

function DOMEventHandlers() {
  resetScoresButton.addEventListener('click', () => {
    player1.resetScore();
    player2.resetScore();
    updateScores();
  });


  quickPlayButton.addEventListener('click', () => {
    player1.setName('Player One');
    player2.setName('Player Two');
    player1.setMark('X');
    player2.setMark('O');

    playerOneNameDom.innerHTML = `${player1.getName()} (${player1.getMark()})`;
    playerTwoNameDom.innerHTML = `${player2.getName()} (${player2.getMark()})`;

    player1.resetScore();
    player2.resetScore();
    updateScores();
    gamePlay.playRound(getBoard);
  });

  const resetBoardButton = document.getElementById('resetBoard');


}

DOMEventHandlers();

let scoreX =0;
let scoreO =0;


const gameBoard = (()=>{
  let board = ['','','',  '','','', '','','']; 

function resetBoard(board){
  board.fill("");  
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

return {
  board, 
  resetBoard, 
  gameDisplay, 
  resetScores}
})()

// const getBoard = gameBoard().board
// const getReset = gameBoard().resetBoard(getBoard)

//GAME FUNCTION FUNCION
function gameFunctions(){

    let scoresArray = [player1.score, player2.score]

  function scoreCounter(gameOver){
    if(gameOver === 'X'){
      scoreDom('X', player1.score++, scoresArray[1])
    
    }else if(gameOver === 'O'){
      scoreDom('O', scoresArray[0], player2.score++) 

    }
  }

  function scoreDom(x, scoreX, scoreO){
    if(x === 'X'){
      playerOneNameDom.innerHTML = `${player1.name} (${player1.marker})`
      playerOneScoreDom.innerHTML = scoreX
    }else{
      playerTwoNameDom.innerHTML = `${player2.name} (${player2.marker})`
      playerTwoScoreDom.innerHTML =  scoreO
    }
  }

  function animateCells(indexes, color1, color2, duration,) {
    indexes.forEach(index => {
      const cell = document.querySelector(`.cell[data-index="${index}"]`);
      if (cell) {
        let isColor1 = true;
        let font = true
        const intervalId = setInterval(() => {
          cell.style.backgroundColor = isColor1 ? color1 : color2;
          cell.style.fontSize = font ? '5rem' : '3rem';
        
          statusMessage.innerHTML =` ${cell.textContent } is the winner`;

          isColor1 = !isColor1;
          font = !font

        }, 500);

        setTimeout(() => {
          clearInterval(intervalId);

          cell.style.backgroundColor = ''; 
        }, duration);
      }
    });
  }

  const checkForWins = (board) => {
    const winningCombos = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    for (const positions of winningCombos) {
      const [a, b, c] = positions;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        const theWinIndex = [a, b, c]; 
        animateCells(theWinIndex, 'rgb(39, 76, 74)', 'lightseagreen', 2000);
        return board[a]
      }
    }
      if (board.every(cell => cell !== "")) {
      console.log('tIe') 
      statusMessage.innerText = 'A TIE';
      return true
    }
      return false
  };



return {
  checkForWins, 
  scoreCounter
}
}

 statusMessage.innerText = 'Play'
//GAME PLAY FUNCTION
const gamePlay =(()=>{

  let activePlayer = player1;

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === player1 ? player2 : player1;
    statusMessage.innerText = 'Start'
    statusMessage.innerText = `${activePlayer.marker} is your Turn`
    
  }

  const getActivePlayer = () => activePlayer

  function gameOverFunc(gameOver, board) {
    if (gameOver) {
  
      // Reset board after 2 seconds
      setTimeout(() => {
        resetBoard(board);
      }, 2000);
  
      // Reset scores immediately
      resetScore();
    }
  }
  
  function resetBoard(board) {
    // Clear the board array
    board.forEach((_, index) => {
      board[index] = '';
    });
  
    // Update the UI to reflect the cleared board

    gameBoard.resetBoard(board)
  }



  function playerInsertMarker(board){
    gameBoxDom.addEventListener('click', (e)=>{
      const clickedGrid = e.target
      const index = parseInt(clickedGrid.getAttribute('data-index'));

      if(board[index] !== ""){
        board[index]= board[index]
      }else{
        board[index] = getActivePlayer().marker
        switchPlayerTurn()
      }     

   

    
      gameBoard.gameDisplay(board)

      
      let gameOver = gameFunctions().checkForWins(board)
      gameFunctions().scoreCounter(gameOver);

      
        
      gameOverFunc(gameOver, board)

      
      
    }) 

  }

  

  function playRound(board){
  playerInsertMarker(board)


  }


  function resetScore(){
    scoreX =0;
    scoreO =0;

  }
  resetScores.addEventListener('click', ()=>{
  
    let scoresArray = [0, 0]

   
   })


  return{
    playRound,
    playerInsertMarker, 
    getActivePlayer, 
    switchPlayerTurn,
    resetScore
  }
})()




gamePlay.playRound(gameBoard.board)



