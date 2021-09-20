'use strict';

export default class PopUp{
    constructor(){
        this.popUp = document.querySelector('.pop-up');
        this.popUpText = document.querySelector('.pop-up__message');
        gameBtn.addEventListener('click', ()=> {
            this.onClick && this.onClick();
            this.hide();
            
        });

    }
    setClickListener(onClick){

    }
    showWithText(text){
        this.popUpText.innerText= text;
        this.popUp.classList.remove('pop-up--hide')
    }

    hide(){
        this.popUp.classList.add('pop-up--hide')
    }
}
function audioStop(){
    win_audio.pause();
    carrot_audio.pause();
    bug_audio.pause();
    bg_audio.pause();
    alert_audio.pause();
}