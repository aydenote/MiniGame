'use strict';

const win_audio = new Audio('/sound/game_win.mp3');
const bg_audio = new Audio('/sound/bg.mp3')
const carrot_audio = new Audio('/sound/carrot_pull.mp3')
const bug_audio = new Audio('/sound/bug_pull.mp3')
const alert_audio = new Audio('/sound/alert.wav')

export function playCarrot(){
    playSound(carrot_audio);
}

export function playBug(){
    playSound(bug_audio);
}

export function playAlert(){
    playSound(alert_audio);
}

export function playBg(){
    playSound(bg_audio);
}

export function stopBg(){
    stopSound(bg_audio);
}

export function playWin(){
    playSound(win_audio);
}


function playSound(sound){
    sound.currenttime= 0;
    sound.play();
}

function stopSound(sound){
    sound.pause();
}