'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

// Starting conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  //Setting score to 0 and hiding the dice initially
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();

const switchPlayer = function () {
  //Setting current score to 0 for the active player
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  //Then switching to other player
  activePlayer = activePlayer === 0 ? 1 : 0;
  //Update current score to 0
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. Generating a random dice-roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2. Display the dice, and update the image as well
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    console.log(dice);

    //3. Check if 1 rolled, if not, update current score
    if (dice !== 1) {
      currentScore += dice;
      //building id for current player and adding to its current score
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to score of active player
    scores[activePlayer] += currentScore;

    //Updating the score on frontend as well
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. Check if score is already 100, finish the game
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    }
    // 3. Switch to the other player
    switchPlayer();
  }
});

//Resetting the game on calling clicking new game
btnNew.addEventListener('click', init);
