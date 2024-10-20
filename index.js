let hoursInput = document.getElementById('hours')
let minutesInput = document.getElementById('minutes')
let secondsInput = document.getElementById('seconds')
let playPauseBtn = document.getElementById('playPauseBtn')
let resetBtn = document.getElementById('resetBtn')
let toggleModeBtn = document.getElementById('toggleModeBtn')

let interval // Variável para armazenar o intervalo
let isRunning = false // Controle se o cronômetro está rodando ou pausado
let totalTime = 0 // Tempo total em segundos
let isTimer = false // Controle para saber se estamos no modo Timer ou Cronômetro

// Função para atualizar a exibição de horas, minutos e segundos
function updateDisplay() {
    let hours = Math.floor(totalTime / 3600)
    let minutes = Math.floor((totalTime % 3600) / 60)
    let seconds = totalTime % 60

    hoursInput.value = String(hours).padStart(2, '0')
    minutesInput.value = String(minutes).padStart(2, '0')
    secondsInput.value = String(seconds).padStart(2, '0')
}

// Função para iniciar o cronômetro ou temporizador
function startTimer() {
    if (isRunning) {
        clearInterval(interval)
        playPauseBtn.textContent = 'Play'
    } else {
        interval = setInterval(() => {
            if (isTimer && totalTime > 0) { // Modo Timer (regressivo)
                totalTime--
            } else if (!isTimer) { // Modo Cronômetro (progressivo)
                totalTime++
            }

            // Verificar se o timer chegou a zero
            if (isTimer && totalTime === 0) {
                clearInterval(interval)
                alert("O tempo acabou!")
                isRunning = false
                playPauseBtn.textContent = 'Play'
            }

            updateDisplay()
        }, 1000)
        playPauseBtn.textContent = 'Pause'
    }
    isRunning = !isRunning
}

// Função para resetar o cronômetro/temporizador
function resetTimer() {
    clearInterval(interval)
    isRunning = false
    playPauseBtn.textContent = 'Play'

    if (isTimer) {
        totalTime = parseInputToSeconds() // Reseta para o tempo configurado no modo Timer
    } else {
        totalTime = 0 // Reseta para 0 no modo Cronômetro
    }

    updateDisplay()
}

// Função para alternar entre o modo cronômetro e temporizador
function toggleMode() {
    isTimer = !isTimer
    resetTimer() // Reseta o cronômetro/timer ao alternar entre os modos
    toggleModeBtn.textContent = isTimer ? 'Mudar para Cronômetro' : 'Mudar para Timer'
}

// Converte a entrada de horas, minutos e segundos em segundos totais
function parseInputToSeconds() {
    let hours = parseInt(hoursInput.value) || 0
    let minutes = parseInt(minutesInput.value) || 0
    let seconds = parseInt(secondsInput.value) || 0
    return (hours * 3600) + (minutes * 60) + seconds
}

// Permitir apenas números nos campos de horas, minutos e segundos
function allowOnlyNumbers(event) {
    let value = event.target.value
    if (isNaN(value) || value.includes('.')) {
        event.target.value = value.replace(/\D/g, '') // Remove qualquer caractere não numérico
    }
}

// Event listeners para permitir apenas números nos inputs
hoursInput.addEventListener('input', allowOnlyNumbers)
minutesInput.addEventListener('input', allowOnlyNumbers)
secondsInput.addEventListener('input', allowOnlyNumbers)

// Event listeners para os botões de controle do cronômetro/timer
playPauseBtn.addEventListener('click', () => {
    if (isTimer && !isRunning) {
        totalTime = parseInputToSeconds() // Configurar o total de segundos a partir do input
    }
    startTimer()
})

resetBtn.addEventListener('click', resetTimer)
toggleModeBtn.addEventListener('click', toggleMode)