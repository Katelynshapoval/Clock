var audio = new Audio("alarm.mp3");
var clicked = false;
var restartTo0 = false;
var start_flip = false;
var continue_time = false;
var time_count = 0
function changeTime(){
  if (start_flip == false){
    start_flip = true;
    let hours = document.getElementById("hours").value  
    let min = document.getElementById("min").value  
    let sec = document.getElementById("sec").value  
    let time_count = (hours * 360 + min * 6 + sec)
    flipAllCards(time_count)
    start_flip = false;
  }
}

function stop(){
  start_flip = false;
  clicked = true;
}

function restart(){
  restartTo0 = true;
  countTime()
}

function countTime(){
  clicked = false
  start_flip = true;
  if (continue_time == false || restartTo0 == true || time_count == 0){
    const hours = document.getElementById("hours").value  
    const min = document.getElementById("min").value  
    const sec = document.getElementById("sec").value  
    time_count = (hours * 360 + min * 6 + sec)
  }
  let myInterval = setInterval(() => {
    if (clicked == true){
      clearInterval(myInterval)
      clicked = false
      start_flip = false;
      continue_time = true;
    }
    else if (restartTo0 == true){
      clearInterval(myInterval)
      flipAllCards(time_count)
      restartTo0 = false;
      stop()
    }
    else{
    flipAllCards(time_count)
    if (time_count > 0){
      time_count --
    }
    else if (time_count == 0){
      start_flip = false
      audio.play()
      clearInterval(myInterval)
    }
  }
  }, 1000)
}

function flipAllCards(time) {
  const sec = time % 60
  const min = Math.floor(time / 60) % 60
  const hours = Math.floor(time / 3600)
  if (start_flip == true){
  flip(document.querySelector("[data-hours-tens]"), Math.floor(hours / 10))
  flip(document.querySelector("[data-hours-ones]"), hours % 10)
  flip(document.querySelector("[data-minutes-tens]"), Math.floor(min / 10) )
  flip(document.querySelector("[data-minutes-ones]"), min % 10)
  flip(document.querySelector("[data-seconds-tens]"), Math.floor(sec / 10))
  flip(document.querySelector("[data-seconds-ones]"), sec % 10)
}
}
function flip(flipCard, newNumber) {
  const topHalf = flipCard.querySelector(".top")
  const startNumber = parseInt(topHalf.textContent)
  if (newNumber === startNumber) return

  const bottomHalf = flipCard.querySelector(".bottom")
  const topFlip = document.createElement("div")
  topFlip.classList.add("top-flip")
  const bottomFlip = document.createElement("div")
  bottomFlip.classList.add("bottom-flip")

  topHalf.textContent = startNumber
  bottomHalf.textContent = startNumber
  topFlip.textContent = startNumber
  bottomFlip.textContent = newNumber

  topFlip.addEventListener("animationstart", e => {
    topHalf.textContent = newNumber
  })
  topFlip.addEventListener("animationend", e => {
    topFlip.remove()
  })
  bottomFlip.addEventListener("animationend", e => {
    bottomHalf.textContent = newNumber
    bottomFlip.remove()
  })
  flipCard.append(topFlip, bottomFlip)
}