let hoursInput = document.getElementById('hours')
let minutesInput = document.getElementById('minutes')
let secondsInput = document.getElementById('seconds')
let playPauseBtn = document.getElementById('playPauseBtn')
let resetBtn = document.getElementById('resetBtn')
let toggleModeBtn = document.getElementById('toggleModeBtn')
let lastTimeRecord = document.getElementById('lastTimeRecord')

let interval
let isRunning = false
let totalTime = 0
let isTimer = false
let startTime

// Função para formatar o tempo em HH:MM:SS
function formatTime(timeInSeconds) {
    let hours = Math.floor(timeInSeconds / 3600)
    let minutes = Math.floor((timeInSeconds % 3600) / 60)
    let seconds = timeInSeconds % 60
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

// Função para atualizar a exibição de horas, minutos e segundos
function updateDisplay() {
    let hours = Math.floor(totalTime / 3600)
    let minutes = Math.floor((totalTime % 3600) / 60)
    let seconds = totalTime % 60

    hoursInput.value = String(hours).padStart(2, '0')
    minutesInput.value = String(minutes).padStart(2, '0')
    secondsInput.value = String(seconds).padStart(2, '0')
}

// Função para registrar o último tempo
function recordLastTime() {
    const timeString = formatTime(totalTime)
    const mode = isTimer ? "Timer" : "Cronômetro"
    
    lastTimeRecord.innerHTML = `
        <span class="time">${timeString}</span>
        <span class="mode">${mode}</span>
    `
}

// Função para limpar o registro
function clearLastTimeRecord() {
    lastTimeRecord.innerHTML = ''
}

// Função para iniciar o cronômetro ou temporizador
function startTimer() {
    if (isRunning) {
        clearInterval(interval)
        playPauseBtn.textContent = 'Play'
        if (!isTimer) {
            recordLastTime()
        }
    } else {
        if (!isTimer) {
            startTime = Date.now() - (totalTime * 1000)
        }
        interval = setInterval(() => {
            if (isTimer && totalTime > 0) {
                totalTime--
            } else if (!isTimer) {
                totalTime++
            }

            if (isTimer && totalTime === 0) {
                clearInterval(interval)
                alert("O tempo acabou!")
                isRunning = false
                playPauseBtn.textContent = 'Play'
                recordLastTime()
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
    if (isRunning && !isTimer) {
        recordLastTime()
    }
    isRunning = false
    playPauseBtn.textContent = 'Play'

    if (isTimer) {
        totalTime = parseInputToSeconds()
    } else {
        totalTime = 0
    }

    updateDisplay()
    clearLastTimeRecord()
}

// Função para alternar entre o modo cronômetro e temporizador
function toggleMode() {
    isTimer = !isTimer
    resetTimer()
    toggleModeBtn.textContent = isTimer ? 'Switch to Cronômetro' : 'Switch to Timer'
}

// Função para converter a entrada de tempo em segundos
function parseInputToSeconds() {
    let hours = parseInt(hoursInput.value) || 0
    let minutes = parseInt(minutesInput.value) || 0
    let seconds = parseInt(secondsInput.value) || 0
    return (hours * 3600) + (minutes * 60) + seconds
}

// Função para permitir apenas números nos campos
function allowOnlyNumbers(event) {
    let value = event.target.value
    if (isNaN(value) || value.includes('.')) {
        event.target.value = value.replace(/\D/g, '')
    }

    if (event.target === hoursInput) {
        if (parseInt(value) > 23) event.target.value = '23'
    } else {
        if (parseInt(value) > 59) event.target.value = '59'
    }
}

// Event listeners para permitir apenas números nos inputs
hoursInput.addEventListener('input', allowOnlyNumbers)
minutesInput.addEventListener('input', allowOnlyNumbers)
secondsInput.addEventListener('input', allowOnlyNumbers)

// Event listener para mudar o valor quando o campo perde o foco
hoursInput.addEventListener('blur', function() {
    this.value = this.value.padStart(2, '0')
})
minutesInput.addEventListener('blur', function() {
    this.value = this.value.padStart(2, '0')
})
secondsInput.addEventListener('blur', function() {
    this.value = this.value.padStart(2, '0')
})

// Event listeners para os botões de controle
playPauseBtn.addEventListener('click', () => {
    if (isTimer && !isRunning) {
        totalTime = parseInputToSeconds()
    }
    startTimer()
})

resetBtn.addEventListener('click', resetTimer)
toggleModeBtn.addEventListener('click', toggleMode)