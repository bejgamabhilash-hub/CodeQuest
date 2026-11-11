
function moveRobot(rowChange, colChange) {
        if (gameWon) {
        alert("You have already completed this level! Press Reset Game to play again.");
        return;
    }

    const maze = document.getElementById("maze");
    const cells = Array.from(maze.children);

    const robot = document.getElementById("robot");
    const currentIndex = cells.indexOf(robot);

    const currentRow = Math.floor(currentIndex / 5);
    const currentCol = currentIndex % 5;

    const newRow = currentRow + rowChange;
    const newCol = currentCol + colChange;

    // Check boundaries
    if (newRow < 0 || newRow >= 5 ||
        newCol < 0 || newCol >= 5) {
        alert("You cannot move outside the maze!");
        return;
    }

    const newIndex = newRow * 5 + newCol;
    const nextCell = cells[newIndex];

    // Check walls
    if (nextCell.classList.contains("wall")) {
        playSound("wall");
        alert("Oops! There is a wall.");
        return;
    }

    // Check treasure
    const foundTreasure = nextCell.textContent.includes("⭐");

    // Move robot
    robot.textContent = "";
    robot.removeAttribute("id");

    nextCell.textContent = "🤖";
    nextCell.id = "robot";

    updateProgress();
    playSound("move");
    // Check whether the robot reached the treasure
if (foundTreasure && !gameWon) {

    playSound("treasure");

    score = score + 100;
    saveLeaderboard();
    gameWon = true;
    document.getElementById("winScreen").style.display = "block";

document.getElementById("finalScore").textContent = score;
const name = document.getElementById("playerName").value.trim();

document.getElementById("winnerMessage").textContent =
    "Amazing work, " + name + "! You are a coding champion! 🏆";
    document.getElementById("score").textContent = score;

    alert("Congratulations! You earned 100 points!");
}
    totalMoves++;

document.getElementById("moveCount").textContent = totalMoves;

    if (foundTreasure) {
        alert("Congratulations! You found the treasure!");
    }
}

// Store the commands selected by the player
let commands = [];
let totalMoves = 0;
let score = 0;
let gameWon = false;
let debuggingSolved = false;
// Walls for each difficulty level
let currentWalls = [6, 11, 13, 21];

const levels = {
    easy: [7, 12],
    medium: [6, 11, 13, 21],
    hard: [5, 7, 10, 12, 16, 18, 21]
};

// Add a command to the sequence
function addCommand(direction) {

    commands.push(direction);

    const commandList = document.getElementById("commandList");

    const commandNames = {
        up: "⬆ Forward",
        down: "⬇ Backward",
        left: "⬅ Left",
        right: "➡ Right"
    };

    commandList.innerHTML = commands
        .map((command, index) =>
            (index + 1) + ". " + commandNames[command]
        )
        .join("<br>");
}

// Clear all selected commands
function clearCommands() {

    commands = [];

    document.getElementById("commandList").textContent =
        "No commands selected yet.";
}

// Run the selected commands
function runCommands() {

    let index = 0;

    function executeNext() {

        if (index >= commands.length) {
            return;
        }

        const direction = commands[index];

        const moves = {
            up: [-1, 0],
            down: [1, 0],
            left: [0, -1],
            right: [0, 1]
        };

        moveRobot(...moves[direction]);

        index++;

        setTimeout(executeNext, 600);
    }

    executeNext();
}

function resetGame() {
    document.getElementById("winScreen").style.display = "none";

    const maze = document.getElementById("maze");
    const cells = Array.from(maze.children);

    // Original wall positions
    const walls = currentWalls;

    cells.forEach((cell, index) => {

        cell.textContent = "";

        cell.removeAttribute("id");

        if (walls.includes(index)) {
            cell.classList.add("wall");
            cell.textContent = "🧱";
        } else {
            cell.classList.remove("wall");
        }
    });

    // Place robot at starting position
    cells[0].textContent = "🤖";
    cells[0].id = "robot";
    updateProgress();

    // Place treasure at destination
    cells[24].textContent = "⭐";

    // Clear commands
    commands = [];
    totalMoves = 0;
    score = 0;
gameWon = false;

document.getElementById("score").textContent = score;
    debuggingSolved = false;

document.getElementById("moveCount").textContent = totalMoves;

    document.getElementById("commandList").textContent =
        "No commands selected yet.";
}
function changeLevel() {

    const selectedLevel =
        document.getElementById("levelSelect").value;

    currentWalls = levels[selectedLevel];

    resetGame();

    alert("You selected " + selectedLevel + " level!");
}


function checkPrediction() {

    const predictedRow = document.getElementById("predictionRow").value;
    const predictedCol = document.getElementById("predictionCol").value;

    if (predictedRow === "" || predictedCol === "") {
        alert("Please select both row and column!");
        return;
    }

    const maze = document.getElementById("maze");
    const cells = Array.from(maze.children);

    const robot = document.getElementById("robot");
    const currentIndex = cells.indexOf(robot);

    let row = Math.floor(currentIndex / 5);
    let col = currentIndex % 5;

    const moves = {
        up: [-1, 0],
        down: [1, 0],
        left: [0, -1],
        right: [0, 1]
    };

    for (const direction of commands) {

        const [rowChange, colChange] = moves[direction];

        const newRow = row + rowChange;
        const newCol = col + colChange;

        if (newRow < 0 || newRow >= 5 ||
            newCol < 0 || newCol >= 5) {
            break;
        }

        const nextCell = cells[newRow * 5 + newCol];

        if (nextCell.classList.contains("wall")) {
            break;
        }

        row = newRow;
        col = newCol;
    }

    if (Number(predictedRow) === row &&
        Number(predictedCol) === col) {

        document.getElementById("predictionResult").textContent =
            "Correct! You predicted the final position! 🎉";

    } else {

        document.getElementById("predictionResult").textContent =
            "Not quite! Check your commands and try again.";

    }
}
function checkDebugging() {

    const answer = document.getElementById("wrongCommand").value;

    if (answer === "") {
        alert("Please select a command!");
        return;
    }

    if (answer === "2") {
        if (!debuggingSolved) {
    score = score + 50;
    debuggingSolved = true;
    document.getElementById("score").textContent = score;
}

        document.getElementById("debugResult").textContent =
            "Correct! Command 2 is wrong. Great debugging! 🎉";

    } else {

        document.getElementById("debugResult").textContent =
            "Not quite! Check the command sequence again.";

    }
}
function updateProgress() {

    const robot = document.getElementById("robot");
    const maze = document.getElementById("maze");
    const cells = Array.from(maze.children);

    const index = cells.indexOf(robot);

    const row = Math.floor(index / 5);
    const col = index % 5;

    const distance = (4 - row) + (4 - col);

    let progress = ((8 - distance) / 8) * 100;

    progress = Math.max(0, Math.min(100, progress));

    const progressBar = document.getElementById("progressBar");

    progressBar.style.width = progress + "%";
    progressBar.textContent = Math.round(progress) + "%";
}
function playSound(type) {

    const sounds = {
        move: 600,
        wall: 200,
        treasure: 1000
    };

    const audio = new AudioContext();
    const oscillator = audio.createOscillator();
    const gain = audio.createGain();

    oscillator.frequency.value = sounds[type];
    oscillator.type = "sine";

    oscillator.connect(gain);
    gain.connect(audio.destination);

    oscillator.start();

    gain.gain.setValueAtTime(0.2, audio.currentTime);
    gain.gain.exponentialRampToValueAtTime(
        0.001,
        audio.currentTime + 0.2
    );

    oscillator.stop(audio.currentTime + 0.2);
}
function startGame() {

    const name = document.getElementById("playerName").value.trim();

    if (name === "") {
        alert("Please enter your name!");
        return;
    }

    document.getElementById("welcomeMessage").textContent =
        "Welcome, " + name + "! 👋 Your coding adventure begins now!";
}
function saveLeaderboard() {
    const name = document.getElementById("playerName").value.trim();

    let players = JSON.parse(localStorage.getItem("codeQuestPlayers")) || [];
    
    players.push({
        name: name,
        score: score
    });

    localStorage.setItem("codeQuestPlayers", JSON.stringify(players));
    displayLeaderboard();
}
function displayLeaderboard() {
    let players = JSON.parse(localStorage.getItem("codeQuestPlayers")) || [];

    players.sort((a, b) => b.score - a.score);

    const leaderboard = document.getElementById("leaderboard");

    leaderboard.innerHTML = "";

    players.forEach(player => {
        const item = document.createElement("li");
        item.textContent = player.name + " - " + player.score + " points";
        leaderboard.appendChild(item);
    });

    if (players.length === 0) {
        leaderboard.innerHTML = "<li>No players yet. Be the first!</li>";
    }
}
displayLeaderboard();
function runLoop() {
    const command = document.getElementById("loopCommand").value;
    const count = Number(document.getElementById("loopCount").value);

    for (let i = 0; i < count; i++) {

        if (command === "forward") {
            moveRobot(-1, 0);
        } 
        else if (command === "backward") {
            moveRobot(1, 0);
        } 
        else if (command === "left") {
            moveRobot(0, -1);
        } 
        else if (command === "right") {
            moveRobot(0, 1);
        }
    }

    document.getElementById("loopResult").textContent =
        "Loop completed! Repeated " + command + " " + count + " times. 🔁";
}
function checkLoopAnswer() {
    const answer = document.getElementById("loopAnswer").value;

    if (answer === "") {
        document.getElementById("loopChallengeResult").textContent =
            "Please choose an answer!";
    }
    else if (answer === "3") {
        document.getElementById("loopChallengeResult").textContent =
            "Correct! 🎉 Repeat 3 times moves the robot 3 steps!";
    }
    else {
        document.getElementById("loopChallengeResult").textContent =
            "Not quite! Try again. 😊";
    }
}
function checkCondition() {
    const choice = document.getElementById("conditionChoice").value;

    if (choice === "") {
        document.getElementById("conditionResult").textContent =
            "Please choose an action!";
    }
    else if (choice === "right") {
        document.getElementById("conditionResult").textContent =
            "Correct! 🎉 If there is a wall, turn right!";
    }
    else {
        document.getElementById("conditionResult").textContent =
            "Not quite! Think about how the robot can avoid the wall. 😊";
    }
}
let draggedCommands = [];
const dragCommands = document.querySelectorAll(".drag-command");
const dropArea = document.getElementById("dropArea");

dragCommands.forEach(card => {
    card.addEventListener("dragstart", function(event) {
        event.dataTransfer.setData(
            "text",
            card.getAttribute("data-command")
        );
    });
});

dropArea.addEventListener("dragover", function(event) {
    event.preventDefault();
});

dropArea.addEventListener("drop", function(event) {
    event.preventDefault();

    const command = event.dataTransfer.getData("text");

    const commandNames = {
        up: "⬆ Forward",
        down: "⬇ Backward",
        left: "⬅ Left",
        right: "➡ Right"
    };

    const item = document.createElement("p");
    item.textContent = commandNames[command];
    draggedCommands.push(command);
    dropArea.appendChild(item);
});
function runDraggedCommands() {
    if (draggedCommands.length === 0) {
        document.getElementById("dragResult").textContent =
            "Please drag some commands first!";
        return;
    }

    for (let command of draggedCommands) {
        if (command === "up") {
            moveRobot(-1, 0);
        }
        else if (command === "down") {
            moveRobot(1, 0);
        }
        else if (command === "left") {
            moveRobot(0, -1);
        }
        else if (command === "right") {
            moveRobot(0, 1);
        }

        if (gameWon) {
            break;
        }
    }

    document.getElementById("dragResult").textContent =
        "Your code has been executed! 🚀";
}