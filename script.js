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
    this.winner = function() {
      console.log(`${this.name} is the winner`)
      let theScore = this.score++
      return theScore
    };
    this.resetBoard = ()=>{
      console.log(this.winner())
       return this.score = 0;
    }
  }