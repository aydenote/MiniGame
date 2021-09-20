'use strict';

const Game__SEC = 20;
const Carrot__size = 120;
const Carrot__count = 20;
const Bug__count = 20;

let stared = false;
let score = 0;
let timer = undefined;

const win_audio = new Audio('/sound/game_win.mp3');
const alert_audio = new Audio('/sound/alert.wav')

export default class Game{
    constructor(){
        this.gameBtn = document.querySelector('.game__button')
        this.gameTimer = document.querySelector('.game__timer')
        this.gameScore = document.querySelector('.game__score')
        
        gameBtn.addEventListener('click', ()=> {
            this.onClick && this.onClick();

            
        });
    }

    setClickListener(onClick){
        this.onClick = onClick;
    }

    startGame(){
        stared = true;
        initGame();
        showstartButton();
        showTimerAndScore();
        startGameTimer();
    }

    stopGame(){
        stared = false;
        stopGameTimer();
        hideGameButton();
        popup.showWithText('REPLAY❓');
    
        audioStop();
        alert_audio.play();
    }

    finishGame(win){
        stared = false;
        hideGameButton();
        popup.showWithText(win? 'YOU WON 🍗' : 'YOU LOST 😥');
        
        audioStop();
    
        if(win===true){
            win_audio.play();
        } else {
            alert_audio.play();
        }
        }

    initGame(){
            field.innerHTML = '';
            score = 0;
            gameScore.innerText = Carrot__count;
               
        
            // 벌레와 당근 생성 및 field에 추가
            
            addItem('carrot', Carrot__count, '/img/carrot.png');
            addItem('bug', Bug__count, '/img/bug.png');
        
            bg_audio.play();
        }

        showTimerAndScore(){
            gameTimer.style.visibility = 'visible';
            gameScore.style.visibility = 'visible';
        }
}

function audioStop(){
    win_audio.pause();
    carrot_audio.pause();
    bug_audio.pause();
    bg_audio.pause();
    alert_audio.pause();
}