'use strict';

const Carrot__size = 120;
const Carrot__count = 20;
const Bug__count = 20;
const Game__SEC = 20;

const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();

const gameBtn = document.querySelector('.game__button')
const gameTimer = document.querySelector('.game__timer')
const gameScore = document.querySelector('.game__score')
const popUp = document.querySelector('.pop-up');
const popUpText = document.querySelector('.pop-up__message');
const popUpRefresh = document.querySelector('.pop-up__refresh');

const win_audio = new Audio('/sound/game_win.mp3');
const bg_audio = new Audio('/sound/bg.mp3')
const carrot_audio = new Audio('/sound/carrot_pull.mp3')
const bug_audio = new Audio('/sound/bug_pull.mp3')
const alert_audio = new Audio('/sound/alert.wav')

let stared = false;
let score = 0;
let timer = undefined;

field.addEventListener('click', onFieldClick);
gameBtn.addEventListener('click', ()=> {
    if(stared){
        stopGame();
    } else {
        startGame();
    }
    
});

popUpRefresh.addEventListener('click', ()=>{
    startGame();
    hidePopUp();
    showGameButton();
});

function startGame(){
    stared = true;
    initGame();
    showstartButton();
    showTimerAndScore();
    startGameTimer();
}

function stopGame(){
    stared = false;
    stopGameTimer();
    hideGameButton();
    showPopUpWithText('REPLAY❓');

    audioStop();
    alert_audio.play();
}

function finishGame(win){
    stared = false;
    hideGameButton();
    showPopUpWithText(win? 'YOU WON 🍗' : 'YOU LOST 😥');
    
    audioStop();

    if(win===true){
        win_audio.play();
    } else {
        alert_audio.play();
    }
    }

function audioStop(){
    win_audio.pause();
    carrot_audio.pause();
    bug_audio.pause();
    bg_audio.pause();
    alert_audio.pause();
}

function showTimerAndScore(){
    gameTimer.style.visibility = 'visible';
    gameScore.style.visibility = 'visible';
}
function showstartButton(){
    const icon = gameBtn.querySelector('#play');
    icon.classList.remove('fa-play');
    icon.classList.add('fa-stop');
    
}

function hideGameButton(){
    gameBtn.style.visibility = 'hidden';
}

function showGameButton(){
    gameBtn.style.visibility = 'visible';

}

function startGameTimer(){
    let remainingTimeSec = Game__SEC;
    updateTimerText(remainingTimeSec);
    timer = setInterval(()=>{
        if(remainingTimeSec <= 0){
            clearInterval(timer);
            finishGame(Carrot__count === score);
            return;
        }
        updateTimerText(--remainingTimeSec)
    }, 1000)
}

function stopGameTimer(){
    clearInterval(timer);
}

function updateTimerText(time){
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    gameTimer.innerText = `${minutes}:${seconds}`
}

function showPopUpWithText(text){
    popUpText.innerText = text;
    popUp.classList.remove('pop-up--hide')
    
}

function hidePopUp(){
    popUp.classList.add('pop-up--hide')
}

function initGame(){
    field.innerHTML = '';
    score = 0;
    gameScore.innerText = Carrot__count;
       

    // 벌레와 당근 생성 및 field에 추가
    
    addItem('carrot', Carrot__count, '/img/carrot.png');
    addItem('bug', Bug__count, '/img/bug.png');

    bg_audio.play();
}
function onFieldClick(event){
    
    if(!stared){
        return;
    }

    const target = event.target;
    if(target.matches('.carrot')){
        // 당근
        target.remove();
        score++;
        updateScoreBoard();
        
        carrot_audio.play();

        if(score === Carrot__count){
            finishGame(true);
            stopGameTimer();
        }
    } else if(target.matches('.bug')){
        // 벌레
        stopGameTimer();
        finishGame(false);
        bug_audio.play();
    }
}

function updateScoreBoard(){
    gameScore.innerText = Carrot__count - score;
}
function addItem(className, count, imgPath){
    const x1 = 0;
    const y1 = 0;
    const x2 = fieldRect.width - Carrot__size;
    const y2 = fieldRect.height - Carrot__size;

    for(let i = 0; i<count; i++){
        const item = document.createElement('img')
        item.setAttribute('class', className);
        item.setAttribute('src', imgPath);
        item.style.position = 'absolute';
        
        const x = randomNumber(x1, x2);
        const y = randomNumber(y1, y2);
        item.style.left = `${x}px`;
        item.style.top = `${y}px`;

        field.appendChild(item);

    }
}
function randomNumber(min,  max){
    return Math.random() * (max - min) + min;
}