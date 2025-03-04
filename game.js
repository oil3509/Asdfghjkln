const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let dino = { x: 50, y: 150, width: 30, height: 30, velocityY: 0, jumping: false };
let gravity = 0.6;
let obstacles = [];
let gameSpeed = 4;
let score = 0;
let gameOver = false;

// Controle por toque no celular
document.addEventListener("touchstart", function() {
    if (!dino.jumping) {
        dino.velocityY = -10;
        dino.jumping = true;
    }
});
// Atualiza o jogo
function update() {
    if (gameOver) return;

    // Gravidade e movimento do dino
    dino.velocityY += gravity;
    dino.y += dino.velocityY;
    
    // Impedir que o dino caia no chão
    if (dino.y > 150) {
        dino.y = 150;
        dino.jumping = false;
    }

    // Criar obstáculos
    if (Math.random() < 0.02) {
        obstacles.push({ x: 800, y: 160, width: 20, height: 30 });
    }

    // Movimentar obstáculos
    for (let i = 0; i < obstacles.length; i++) {
        obstacles[i].x -= gameSpeed;

        // Detectar colisão
        if (
            dino.x < obstacles[i].x + obstacles[i].width &&
            dino.x + dino.width > obstacles[i].x &&
            dino.y < obstacles[i].y + obstacles[i].height &&
            dino.y + dino.height > obstacles[i].y
        ) {
            gameOver = true;
            alert("Game Over! Pontuação: " + score);
            document.location.reload();
        }
    }

    // Remover obstáculos antigos
    obstacles = obstacles.filter(obs => obs.x > -20);

    // Aumentar pontuação
    score++;
}

// Desenha o jogo
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Desenhar chão
    ctx.fillStyle = "gray";
    ctx.fillRect(0, 180, canvas.width, 20);

    // Desenhar Dino
    ctx.fillStyle = "black";
    ctx.fillRect(dino.x, dino.y, dino.width, dino.height);

    // Desenhar obstáculos
    ctx.fillStyle = "red";
    for (let obs of obstacles) {
        ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
    }

    // Exibir pontuação
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("Pontuação: " + score, 650, 30);
}

// Loop do jogo
function gameLoop() {
    update();
    draw();
    if (!gameOver) requestAnimationFrame(gameLoop);
}

gameLoop();