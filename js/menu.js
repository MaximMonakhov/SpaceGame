let difficultyButtons = document.getElementsByClassName("difficulty");
let lifeCountButtons = document.getElementsByClassName("lifeCount");

function clicked(button) {
  if (button.classList.contains("difficulty")) {
    for (let i = 0; i < 3; i++) {
      difficultyButtons[i].classList.remove('pressed');
    }
    button.classList.add("pressed");
  }

  if (button.classList.contains("lifeCount")) {
    for (let i = 0; i < 3; i++) {
      lifeCountButtons[i].classList.remove('pressed');
    }
    button.classList.add("pressed");
  }
}
