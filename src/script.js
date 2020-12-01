const canvas = document.querySelector('#draw'),
      context = canvas.getContext('2d'),
      rainbow = document.getElementById('rainbow'),
      clear = document.getElementById('clear'),
      color = document.getElementById('color'),
      width = document.getElementById('width'),
      wave = document.getElementById('wave');
canvas.width = window.innerWidth; // Browser window width
canvas.height = window.innerHeight; // Browser window height
context.lineJoin = 'round'; // Angle type created by intersection of two lines
context.lineCap = 'round'; // End of line style
context.lineWidth = 10; // Line width

let isDrawing = false,
    isAccrual = true,
    isRainbow = false,
    isWave = false;
    lastX = 0,
    lastY = 0,
    colorTone = 0;

function setLineColor() {
  if (isRainbow) {
    context.strokeStyle = `hsl(${colorTone}, 100%, 50%)`;
    colorTone++; // Change the color tone
  } else {
    context.strokeStyle = color.value; // Get color from input
  }
  if (colorTone >= 360) {
    colorTone = 0;
  }
}

function setLineWidth() {
  if (isWave) {
    if (context.lineWidth >= 100 || context.lineWidth <= 10) {
    context.lineWidth <= 10 && context.lineWidth > 0 ? (isAccrual = true) : (isAccrual = false);
    context.lineWidth >= 100 ? (isAccrual = false) : (isAccrual = true);
    }
    if (isAccrual) {
      context.lineWidth++; // Increase the width of the line
    } else {
      context.lineWidth--; // Reduce the width of the line
    }
  } else {
    context.lineWidth = width.value;
  }
  document.getElementById('px').innerHTML = `${width.value}px`;
}

function draw(e) {
  if (!isDrawing) return; // Stop the function from running when the mouse is up
  setLineColor(); // Starting the function to set the line color
  setLineWidth(); // Starting the function to set the line width
  context.beginPath(); // Begin path
  context.moveTo(lastX, lastY); // Start from
  context.lineTo(e.offsetX, e.offsetY); // Go to
  context.stroke(); // Draws a figure by parameters above
  [lastX, lastY] = [e.offsetX, e.offsetY]; // Last coordinates update
}

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY]; // Last coordinates update
});
canvas.addEventListener('mouseup', () => (isDrawing = false));
canvas.addEventListener('mouseout', () => (isDrawing = false));

rainbow.addEventListener('click', () => {
  isRainbow = !isRainbow;
  isRainbow ? rainbow.classList.add('active') : rainbow.classList.remove('active');
});

wave.addEventListener('click', () => {
  isWave = !isWave;
  isWave ? wave.classList.add('active') : wave.classList.remove('active');
});

clear.addEventListener('click', () => {
  let isClear = confirm('Are you sure you want to clear the canvas?');
  isClear ? context.clearRect(0, 0, canvas.width, canvas.height) : '';
});

color.addEventListener('input', setLineColor);
color.addEventListener('click', () => {
  isRainbow = false;
  rainbow.classList.remove('active');
});

width.addEventListener('change', () => {
  isWave = false;
  wave.classList.remove('active');
});
width.addEventListener('input', setLineWidth);