'use strict';
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');

let score, activePlayer, currentScore;

const init = function () {
  activePlayer = 0;
  currentScore = 0;
  score = [0, 0];

  score0.textContent = 0;
  score1.textContent = 0;
  score0.textContent = score1.textContent = 0;
  current0.textContent = current1.textContent = 0;

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');

  document.querySelector('.dice').classList.add('hidden');
  document.querySelector('.player--0').classList.add('player--active');
  document.querySelector('.player--1').classList.remove('player--active');
};

init();

btnRoll.addEventListener('click', function () {
  if (score[activePlayer] <= 30) {
    let rolled = Math.trunc(Math.random() * 6) + 1;

    document.querySelector('.dice').classList.remove('hidden');
    document.querySelector('.dice').src = `dice-${rolled}.png`;

    if (rolled !== 1) {
      currentScore += rolled;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      activePlayer = activePlayer === 0 ? 1 : 0;
      currentScore = 0;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.toggle('player--active');
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    }
  }
});

btnHold.addEventListener('click', function () {
  if (score[activePlayer] <= 30) {
    document.getElementById(`score--${activePlayer}`).textContent =
      currentScore;
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');

    score[activePlayer] += currentScore;

    if (score[activePlayer] >= 30) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document.querySelector('.dice').classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document.getElementById(`score--${activePlayer}`).textContent =
        score[activePlayer];
    } else {
      document.getElementById(`score--${activePlayer}`).textContent =
        score[activePlayer];
      activePlayer = activePlayer === 0 ? 1 : 0;
      currentScore = 0;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.toggle('player--active');
    }
  }
});

btnNew.addEventListener('click', function () {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  init();
});
