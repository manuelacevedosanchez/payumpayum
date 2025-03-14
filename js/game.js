// Configuración del canvas
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const rotateMessage = document.getElementById("rotateMessage");

// Ajustar tamaño del canvas dinámicamente
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Mostrar mensaje si el móvil está en vertical
function checkOrientation() {
    if (window.innerHeight > window.innerWidth) {
        rotateMessage.style.display = "block";
        canvas.style.display = "none";
    } else {
        rotateMessage.style.display = "none";
        canvas.style.display = "block";
        resizeCanvas(); // Asegura que el tamaño sea correcto al girar
    }
}

window.addEventListener("resize", checkOrientation);
checkOrientation();

// Instancia del jugador
const player = new Player(canvas);

// Eventos del teclado
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") player.movingLeft = true;
    if (e.key === "ArrowRight") player.movingRight = true;
});

document.addEventListener("keyup", (e) => {
    if (e.key === "ArrowLeft") player.movingLeft = false;
    if (e.key === "ArrowRight") player.movingRight = false;
});

// Controles táctiles mejorados
canvas.addEventListener("touchstart", (e) => {
    const touchX = e.touches[0].clientX;
    const canvasMiddle = canvas.width / 2;
    
    if (touchX < canvasMiddle) {
        player.movingLeft = true;
    } else {
        player.movingRight = true;
    }
});

canvas.addEventListener("touchend", () => {
    player.movingLeft = false;
    player.movingRight = false;
});

// Bucle del juego
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.update();
    player.draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();