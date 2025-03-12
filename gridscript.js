const gridSize = 100;
let units = 10;
let selectedColor = "#000000";
let scale = 1;
let posX = 0, posY = 0;
let isDragging = false;
let startX, startY;
let moveThreshold = 5; // Seuil pour détecter un mouvement
let isMoving = false; // Booléen pour savoir si l'utilisateur est en mouvement
let isPixelAllowed = true; // Contrôle si l'utilisateur peut poser des pixels
let pixelDelay = false; // Indicateur pour empêcher la pose immédiate de pixels

document.getElementById("colorPicker").addEventListener("input", (e) => {
    selectedColor = e.target.value;
});

function addUnit() {
    units++;
    document.getElementById("unitCount").innerText = units;
}

// Fonction pour poser un pixel si l'utilisateur est autorisé à le faire
function placePixel(event) {
    if (units > 0 && event.target.classList.contains("pixel") && !pixelDelay) {
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
        pixel.addEventListener("click", placePixel);  // Ajout de l'écouteur pour les clics
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

// Drag (déplacement de la grille)
gridContainer.addEventListener("mousedown", (event) => {
    isDragging = true;
    startX = event.clientX - posX;
    startY = event.clientY - posY;
    isMoving = false; // Initialement, on n'est pas encore en train de déplacer
});

document.addEventListener("mousemove", (event) => {
    if (!isDragging) return;

    const distX = Math.abs(event.clientX - (startX + posX));
    const distY = Math.abs(event.clientY - (startY + posY));

    // Si la distance parcourue dépasse le seuil, on considère que l'utilisateur se déplace
    if (distX > moveThreshold || distY > moveThreshold) {
        isMoving = true;
    }

    posX = event.clientX - startX;
    posY = event.clientY - startY;
    updateTransform();
});

document.addEventListener("mouseup", () => {
    isDragging = false;

    // Lorsque l'utilisateur relâche la souris, on active un délai pour bloquer les clics
    pixelDelay = true;

    // Après 300 ms, on réactive la possibilité de poser des pixels
    setTimeout(() => {
        pixelDelay = false;
    }, 300); // Temps en millisecondes (300ms = 0.3 seconde)
});

function updateTransform() {
    const grid = document.getElementById("grid");
    grid.style.transform = `translate(${posX}px, ${posY}px) scale(${scale})`;
}

createGrid();
