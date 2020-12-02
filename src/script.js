const canvas = document.querySelector('#draw'),
      context = canvas.getContext('2d'),
      rainbowButton = document.getElementById('rainbow'),
      waveButton = document.getElementById('wave'),
      clearButton = document.getElementById('clear'),
      colorInput = document.getElementById('color'),
      widthInput = document.getElementById('width');
canvas.width = window.innerWidth; // Browser window width
canvas.height = window.innerHeight; // Browser window height
context.lineJoin = 'round'; // Angle type created by intersection of two lines
context.lineCap = 'round'; // End of line style
context.lineWidth = 10; // Line width

let isDrawing = false,
    isAccrual = true,
    isRainbow = false,
    isWave = false,
    lastX = 0,
    lastY = 0,
    colorTone = 0;

function setLineColor() {
  if (isRainbow) {
    context.strokeStyle = `hsl(${colorTone}, 100%, 50%)`;
    colorTone++; // Change the color tone
  } else {
    context.strokeStyle = colorInput.value; // Get color from input
  }
  if (colorTone >= 360) {
    colorTone = 0;
  }
}

function setLineWidth() {
  if (isWave) {
    if (context.lineWidth > 0 && context.lineWidth <= 10) {
      isAccrual = true;
    }
    if (context.lineWidth >= 100) {
      isAccrual = false;
    }
    if (isAccrual) {
      context.lineWidth++; // Increase the width of the line
    } else {
      context.lineWidth--; // Reduce the width of the line
    }
  } else {
    context.lineWidth = widthInput.value;
  }
  document.getElementById('px').innerHTML = `${widthInput.value}px`;
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

rainbowButton.addEventListener('click', () => {
  isRainbow = !isRainbow;
  rainbowButton.classList.toggle('active');
});

waveButton.addEventListener('click', () => {
  isWave = !isWave;
  wave.classList.toggle('active');
});

clearButton.addEventListener('click', () => {
  let isClear = confirm('Are you sure you want to clear the canvas?');
  isClear && context.clearRect(0, 0, canvas.width, canvas.height);
});

colorInput.addEventListener('input', setLineColor);
colorInput.addEventListener('click', () => {
  isRainbow = false;
  rainbowButton.classList.remove('active');
});

widthInput.addEventListener('input', setLineWidth);
widthInput.addEventListener('change', () => {
  isWave = false;
  waveButton.classList.remove('active');
});