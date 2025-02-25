import Home from "./home.js";
import End from "./end.js";
import Board from "./board.js";
import { sound } from "./../data/sound.js";

const Game = ((_) => {
  const letters = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  const words = ["apple", "ball", "cat", "dog", "elephant"];
  let chosenWord;
  let guessingWord;
  let guesses;
  let lives;

  // cache the dom
  const $hangman = document.querySelector(".hangman");

  const init = (_) => {
    // 1. Choose a word
    chosenWord = chooseWord();
    // 2. render guessing word
    guessingWord = Array(chosenWord.length).fill("_");
    guesses = [];
    lives = 7;
    showInitPage();
    listeners();
    Board.init();
  };

  /* 
   This code shows an event listener function that handles click events on elements within a hangman game interface. Here's how it works:

    1. The function listens for click events on elements inside the $hangman element
    2. When a click happens, it checks two conditions:
    - If the clicked element has the class "hangman__letter", it plays a click sound and calls the check() function with the letter's text content
    - If the clicked element has the class "hangman__trigger", it plays a click sound and initializes the Home component

    The underscore parameter (_) indicates this function doesn't use any parameters passed to it.
  */
  const listeners = (_) => {
    $hangman.addEventListener("click", (event) => {
      if (event.target.matches(".hangman__letter")) {
        sound.click.play();
        check(event.target.innerHTML);
      }

      if (event.target.matches(".hangman__trigger")) {
        sound.click.play();
        Home.init();
      }
    });
  };

  const isAlreadyTaken = (letter) => {
    return guesses.includes(letter);
  };

  const check = (guess) => {
    if (isAlreadyTaken(guess)) return;

    guesses.push(guess);
    // check if the word exist in chosen word
    if (chosenWord.includes(guess)) {
      // update the guessing word
      updateGuessingWord(guess);
    } else {
      lives--;
      // render the board accordingly
      Board.setLives(lives);
    }
    render();
    // check if the game is over
    isGameOver();
  };

  const hasWon = (_) => guessingWord.join("") === chosenWord;

  const hasLost = (_) => lives <= 0;

  const isGameOver = (_) => {
    if (hasWon()) {
      sound.win.play();
      End.setState({
        chosenWord,
        result: "win",
      });
    }
    if (hasLost()) {
      sound.lose.play();
      End.setState({
        chosenWord,
        result: "lose",
      });
    }
  };

  const render = (_) => {
    document.querySelector(".hangman__lives").innerHTML = lives;
    document.querySelector(".hangman__word").innerHTML = guessingWord.join("");
    document.querySelector(".hangman__letters").innerHTML = createLetters();
  };

  const updateGuessingWord = (letter) => {
    chosenWord.split("").forEach((elem, index) => {
      if (elem === letter) {
        guessingWord[index] = elem;
      }
    });
  };

  const showInitPage = (_) => {
    let markup = `
            <p class="hangman__stats">Lives:
                <span class="hangman__lives">${lives}</span>
            </p>
            <h1 class="hangman__title">Hangman</h1>
            <canvas class="hangman__board" height="155px"></canvas>
            <div class="hangman__word">${guessingWord.join("")}</div>
            <p class="hangman__instructions">Pick a letter below to guess the whole word</p>
            <ul class="hangman__letters">
                ${createLetters()}
            </ul>
            <button class="button hangman__trigger">Main Menu</button>
        `;

    $hangman.innerHTML = markup;
  };

  const createLetters = (_) => {
    let markup = ``;
    letters.forEach((letter) => {
      const isActive = isAlreadyTaken(letter) ? "hangman__letter--active" : "";
      markup += `
                <li class="hangman__letter ${isActive}">${letter}</li>
            `;
    });
    return markup;
  };

  const chooseWord = (_) => {
    let randNum = Math.floor(Math.random() * words.length);
    return words[randNum];
  };

  return {
    init,
  };
})();

export default Game;
