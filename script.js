let score = 0;
let lives = 3;
let time = 60;
let correctAnswer;
let timer;

const menu = document.getElementById('menu');
const game = document.getElementById('game');
const bestScoreEl = document.getElementById('bestScore');

bestScoreEl.textContent = localStorage.getItem('bestScore') || 0;

function startGame() {
  score = 0;
  lives = 3;
  time = 60;

  document.getElementById('score').textContent = score;
  document.getElementById('lives').textContent = lives;
  document.getElementById('time').textContent = time;

  menu.classList.remove('active');
  game.classList.add('active');

  nextQuestion();

  clearInterval(timer);
  timer = setInterval(() => {
    time--;
    document.getElementById('time').textContent = time;
    if (time <= 0) endGame();
  }, 1000);
}

function nextQuestion() {
  const diff = document.getElementById('difficulty').value;
  const opSelect = document.getElementById('operation').value;

  let max = diff === 'easy' ? 10 : diff === 'medium' ? 25 : 50;

  let a = Math.floor(Math.random() * max) + 1;
  let b = Math.floor(Math.random() * max) + 1;

  let ops = ['+', '-', '*', '/'];
  let op = opSelect === 'all' ? ops[Math.floor(Math.random() * ops.length)] : opSelect;

  if (op === '/') { a = a * b; correctAnswer = a / b; }
  else if (op === '+') correctAnswer = a + b;
  else if (op === '-') correctAnswer = a - b;
  else if (op === '*') correctAnswer = a * b;

  document.getElementById('question').textContent = `${a} ${op} ${b} = ?`;
  document.getElementById('answer').value = '';
}

function checkAnswer() {
  const user = Number(document.getElementById('answer').value);

  if (user === correctAnswer) {
    score += 10;
    if (user === correctAnswer) {
    score += 10;
  } else {
    lives--;
  }
  }

  document.getElementById('score').textContent = score;
  document.getElementById('lives').textContent = lives;

  if (lives <= 0) endGame();
  else nextQuestion();
}

function endGame() {
  clearInterval(timer);

  let best = localStorage.getItem('bestScore') || 0;
  if (score > best) localStorage.setItem('bestScore', score);

  alert(`Oyun Bitti! Skor: ${score}`);
  goMenu();
}

function goMenu() {
  game.classList.remove('active');
  menu.classList.add('active');
  bestScoreEl.textContent = localStorage.getItem('bestScore') || 0;
}