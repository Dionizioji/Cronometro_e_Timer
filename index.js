let hoursInput = document.getElementById('hours');
let minutesInput = document.getElementById('minutes');
let secondsInput = document.getElementById('seconds');
let playPauseBtn = document.getElementById('playPauseBtn');
let resetBtn = document.getElementById('resetBtn');

let interval; // Variável para armazenar o intervalo
let isRunning = false; // Controle se o cronômetro está rodando ou pausado
let totalTime = 0; // Tempo total em segundos

// Função para atualizar a exibição de horas, minutos e segundos
function updateDisplay() {
    let hours = Math.floor(totalTime / 3600);
    let minutes = Math.floor((totalTime % 3600) / 60);
    let seconds = totalTime % 60;

    hoursInput.value = String(hours).padStart(2, '0');
    minutesInput.value = String(minutes).padStart(2, '0');
    secondsInput.value = String(seconds).padStart(2, '0');
}

// Função para iniciar o cronômetro
function startTimer() {
    if (isRunning) {
        clearInterval(interval);
        playPauseBtn.textContent = 'Play';
    } else {
        interval = setInterval(() => {
            totalTime++;
            updateDisplay();
        }, 1000);
        playPauseBtn.textContent = 'Pause';
    }
    isRunning = !isRunning;
}

// Função para resetar o cronômetro
function resetTimer() {
    clearInterval(interval);
    isRunning = false;
    playPauseBtn.textContent = 'Play';
    totalTime = 0;
    updateDisplay();
}

// Permitir apenas números nos campos de horas, minutos e segundos
function allowOnlyNumbers(event) {
    let value = event.target.value;
    if (isNaN(value) || value.includes('.')) {
        event.target.value = value.replace(/\D/g, ''); // Remove qualquer caractere não numérico
    }
}

// Event listeners para permitir apenas números nos inputs
hoursInput.addEventListener('input', allowOnlyNumbers);
minutesInput.addEventListener('input', allowOnlyNumbers);
secondsInput.addEventListener('input', allowOnlyNumbers);

// Event listeners para os botões de controle do cronômetro
playPauseBtn.addEventListener('click', startTimer);
resetBtn.addEventListener('click', resetTimer);