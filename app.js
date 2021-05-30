const canvas = document.getElementById("jsCanvas");
const lineWidth = document.getElementById("jsRange");
const colors = document.getElementsByClassName("jsColor");
canvas.width = document.getElementsByClassName("canvas")[0].offsetWidth;
canvas.height = document.getElementsByClassName("canvas")[0].offsetHeight;

let painting = false;
const ctx = canvas.getContext("2d");

// 시작 색상을 검정으로 설정
ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = lineWidth.value;

const stopPainting = () => (painting = false);
const startPainting = () => (painting = true);

const handleMouseMove = (event) => {
  const offsetX = event.offsetX;
  const offsetY = event.offsetY;
  if (!painting) {
    // 1. canvas를 클릭하지 않고 마우스를 올린 상태에서 움직이고 있는 동안 그릴 시작점을 정한다.
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
  } else {
    // 2. 마우스를 클릭 후 painting이 true가 되면 마우스 위치(beginPath)값을 기준으로 그림을 그리기 시작한다.
    // 3. lineTo함수로 path의 위치가 계속 변경되며 이전 path의 위치와 지금 path위치를 선으로 잇는다.
    // 그래서 그림을 그리는 것처럼 나온다.
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
  }
};

const changeColor = (event) => {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
};

if (canvas) {
  canvas.addEventListener("mousemove", handleMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
}
// Array.from() 오브젝트를 Array로 만들어준다
Array.from(colors).forEach((color) =>
  color.addEventListener("click", changeColor)
);
