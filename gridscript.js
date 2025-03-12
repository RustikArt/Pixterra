const gridSize = 100;
let units = 10;
let selectedColor = "#000000";
let scale = 1;
let posX = 0, posY = 0;
let isDragging = false;
let startX, startY;
let moveThreshold = 5; // Distance minimale pour considérer un mouvement (en pixels)
let isMoving = false; // Pour savoir si l'utilisateur se déplace

document.getElementById("colorPicker").addEventListener("input", (e) => {
    selectedColor = e.target.value;
});

function addUnit() {
    units++;
    document.getElementById("unitCount").innerText = units;
}

function placePixel(event) {
    // Si l'utilisateur est en train de déplacer la grille, on ignore le clic
    if (units > 0 && event.target.classList.contains("pixel") && !isMoving) {
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
    isMoving = false; // Initialement on ne considère pas que l'utilisateur se déplace
});

document.addEventListener("mousemove", (event) => {
    if (!isDragging) return;

    const distX = Math.abs(event.clientX - (startX + posX));
    const distY = Math.abs(event.clientY - (startY + posY));

    // Si la distance parcourue est supérieure au seuil, on considère que l'utilisateur se déplace
    if (distX > moveThreshold || distY > moveThreshold) {
        isMoving = true;
    }

    posX = event.clientX - startX;
    posY = event.clientY - startY;
    updateTransform();
});

document.addEventListener("mouseup", () => {
    isDragging = false;
    isMoving = false; // L'utilisateur a terminé de se déplacer
});

function updateTransform() {
    const grid = document.getElementById("grid");
    grid.style.transform = `translate(${posX}px, ${posY}px) scale(${scale})`;
}

createGrid();
