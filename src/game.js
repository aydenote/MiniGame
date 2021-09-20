'use strict';


import {Field, ItemType} from './field.js';
import * as sound from './sound.js';

export const Reason = Object.freeze({
    win: 'win',
    lose: 'lose',
    cancel: 'cancel'
});

export class GameBuilder{
    gameTime(duration){
        this.gameTime = duration;
        return this;
    }

    carrotCount(num){
        this.carrotCount = num;
        return this;
    }

    bugCount(num){
        this.bugCount = num;
        return this;
    }

    build(){
        return new Game(
            this.gameTime,
            this.carrotCount,
            this.bugCount
        )
    }
}
class Game{
    constructor(gameSecond, carrotCount,bugCount){
        this.gameSecond = gameSecond;
        this.bugCount = bugCount;
        this.carrotCount = carrotCount;

        this.gameBtn = document.querySelector('.game__button')
        this.gameTimer = document.querySelector('.game__timer')
        this.gameScore = document.querySelector('.game__score')
        this.gameBtn.addEventListener('click', ()=> {
            if(this.started){
                this.stop(Reason.cancel);
            } else {
                this.start();
            }
            
        });
        this.gameField = new Field(carrotCount, bugCount);
        this.gameField.setClickListener(this.onItemClick);

        this.started = false;
        this.timer = undefined;
        this.score = 0;
    }


    setGameStopListener(onGameStop){
        this.onGameStop = onGameStop;
    }

    start(){
    this.started = true;
    this.initGame();
    this.showStopButton();
    this.showTimerAndScore();
    this.startTimer();
    sound.playBg();
}


    stop(reason){
    this.started = false;
    this.stopTimer();
    this.hideGameButton();
    this.onGameStop && this.onGameStop(reason);
    sound.stopBg();
}

    onItemClick = (item) =>{    
        if(!this.started){
            return;
        }
    
        if(item === ItemType.carrot){
            this.score++;
            this.updateScoreBoard();
            if(this.score === this.carrotCount){
                this.stop(Reason.win);
                }
        } else if(item === ItemType.bug){
            this.stop(Reason.lose);
        }
    }
   showStopButton(){
    const icon = this.gameBtn.querySelector('#play');
    icon.classList.remove('fa-play');
    icon.classList.add('fa-stop');
    this.gameBtn.style.visibility = 'visible';
}
    hideGameButton(){
    this.gameBtn.style.visibility = 'hidden';
}

    showTimerAndScore(){
    this.gameTimer.style.visibility = 'visible';
    this.gameScore.style.visibility = 'visible';
}

    startTimer(){
    let remainingTimeSec = this.gameSecond;
    this.updateTimerText(remainingTimeSec);
    this.timer = setInterval(()=>{
        if(remainingTimeSec <= 0){
            clearInterval(this.timer);
            this.stop(this.carrotCount === this.score ? Reason.win : Reason.lose);
            return;
        }
        this.updateTimerText(--remainingTimeSec)
    }, 1000)
}

    stopTimer(){
    clearInterval(this.timer);
}

    updateTimerText(time){
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    this.gameTimer.innerText = `${minutes}:${seconds}`
}

    initGame(){
    this.score = 0;
    this.gameScore.innerText = this.carrotCount;
    this.gameField.init();
    this.stopTimer();
}

    updateScoreBoard(){
    this.gameScore.innerText = this.carrotCount - this.score;
}  
}