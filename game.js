let level=0
var clickCount=0
let gamePattern=[]
audio=new Audio("sounds/beep.mp3")

function nextSequence(){
  let rnd=Math.floor(Math.random()*8)
  gamePattern.push(rnd)
}

$(".butt").click((e)=>{
  showEffect(e.target.id) //showing the click effect for the pressed button   
  if (checkAnswer(e.target.id)==false) { //check if the pressed button is correct
    restart() //if wrong, restart 
  } else { //otherwise, level up 
    if (level == clickCount && level <5) {
      $("#bdot"+(level-1)).css("background-color","green") //show the level indicator to player
      showGamePattern() //show the next game pattern
    } else if (clickCount == 5){ //if level is 5, game is completed.
      showConfetti()
    }
  }
})

async function showConfetti() {
  await delay(400)
  alert('Task Completed.')
}

function showEffect(e) {
  $("#"+e).fadeOut(200).fadeIn(200)
  audio!=undefined? audio.play():""
}

$('#start').click(()=>{
  showGamePattern()
})

async function showGamePattern(){ 
  disableButtons()
  nextSequence() //generate the random number between 0-8
  await delay(400)
  for (let i = 0; i < gamePattern.length; i++) { //loop the gamePattern and show the patterns to player
    $('#'+gamePattern[i]).fadeOut(200).fadeIn(200) //multiple threads firing because of methods 
    await delay(500) //wait for the animation to finish before going to next element
  }
  $('#dot'+level).css('background-color','green') //show the level indicator to player
  level++ //prepare for next level
  clickCount=0
  for (let i=0; i<=level;i++){
    $('#bdot'+i).css('background-color','#bbb')
  }
  enableButtons()
}

const delay = (n) => new Promise((resolve, reject) =>{
  setTimeout(()=> {resolve('Success')}, n);
})

function checkAnswer(e) {
  if ('b'+gamePattern[clickCount]!=e) {
    return false
  }
  $('#bdot'+clickCount).css('background-color','green')
  clickCount++
  return true
}

async function restart(){
  flashing()
  gamePattern=[]
  for (let i=0; i<=level;i++){
    $('#dot'+i).css('background-color','#bbb')
    $('#bdot'+i).css('background-color','#bbb')
  }
  level=0
  clickCount=0
  await delay(2000)
  showGamePattern()
}

async function flashing(){
  await delay(500)
  for (let i=0; i<9;i++){
    $('#b'+i).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200)
    $('#'+i).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200)
  } 
  for (let i=0; i<5;i++){
    $('#dot'+i).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200)
    $('#bdot'+i).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200)
  } 

}

function disableButtons(){
  for (let i=0; i<9;i++){
    $('#b'+i).prop('disabled',true)
  } 
}

function enableButtons(){
  for (let i=0; i<9;i++){
    $('#b'+i).prop('disabled',false)
  } 
}
