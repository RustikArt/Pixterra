document.addEventListener("DOMContentLoaded", function () {
    const gridContainer = document.getElementById("gridContainer");
    const grid = document.createElement("div");
    grid.classList.add("grid");
    gridContainer.innerHTML = "";
    gridContainer.appendChild(grid);

    const gridSize = 100;
    const pixelSize = 6;

    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            const pixel = document.createElement("div");
            pixel.classList.add("pixel");
            pixel.dataset.x = x;
            pixel.dataset.y = y;
            
            pixel.addEventListener("click", function () {
                this.style.backgroundColor = selectedColor;
            });

            grid.appendChild(pixel);
        }
    }

    grid.style.display = "grid";
    grid.style.gridTemplateColumns = `repeat(${gridSize}, ${pixelSize}px)`;
    grid.style.gridTemplateRows = `repeat(${gridSize}, ${pixelSize}px)`;
    grid.style.gap = "1px";
    grid.style.backgroundColor = "#f9f9f9";
    
    let selectedColor = "#000";
    const colorPicker = document.getElementById("colorPicker");
    colorPicker.addEventListener("input", function (e) {
        selectedColor = e.target.value;
    });

    document.getElementById("reset-view").addEventListener("click", function () {
        document.querySelectorAll(".pixel").forEach(pixel => {
            pixel.style.backgroundColor = "#fff";
        });
    });
});
