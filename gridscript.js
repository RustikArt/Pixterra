const gridSize = 100;
let units = 10;
let selectedColor = "#000000";
let scale = 1;
let posX = 0, posY = 0;
let isDragging = false;
let startX, startY;

document.getElementById("colorPicker").addEventListener("input", (e) => {
    selectedColor = e.target.value;
});

function addUnit() {
    units++;
    document.getElementById("unitCount").innerText = units;
}

function placePixel(event) {
    if (units > 0 && event.target.classList.contains("pixel")) {
        event.target.style.backgroundColor = selectedColor;
        units--;
        document.getElementById("unitCount").innerText = units;
    }
}

function createGrid() {
    const grid = document.getElementById("grid");
    for (let i = 0; i < gridSize * gridSize; i++) {
        const pixel = document.createElement("div");
        pixel.classList.add("pixel");
        pixel.addEventListener("click", placePixel);
        grid.appendChild(pixel);
    }
}

// Zoom
const gridContainer = document.getElementById("gridContainer");
gridContainer.addEventListener("wheel", (event) => {
    event.preventDefault();
    let scaleAmount = event.deltaY * -0.001;
    scale = Math.min(Math.max(0.5, scale + scaleAmount), 3);
    updateTransform();
});

// Drag
gridContainer.addEventListener("mousedown", (event) => {
    isDragging = true;
    startX = event.clientX - posX;
    startY = event.clientY - posY;
});

document.addEventListener("mousemove", (event) => {
    if (!isDragging) return;
    posX = event.clientX - startX;
    posY = event.clientY - startY;
    updateTransform();
});

document.addEventListener("mouseup", () => {
    isDragging = false;
});

function updateTransform() {
    const grid = document.getElementById("grid");
    grid.style.transform = translate(${posX}px, ${posY}px) scale(${scale});
}

createGrid();