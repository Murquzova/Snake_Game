const container = document.querySelector('.container');
const p = document.querySelector('p');

for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {
    container.innerHTML += `<div coordinate_x=${i} coordinate_y=${j}></div>`;
  }
}
const kletki = document.querySelectorAll('.container div');
let count = 0;
let ilan = [[1, 1]];
let eat_x = 4;
let eat_y = 5;
let eat = [eat_x, eat_y];
let arr = [[], [], []];

function Start() {
  kletki.forEach((box) => {
    let x = box.getAttribute('coordinate_x');
    let y = box.getAttribute('coordinate_y');
    if (x == 1 && y == 1) {
      box.innerHTML = `<div class='snake_head'></div>`;
    }
    if (x == eat_x && y == eat_y) {
      box.innerHTML = `<div class='yemek'></div>`;
    }
  });
}
Start();

function Go(bir, iki) {
  let i;
  ilan.unshift([bir, iki]);

  if (ilan[0][0] == eat_x && ilan[0][1] == eat_y) {
    ilan.push([ilan[ilan.length - 1][0], ilan[ilan.length - 1][1]]);
  }
  ilan.pop();

  if (ilan[0][0] == eat_x && ilan[0][1] == eat_y) {
    arr.unshift[[10, 10]];
    count++;
    p.innerHTML = `Point: ${count}`;
    eat_x = Math.floor(Math.random() * 9);
    eat_y = Math.floor(Math.random() * 9);
    for (i = 0; i < ilan.length; i++) {
      while (eat_x == ilan[i][0] && eat_y == ilan[i][1]) {
        eat_x = Math.floor(Math.random() * 9);
        eat_y = Math.floor(Math.random() * 9);
      }
    }
  }
}

function Body() {
  kletki.forEach((box) => {
    let x = Number(box.getAttribute('coordinate_x'));
    let y = Number(box.getAttribute('coordinate_y'));
    box.innerHTML = ``;
    if (ilan[0][0] == x && ilan[0][1] == y) {
      box.innerHTML = `<div class='snake_head'></div>`;
    }
    for (i = 1; i < ilan.length; i++) {
      if (ilan[i][0] == x && ilan[i][1] == y) {
        box.innerHTML = `<div class='snake'></div>`;
      }
    }
    if (x == eat_x && y == eat_y) {
      box.innerHTML = `<div class='yemek'></div>`;
    }
  });
}

function Lose() {
  arr.unshift([ilan[0][0], ilan[0][1]]);
  if (ilan.length >= 2) {
    if (arr[2][0] == ilan[0][0] && arr[2][1] == ilan[0][1]) {
      ilan = [[1, 1]];
      count = 0;
      p.innerHTML = `Point: ${count}`;
      alert('Oyun bitdi!');
      Start();
    }
  }
  for (let i = 1; i < ilan.length; i++) {
    if (ilan[0][0] == ilan[i][0] && ilan[0][1] == ilan[i][1]) {
      ilan = [[1, 1]];
      count = 0;
      p.innerHTML = `Point: ${count}`;
      alert('Oyun bitdi!');
      Start();
      break;
    }
  }
  arr.pop();
  // console.log(arr);
  // console.log(ilan);
}

document.addEventListener('keydown', function (e) {
  let bir, iki;
  switch (e.keyCode) {
    case 39:
      if (
        ilan[0][0] >= 0 &&
        ilan[0][0] < 10 &&
        ilan[0][1] >= 0 &&
        ilan[0][1] < 10
      ) {
        bir = ilan[0][1] + 1;
        iki = ilan[0][0];
        Go(iki, bir);
        Lose();
        Body();
      } else {
        alert('Oyun bitdi!');
        ilan = [[1, 1]];
        Body();
      }
      break;
    case 37:
      if (
        ilan[0][0] >= 0 &&
        ilan[0][0] < 10 &&
        ilan[0][1] >= 0 &&
        ilan[0][1] < 10
      ) {
        bir = ilan[0][1] - 1;
        iki = ilan[0][0];
        Go(iki, bir);
        Lose();
        Body();
      } else {
        alert('Oyun bitdi!');
        ilan = [[1, 1]];
        Body();
      }

      break;
    case 38:
      if (
        ilan[0][0] >= 0 &&
        ilan[0][0] < 10 &&
        ilan[0][1] >= 0 &&
        ilan[0][1] < 10
      ) {
        bir = ilan[0][0] - 1;
        iki = ilan[0][1];

        Go(bir, iki);
        Lose();
        Body();
      } else {
        alert('Oyun bitdi!');
        ilan = [[1, 1]];
        Body();
      }

      break;
    case 40:
      if (
        ilan[0][0] >= 0 &&
        ilan[0][0] < 10 &&
        ilan[0][1] >= 0 &&
        ilan[0][1] < 10
      ) {
        bir = ilan[0][0] + 1;
        iki = ilan[0][1];
        Go(bir, iki);
        Lose();
        Body();
      } else {
        alert('Oyun bitdi!');
        ilan = [[1, 1]];
        Body();
      }
      break;
    default:
      break;
  }
});
