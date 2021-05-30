const canvas = document.getElementById("jsCanvas");
const lineWidth = document.getElementById("jsRange");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const modeBtn = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

canvas.width = document.getElementsByClassName("canvas")[0].offsetWidth;
canvas.height = document.getElementsByClassName("canvas")[0].offsetHeight;

const DEFAULT_COLOR = "#2c2c2c";

let painting = false;
let filling = false;
const ctx = canvas.getContext("2d");

ctx.fillStyle = "white"; // 그림판 배경색을 지정하지 않으면 없이 사진이 저장되기에 기본 white 색상으로 지정
ctx.fillRect(0, 0, 700, 700);
// 시작 색상을 검정으로 설정
ctx.strokeStyle = DEFAULT_COLOR;
ctx.fillStyle = DEFAULT_COLOR;
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

const fillBackground = () => {
  if (filling) {
    ctx.fillRect(0, 0, 700, 700);
  }
};

const changeColor = (event) => {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
};

const changeSize = () => {
  const size = range.value;
  ctx.lineWidth = size;
};

const changeMode = () => {
  if (filling === true) {
    filling = false;
    modeBtn.innerText = "채우기";
  } else {
    filling = true;
    modeBtn.innerText = "그리기";
  }
};

const handleSave = () => {
  // 파일 저장 이벤트
  const image = canvas.toDataURL("image/png");
  // 링크를 생성해 생성한 링크를 통해 다운로드
  const downloadLink = document.createElement("a");
  downloadLink.href = image;
  downloadLink.download = "MyImage";
  downloadLink.click();
};

// 마우스 우클릭 방지 이벤트
const handleCM = (event) => {
  event.preventDefault();
};

if (canvas) {
  canvas.addEventListener("mousemove", handleMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", fillBackground);
  canvas.addEventListener("contextmenu", handleCM); // 마우스 우클릭하면 나오는 메뉴 이벤트
}

// Array.from() 오브젝트를 Array로 만들어준다
Array.from(colors).forEach((color) =>
  color.addEventListener("click", changeColor)
);

if (range) {
  range.addEventListener("input", changeSize);
}

if (modeBtn) {
  modeBtn.addEventListener("click", changeMode);
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSave);
}
