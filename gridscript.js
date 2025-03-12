const gridSize = 100;
let units = 10;
let selectedColor = "#000000";
let scale = 1;
let posX = 0, posY = 0;
let isDragging = false;
let startX, startY;
let moveThreshold = 5;
let isMoving = false; 
let isPixelAllowed = true; 

document.getElementById("colorPicker").addEventListener("input", (e) => {
    selectedColor = e.target.value;
});

function addUnit() {
    units++;
    document.getElementById("unitCount").innerText = units;
}
function placePixel(event) {
    if (units > 0 && event.target.classList.contains("pixel") && isPixelAllowed) {
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

const gridContainer = document.getElementById("gridContainer");
gridContainer.addEventListener("wheel", (event) => {
    event.preventDefault();
    let scaleAmount = event.deltaY * -0.001;
    scale = Math.min(Math.max(0.5, scale + scaleAmount), 3);
    updateTransform();
});

gridContainer.addEventListener("mousedown", (event) => {
    isDragging = true;
    startX = event.clientX - posX;
    startY = event.clientY - posY;
    isMoving = false; 
});

document.addEventListener("mousemove", (event) => {
    if (!isDragging) return;

    const distX = Math.abs(event.clientX - (startX + posX));
    const distY = Math.abs(event.clientY - (startY + posY));

    if (distX > moveThreshold || distY > moveThreshold) {
        isMoving = true;
    }

    posX = event.clientX - startX;
    posY = event.clientY - startY;
    updateTransform();
});

document.addEventListener("mouseup", () => {
    isDragging = false;
    isPixelAllowed = false;

    setTimeout(() => {
        isPixelAllowed = true;
    }, 300); function placePixel(event) {
        if (units > 0 && event.target.classList.contains("pixel") && isPixelAllowed && !isDragging) {
            event.target.style.backgroundColor = selectedColor;
            units--;
            document.getElementById("unitCount").innerText = units;
        }
    }document.addEventListener("mouseup", () => {
        isDragging = false;
        isPixelAllowed = true;
    });
});

function updateTransform() {
    const grid = document.getElementById("grid");
    grid.style.transform = `translate(${posX}px, ${posY}px) scale(${scale})`;
}

createGrid();
