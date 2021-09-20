'use strict';

export default class Field{
    constructor(){
        this.field = document.querySelector('.game__field');
        this.fieldRect = this.field.getBoundingClientRect();

        field.addEventListener('click', ()=> {
            this.onClick && this.onClick();

            
        });
    }

    setClickListener(event){
    
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
    onFieldClick(event){
    
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
}

function audioStop(){
    win_audio.pause();
    carrot_audio.pause();
    bug_audio.pause();
    bg_audio.pause();
    alert_audio.pause();
}