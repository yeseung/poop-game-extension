const game = document.getElementById("game");
const player = document.getElementById("player");
const scoreDisplay = document.getElementById("score");
const restartBtn = document.getElementById("restartBtn");

let playerX = 175;
let score = 0;
let speed = 2;
let gameOver = false;
let poops = [];
let poopInterval;

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" && playerX > 0) {
        playerX -= 10;
    } else if (e.key === "ArrowRight" && playerX < 340) {
        playerX += 10;
    }
    if (!gameOver)
        player.style.left = playerX + "px";
});

function createPoop() {
    const poop = document.createElement("div");
    poop.classList.add("poop");
    poop.style.left = Math.floor(Math.random() * 360) + "px";
    poop.style.top = "0px";
    game.appendChild(poop);
    poops.push({ el: poop, y: 0, x: parseInt(poop.style.left) });
}

function updateGame() {
    if (gameOver) return;

    poops.forEach((poop, index) => {
        poop.y += speed;
        poop.el.style.top = poop.y + "px";

        const playerWidth = 40;
        const playerHeight = 40;
        const playerY = 540 - playerHeight - 10; // #game height - player height - bottom

        if (
            poop.y + 40 >= playerY && // poop 바닥이 플레이어 top 넘으면
            poop.y <= playerY + playerHeight && // poop top이 플레이어 bottom 위에 있음
            poop.x < playerX + playerWidth &&
            poop.x + 40 > playerX
        ) {
            endGame();
            return;
        }

        if (poop.y > 540) {
            game.removeChild(poop.el);
            poops.splice(index, 1);
            score++;
            scoreDisplay.textContent = `점수: ${score}`;
            if (score % 5 === 0) speed += 0.1;
        }
    });

    requestAnimationFrame(updateGame);
}

function startGame() {
    playerX = 175;
    score = 0;
    speed = 2;
    gameOver = false;
    poops = [];

    player.style.left = playerX + "px";
    scoreDisplay.textContent = `점수: ${score}`;
    restartBtn.style.display = "none";

    // 기존 똥 제거
    document.querySelectorAll(".poop").forEach(p => p.remove());

    // 똥 떨어뜨리기 시작
    poopInterval = setInterval(() => {
        if (!gameOver) createPoop();
    }, 800);

    updateGame();
}

function endGame() {
    gameOver = true;
    clearInterval(poopInterval);
    restartBtn.style.display = "inline-block";
}

restartBtn.addEventListener("click", startGame);


document.addEventListener('DOMContentLoaded', () => {
    startGame();
});
