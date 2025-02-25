import Home from "./home.js";
import { sound } from "./../data/sound.js";

// cache DOM
const $hangman = document.querySelector(".hangman");

const How = ((_) => {
  const init = (_) => {
    render();
    listeners();
  };

  const listeners = (_) => {
    document
      .querySelector(".hangman__trigger")
      .addEventListener("click", (_) => {
        sound.click.play();
        Home.init();
      });
  };

  const render = (_) => {
    let markup = `
            <h1 class="hangman__title">Instructions</h1>
            <ul class="how">
                <li>Alright here is how you play!</li>
                <li>When you start your new game, the game will automatically choose a random word.</li>
                <li>Your job is to guess that chosen word completely by guessing one letter at a time by clicking on the buttons.</li>
                <li>If you sucessfully guess the word within 7 tries, you win or else you lose.</li>
                <li>If you lose, you will be hanged without mercy!</li>
            </ul>
            <button class="button hangman__trigger">Main Menu</button>
        `;
    $hangman.innerHTML = markup;
  };

  return {
    init,
  };
})();

export default How;
