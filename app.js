const canvas = document.getElementById("jsCanvas");

let painting = false;

const stopPainting = () => (painting = false);

const handleMouseMove = (event) => {
  const offsetX = event.offsetX;
  const offsetY = event.offsetY;
};

const handleMouseDown = (event) => {
  painting = true;
};

const handleMouseUp = (event) => {
  stopPainting();
};

if (canvas) {
  canvas.addEventListener("mousemove", handleMouseMove);
  canvas.addEventListener("mousedown", handleMouseDown);
  canvas.addEventListener("mouseup", handleMouseUp);
  canvas.addEventListener("mouseleave", stopPainting);
}
