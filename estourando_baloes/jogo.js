const mapSeconds = {
  1: 120,
  2: 60,
  3: 5
}

const imgPath = {
  full: 'imagens/balao_azul_pequeno.png',
  popped: 'imagens/balao_azul_pequeno_estourado.png'
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
  timerId = setInterval(() => {
    if (seconds < 0) {
      clearInterval(timerId)
      alert('Fim de jogo, você perdeu')
      reset()
      return
    }
    document.getElementById('cron').innerHTML = --seconds
  }, 1000)
}

function addPopEvent(balloon) {
  balloon.onclick = function () {
    pop(this)
  }
}

function createBalloons(qtdBalloons) {
  const scene = document.getElementById('balloonsContainer')
  if (!scene.children.length) {
    for (let i = 0; i < qtdBalloons; i++) {
      const balloon = document.createElement('img')
      balloon.src = imgPath.full
      balloon.style.margin = '10px'
      addPopEvent(balloon)
      scene.appendChild(balloon)
    }
  }
}

function pop(balloon) {
  balloon.src = imgPath.popped
  const fullBalloons = document.getElementById('full')
  const poppedBalloons = document.getElementById('popped')
  let fullNumber = Number(fullBalloons.innerHTML)
  fullBalloons.innerHTML = --fullNumber
  let poppedNumber = Number(poppedBalloons.innerHTML)
  poppedBalloons.innerHTML = ++poppedNumber
  balloon.setAttribute('onclick', '')
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
  const balloons = document.getElementById('balloonsContainer').children
  for (let i = 0; i < balloons.length; i++) {
    balloons[i].src = imgPath.full
    addPopEvent(balloons[i])
  }
  iniciarJogo()
}