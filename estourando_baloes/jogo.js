const mapSeconds = {
  1: 120,
  2: 60,
  3: 30
}

let timerId

function iniciarJogo() {
  const url = location.search
  const level = url.replace('?level=', '')

  let totalSeconds = mapSeconds[level]
  document.getElementById('cron').innerHTML = totalSeconds

  const qtdBalloons = 80
  createBalloons(qtdBalloons)

  document.getElementById('full').innerHTML = qtdBalloons
  document.getElementById('popped').innerHTML = 0

  timeCount(totalSeconds)
}

function timeCount(seconds) {
  if (seconds < 0) {
    clearTimeout(timerId)
    alert('Fim de jogo, você perdeu')
    return
  }
  document.getElementById('cron').innerHTML = seconds
  timerId = setTimeout(() => timeCount(--seconds), 1000)
}

function createBalloons(qtdBalloons) {
  const scene = document.getElementById('baloonsContainer')
  for (let i = 0; i < qtdBalloons; i++) {
    const balloon = document.createElement('img')
    balloon.src = 'imagens/balao_azul_pequeno.png'
    balloon.style.margin = '10px'
    balloon.onclick = function () {
      pop(this)
    }
    scene.appendChild(balloon)
  }
}

function pop(balloon) {
  balloon.src = 'imagens/balao_azul_pequeno_estourado.png'
  const fullBalloons = document.getElementById('full')
  const poppedBalloons = document.getElementById('popped')
  let fullNumber = Number(fullBalloons.innerHTML)
  fullBalloons.innerHTML = --fullNumber
  let poppedNumber = Number(poppedBalloons.innerHTML)
  poppedBalloons.innerHTML = ++poppedNumber
  checkGameState(fullNumber)
}

function checkGameState(fullBalloons) {
  if (fullBalloons === 0) {
    clearTimeout(timerId)
    alert('Parabéns, você venceu!')
    reset()
  }
}

function reset() {

}