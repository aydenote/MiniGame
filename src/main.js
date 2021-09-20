'use strict';

import PopUp from './popup.js';
import {GameBuilder, Reason} from './game.js';
import * as sound from './sound.js';

const gameFinishBanner = new PopUp();
const game = new GameBuilder()
    .gameTime(20)
    .carrotCount(20)
    .bugCount(10)
    .build();

game.setGameStopListener((reason)=> {
    let message;
    switch(reason){
        case Reason.cancel:
            message = 'Replay❓';
            sound.playAlert();
            break;
        case Reason.win:
            message = 'YOU WON 👍👍';
            sound.playWin();
            break;
        case Reason.lose:
            message = 'YOU LOST 😥';
            sound.playBug();
            break;
        default:
            throw new Error('Not valid reason');
    }
    gameFinishBanner.showWithText(message);

})

gameFinishBanner.setClickListener(()=>{
    game.start();
    
})

