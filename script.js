// Grid Config
const gridSize = 100;
let units = 10; // Starting pixel units
let selectedColor = "#000000";
let scale = 1;
let posX = 0, posY = 0;
let isDragging = false;
let startX, startY;
let currentX = 0, currentY = 0;

// DOM Elements
const unitCountElement = document.getElementById("unitCount");
const colorPicker = document.getElementById("colorPicker");
const gridContainer = document.getElementById("gridContainer");
const grid = document.getElementById("grid");
const coordinates = document.getElementById("coordinates");
const zoomInBtn = document.getElementById("zoom-in");
const zoomOutBtn = document.getElementById("zoom-out");
const resetViewBtn = document.getElementById("reset-view");
const shopModal = document.getElementById("shop-modal");

// Initialize the grid
function createGrid() {
    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            const pixel = document.createElement("div");
            pixel.classList.add("pixel");
            pixel.dataset.x = x;
            pixel.dataset.y = y;
            pixel.addEventListener("click", handlePixelClick);
            pixel.addEventListener("mouseover", updateCoordinates);
            grid.appendChild(pixel);
        }
    }
}

// Handle pixel click
function handlePixelClick(event) {
    if (units > 0) {
        event.target.style.backgroundColor = selectedColor;
        units--;
        updateUnitCount();
        
        // Add visual feedback
        createPlacementRipple(event);
        
        // In a real app, this would send data to a server
        console.log(`Pixel placed at X:${event.target.dataset.x}, Y:${event.target.dataset.y} with color ${selectedColor}`);
    } else {
        showNotification("Plus de pixels disponibles! Visitez la boutique pour en obtenir plus.");
    }
}

// Create visual effect when placing a pixel
function createPlacementRipple(event) {
    const ripple = document.createElement("div");
    ripple.style.position = "absolute";
    ripple.style.width = "20px";
    ripple.style.height = "20px";
    ripple.style.borderRadius = "50%";
    ripple.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
    ripple.style.border = `2px solid ${selectedColor}`;
    
    // Position the ripple
    const rect = event.target.getBoundingClientRect();
    const containerRect = gridContainer.getBoundingClientRect();
    ripple.style.left = (rect.left - containerRect.left + rect.width/2 - 10) + "px";
    ripple.style.top = (rect.top - containerRect.top + rect.height/2 - 10) + "px";
    
    // Animation
    ripple.style.animation = "ripple 0.6s ease-out";
    
    // Add to grid container
    gridContainer.appendChild(ripple);
    
    // Remove after animation completes
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Update unit count display
function updateUnitCount() {
    unitCountElement.textContent = units;
}

// Update coordinates display
function updateCoordinates(event) {
    currentX = parseInt(event.target.dataset.x);
    currentY = parseInt(event.target.dataset.y);
    coordinates.textContent = `X: ${currentX}, Y: ${currentY}`;
}

// Color picker event
colorPicker.addEventListener("input", (e) => {
    selectedColor = e.target.value;
    
    // Remove active class from all preset colors
    document.querySelectorAll('.color-option').forEach(option => {
        option.classList.remove('active');
    });
});

// Preset color selection
document.querySelectorAll('.color-option').forEach(option => {
    option.addEventListener('click', () => {
        selectedColor = option.dataset.color;
        colorPicker.value = selectedColor;
        
        // Update active state
        document.querySelector