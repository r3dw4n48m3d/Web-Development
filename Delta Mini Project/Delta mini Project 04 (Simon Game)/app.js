let gameSequence = [];
let userSequence = [];
let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;
let h2 = document.querySelector("h2");
let allButtons = document.querySelectorAll(".btn");
let p = document.querySelector("p");
let tempHighScore = 0;
let high = 0;

document.addEventListener("keypress", function () {
  if (started == false) {
    started = true;
    levelUp();
  }
});

function levelUp() {
  userSequence = [];
  level++;
  h2.innerText = `Level ${level}.`;
  let randomIndex = Math.floor(Math.random() * 3);
  let randomColor = btns[randomIndex];
  let randomButton = document.querySelector(`.${randomColor}`);
  gameSequence.push(randomColor);
  buttonFlash(randomButton);
}
function buttonFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}

function buttonPress() {
  let button = this;
  buttonFlash(button);
  let userColor = button.getAttribute("id");
  userSequence.push(userColor);
  checkAnswer(userSequence.length - 1);
}
for (button of allButtons) {
  button.addEventListener("click", buttonPress);
}
function checkAnswer(index) {
  if (userSequence[index] === gameSequence[index]) {
    if (userSequence.length == gameSequence.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    h2.innerHTML = `Game Over! Your score was <b>${level}</b><br> Press any key to start.`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 150);
    tempHighScore = level;
    if (high < tempHighScore) {
      high = tempHighScore;
      p.innerText = `High Score ${high}`;
    } else {
      p.innerText = `High Score ${high}`;
    }
    reset();
  }
}
console.log("Outside", tempHighScore);

function reset() {
  started = false;
  gameSequence = [];
  userSequence = [];
  level = 0;
}
