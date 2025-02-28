const Board = ((_) => {
  // state
  let livesLeft;
  let canvas;
  let context;
  /*
  This code initializes a canvas for drawing the hangman game board. Here's what each line does:

    - It selects the canvas element with class "hangman__board" from the DOM
    - Gets the 2D rendering context for drawing
    - Sets the line width to 2 pixels
    - Sets the stroke color to white
    - Calls a base() function (presumably to draw the initial gallows)
    The _ parameter is used as a placeholder since this initialization function doesn't need any parameters.
  */
  const init = (_) => {
    canvas = document.querySelector(".hangman__board");
    context = canvas.getContext("2d");
    context.lineWidth = 2;
    context.strokeStyle = "white";
    base();
  };

  /* 
    1. **The draw function**: This utility function handles drawing lines by moving to a starting point (x,y), drawing a line to an ending point, and then applying the stroke.
    2. **Base structure**: The `base()` function draws the gallows by calling three line functions:
    - `line1()`: Draws the horizontal base (from 0,150 to 150,150)
    - `line2()`: Draws the vertical pole (from 10,0 to 10,300)
    - `line3()`: Draws the horizontal top (from 0,5 to 70,5)

    1. **Hangman parts**: Each body part is defined as a separate function:
    - `head()`: Draws a circle with center at (60,25) with radius 10
    - `rope()`: Connects the gallows to the head (from 60,5 to 60,15)
    - `torso()`: Draws the body (from 60,36 to 60,70)
    - `rightArm()`, `leftArm()`: Draw the arms from the torso
    - `rightLeg()`, `leftLeg()`: Draw the legs from the bottom of the torso
    
    2. The code concludes with returning an object with `init` and `setLives` methods, suggesting this is part of a module pattern implementation.
  */
  const draw = (startX, startY, endX, endY) => {
    context.moveTo(startX, startY);
    context.lineTo(endX, endY);
    context.stroke();
  };

  const base = (_) => {
    line1();
    line2();
    line3();
  };

  const head = (_) => {
    context.beginPath();
    context.arc(60, 25, 10, 0, Math.PI * 2);
    context.stroke();
  };

  const line1 = (_) => draw(0, 150, 150, 150);
  const line2 = (_) => draw(10, 0, 10, 300);
  const line3 = (_) => draw(0, 5, 70, 5);
  const rope = (_) => draw(60, 5, 60, 15);
  const torso = (_) => draw(60, 36, 60, 70);
  const rightArm = (_) => draw(60, 46, 100, 50);
  const leftArm = (_) => draw(60, 46, 20, 50);
  const rightLeg = (_) => draw(60, 70, 100, 100);
  const leftLeg = (_) => draw(60, 70, 20, 100);

  const parts = [rightLeg, leftLeg, rightArm, leftArm, torso, head, rope];
  //  The `render()` function draws the appropriate body part based on `livesLeft`.
  const render = (_) => {
    parts[livesLeft]();
  };
  // The `setLives()` function updates the remaining lives and renders the current state.
  const setLives = (newLives) => {
    livesLeft = newLives;
    render();
  };
  return {
    init,
    setLives,
  };
})();

export default Board;
