// Array de imágenes de la naturaleza, apuntando a la carpeta 'imagenes'
const images = [
    'imagenes/auto1.jpg',
    'imagenes/auto2.jpg',
    'imagenes/auto3.jpg',
    'imagenes/auto4.jpg',
    'imagenes/auto5.jpg',
    'imagenes/auto6.jpg',
    'imagenes/auto7.jpg',
    'imagenes/auto8.jpg'
];

// Duplicamos las imágenes para tener pares
let cardImages = [...images, ...images];

// Mezclar las imágenes de manera aleatoria
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Crear el tablero de cartas
const cardBoard = document.querySelector('.card-board');
let flippedCards = [];
let matchedCards = [];

// Variables para el temporizador
let timer;
let timeElapsed = 0;
const timeDisplay = document.getElementById('time');

// Función para iniciar el temporizador
function startTimer() {
    clearInterval(timer); // Limpiar cualquier temporizador previo
    timeElapsed = 0; // Reiniciar el tiempo
    timeDisplay.textContent = timeElapsed;
    
    // Iniciar un nuevo temporizador
    timer = setInterval(() => {
        timeElapsed++;
        timeDisplay.textContent = timeElapsed;
    }, 1000); // Actualizar el tiempo cada segundo
}

// Detener el temporizador
function stopTimer() {
    clearInterval(timer); // Detener el temporizador
}

function createBoard() {
    const shuffledImages = shuffle(cardImages);
    cardBoard.innerHTML = '';
    shuffledImages.forEach((imgSrc, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.index = index;

        const inner = document.createElement('div');
        inner.classList.add('inner');

        const front = document.createElement('div');
        front.classList.add('front');
        front.textContent = '?'; // Mostrar símbolo de carta cerrada

        const back = document.createElement('div');
        back.classList.add('back');
        const img = document.createElement('img');
        img.src = imgSrc; // Asignar imagen de la carpeta 'imagenes'
        back.appendChild(img);

        inner.appendChild(front);
        inner.appendChild(back);
        card.appendChild(inner);
        cardBoard.appendChild(card);

        card.addEventListener('click', flipCard);
    });

    startTimer(); // Iniciar el temporizador al crear el tablero
}

// Función para voltear una carta
function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            setTimeout(checkForMatch, 1000);
        }
    }
}

// Verificar si las cartas destapadas coinciden
function checkForMatch() {
    const [card1, card2] = flippedCards;
    const img1 = card1.querySelector('img').src;
    const img2 = card2.querySelector('img').src;

    if (img1 === img2) {
        matchedCards.push(card1, card2);
        flippedCards = [];
    } else {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        flippedCards = [];
    }

    // Verificar si todas las cartas han sido emparejadas
    if (matchedCards.length === cardImages.length) {
        setTimeout(() => {
            alert(`¡Felicidades! Has encontrado todas las parejas en ${timeElapsed} segundos.`);
            stopTimer(); // Detener el temporizador
        }, 500);
    }
}

// Reiniciar el juego
document.getElementById('reset').addEventListener('click', () => {
    flippedCards = [];
    matchedCards = [];
    stopTimer(); // Detener el temporizador antes de reiniciar
    createBoard(); // Reiniciar el tablero y el temporizador
});

// Inicializar el tablero
createBoard();
