'use strict';

const gameState = {
  maxNumber: 100,
  secretNumber: 0,
  guessCount: 0,
};

(() => {
  createBoard(gameState.maxNumber);
  gameState.secretNumber= generateRandNum(gameState.maxNumber);
  updateGuessCounter();
  setupInstructionsModal();
  setupWinModal();
  setupRestartButton();
  
})();

function generateRandNum(max) {
  return Math.floor(Math.random() * max) + 1;
}


// parameter for how large a board to create
function createBoard(max) { 
  let options = document.querySelector(" .options");

  for(let i =1; i<= max; i++){
    options.insertAdjacentHTML('beforeend', `<button class="option">${i}</button>`)
  }

  //add a event listener to every option
  document.querySelectorAll('.option').forEach(
    (btn)=>{
      btn.addEventListener('click', guessNumber)
    }
  )
} 

// takes an event from the number being clicked on
function guessNumber(event) { 
  console.log("Secret number is", gameState.secretNumber)
  console.log("User chose", event.target.textContent)

const userChoice = Number(event.target.textContent);
gameState.guessCount += 1;
updateGuessCounter();

if(userChoice === gameState.secretNumber){
  event.target.classList.add("just-right");
  turnOffAllBtns();
  showWinModal();
}
else if(userChoice > gameState.secretNumber){
  event.target.classList.add("too-high");
  hideImpossibleNumbers(userChoice, "too-high");
}
else{
  event.target.classList.add("too-low");
  hideImpossibleNumbers(userChoice, "too-low");
}
  event.target.disabled = true;
} 


// connected to a button
function tryAgain() {
  gameState.secretNumber = generateRandNum(gameState.maxNumber);
  gameState.guessCount = 0;
  updateGuessCounter();

  document.querySelectorAll('.option').forEach((btn) => {
    btn.disabled = false;
    btn.classList.remove('too-low', 'too-high', 'just-right', 'hidden-option');
  });

  const winModal = document.querySelector('#win-modal');
  if (winModal) {
    winModal.classList.remove('show');
  }
} 

function setupInstructionsModal() {
  const instructionsBtn = document.querySelector('#instructions');
  const modal = document.querySelector('#instructions-modal');

  if (!instructionsBtn || !modal) return;

  instructionsBtn.addEventListener('click', () => {
    modal.classList.add('show');
  });

  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.classList.remove('show');
    }
  });
}

function setupWinModal() {
  const winModal = document.querySelector('#win-modal');
  if (!winModal) return;

  winModal.addEventListener('click', (event) => {
    if (event.target === winModal) {
      winModal.classList.remove('show');
    }
  });
}

function showWinModal() {
  const winModal = document.querySelector('#win-modal');
  const winMessage = document.querySelector('#win-message');
  if (!winModal) return;

  if (winMessage) {
    winMessage.textContent = `You guessed ${gameState.secretNumber} in ${gameState.guessCount} guesses!`;
  }

  winModal.classList.add('show');
}

function setupRestartButton() {
  const restartBtn = document.querySelector('#restart-game');
  const playAgainBtn = document.querySelector('#play-again');

  if (!restartBtn) return;

  restartBtn.addEventListener('click', tryAgain);
  if (playAgainBtn) {
    playAgainBtn.addEventListener('click', tryAgain);
  }
}

function turnOffAllBtns(){
  document.querySelectorAll('.option').forEach((btn) => {
    btn.disabled = true;
  });
}

function updateGuessCounter() {
  const counter = document.querySelector('#guess-counter');
  if (!counter) return;

  counter.textContent = `Guesses: ${gameState.guessCount}`;
}

function hideImpossibleNumbers(guess, resultType) {
  document.querySelectorAll('.option').forEach((btn) => {
    const value = Number(btn.textContent);

    if (resultType === "too-low" && value < guess) {
      btn.classList.add('hidden-option');
      btn.disabled = true;
    }

    if (resultType === "too-high" && value > guess) {
      btn.classList.add('hidden-option');
      btn.disabled = true;
    }
  });
}
