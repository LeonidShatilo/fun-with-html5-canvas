const canvas = document.querySelector('#draw'),
      context = canvas.getContext('2d');
canvas.width = window.innerWidth; // Browser window width
canvas.height = window.innerHeight; // Browser window height
context.lineJoin = 'round'; // Angle type created by intersection of two lines
context.lineCap = 'round'; // End of line style
context.lineWidth = 100; // Line width

let isDrawing = false,
    isAccrual = true,
    lastX = 0,
    lastY = 0,
    colorTone = 0;

function draw(e) {
  if (!isDrawing) return; // Stop the function from running when the mouse is up
  context.strokeStyle = `hsl(${colorTone}, 100%, 50%)`;
  context.beginPath(); // Begin path
  context.moveTo(lastX, lastY); // Start from
  context.lineTo(e.offsetX, e.offsetY); // Go to
  context.stroke(); // Draws a figure by parameters above
  [lastX, lastY] = [e.offsetX, e.offsetY]; // Last coordinates update
  colorTone++; // Change the color tone
  if (colorTone >= 360) {
    colorTone = 0;
  }
  if (context.lineWidth >= 100 || context.lineWidth <= 10) {
    isAccrual = !isAccrual;
  }
  if (isAccrual) {
    context.lineWidth++;
  } else {
    context.lineWidth--;
  }
}

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY]; // Last coordinates update
});
canvas.addEventListener('mouseup', () => (isDrawing = false));
canvas.addEventListener('mouseout', () => (isDrawing = false));