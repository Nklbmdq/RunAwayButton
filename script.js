// Track level progress
let currentLevel = parseInt(localStorage.getItem('currentLevel')) || 1;
const totalLevels = 50;

const levelContainer = document.getElementById("level-container");
const checkbox = document.getElementById("checkbox");
const spinner = document.getElementById("spinner");

function saveProgress() {
  localStorage.setItem('currentLevel', currentLevel);
}

// Generate a simple fake challenge for each level
function generateLevel(level) {
  levelContainer.innerHTML = "";

  const levelBox = document.createElement("div");
  levelBox.classList.add("level-box");
  levelBox.innerHTML = `<h2>Level ${level}</h2><p>Click all boxes with number ≤ ${Math.min(level, 9)}</p>`;

  const grid = document.createElement("div");
  grid.classList.add("level-grid");

  for (let i = 1; i <= 9; i++) {
    const cell = document.createElement("div");
    cell.textContent = i;
    cell.dataset.value = i;
    cell.addEventListener("click", () => {
      cell.classList.toggle("selected");
    });
    grid.appendChild(cell);
  }

  levelBox.appendChild(grid);
  levelContainer.appendChild(levelBox);
}

// Handle fake reCAPTCHA click
document.getElementById("recaptcha").addEventListener("click", () => {
  if (checkbox.classList.contains("checked")) return;

  spinner.style.display = "block";

  setTimeout(() => {
    spinner.style.display = "none";
    checkbox.classList.add("checked");

    // Check challenge
    const selectedCells = Array.from(document.querySelectorAll(".level-grid div.selected"));
    const correctCells = Array.from(document.querySelectorAll(".level-grid div")).filter(c => parseInt(c.dataset.value) <= Math.min(currentLevel, 9));

    if (selectedCells.length === correctCells.length && selectedCells.every(c => correctCells.includes(c))) {
      alert(`Level ${currentLevel} cleared!`);
      currentLevel++;
      if(currentLevel > totalLevels){
        alert("🎉 You completed all 50 levels!");
        currentLevel = 1;
      }
      saveProgress();
      checkbox.classList.remove("checked");
      generateLevel(currentLevel);
    } else {
      alert("Try again!");
      checkbox.classList.remove("checked");
    }

  }, 1000); // spinner duration
});

// Initialize first level
generateLevel(currentLevel);
