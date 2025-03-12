const gridSize = 100;
let units = 10;
let selectedColor = "#000000";
let scale = 1;
let posX = 0, posY = 0;
let isDragging = false;
let startX, startY;
let moveThreshold = 5; // Distance minimale pour détecter un mouvement
let isMoving = false; // Variable pour savoir si l'utilisateur est en mouvement

document.getElementById("colorPicker").addEventListener("input", (e) => {
    selectedColor = e.target.value;
});

function addUnit() {
    units++;
    document.getElementById("unitCount").innerText = units;
}

function placePixel(event) {
    // Si l'utilisateur n'est pas en mouvement, on peut poser des pixels
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
    isMoving = false; // Initialement, on suppose qu'on ne bouge pas
});

document.addEventListener("mousemove", (event) => {
    if (!isDragging) return;

    const distX = Math.abs(event.clientX - (startX + posX));
    const distY = Math.abs(event.clientY - (startY + posY));

    // Si la distance parcourue dépasse le seuil, on considère qu'on est en déplacement
    if (distX > moveThreshold || distY > moveThreshold) {
        isMoving = true;
    }

    posX = event.clientX - startX;
    posY = event.clientY - startY;
    updateTransform();
});

document.addEventListener("mouseup", () => {
    isDragging = false;
    isMoving = false; // Le déplacement est terminé, on peut poser des pixels à nouveau
});

function updateTransform() {
    const grid = document.getElementById("grid");
    grid.style.transform = `translate(${posX}px, ${posY}px) scale(${scale})`;
}

createGrid();
