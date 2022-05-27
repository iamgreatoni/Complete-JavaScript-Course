'use strict';



let score, roundScore, activePlayer, gamePlaying;


function init(){
    score = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;


    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score--0').textContent = '0';
    document.getElementById('score--1').textContent = '0';
    document.getElementById('current--0').textContent = '0';
    document.getElementById('current--1').textContent = '0';

    document.getElementById('name--0').textContent = 'Player 1';
    document.getElementById('name--1').textContent = 'Player 2';

    document.querySelector('.player--0').classList.remove('winner'); 
    document.querySelector('.player--1').classList.remove('winner');
    document.querySelector('.player--0').classList.remove('player--active');
    document.querySelector('.player--1').classList.remove('player--active'); 

    document.querySelector('.player--0').classList.add('player--active');
};

init();

document.querySelector('.btn--roll').addEventListener('click', function(){ 

    if(gamePlaying){
        let dice =  Math.floor(Math.random() * 6) + 1;

        let diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        if (dice !== 1){
            const activePlayerDom =  document.querySelector('#current--' + activePlayer);
            roundScore += dice;
            activePlayerDom .textContent = roundScore;
        } else {
           nextPlayer();

        }; 
    };

});


document.querySelector('.btn--hold').addEventListener('click', function(){
    if(gamePlaying){
        // add current score to the global score
        score[activePlayer] += roundScore;

        // update the display
        document.querySelector('#score--' + activePlayer).textContent = score[activePlayer];

        let input = document.querySelector('.winning-score').value;
        let winningScore;

        // type coersion 
        // Undefined, null, 0 and " ", are all coerced to false.
        // Everything else is coerced as true. 

        if(input){
            winningScore = input;
        } else {
            winningScore = 100;
        }

        // check if player won the game
        if(score[activePlayer] >= winningScore){
            document.querySelector('#name--' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';

            document.querySelector('.player--' + activePlayer).classList.add('winner');
            document.querySelector('.player--' + activePlayer).classList.remove('player--active');
            gamePlaying = false;
        } else{
            nextPlayer();
        }

    }
});
  
function nextPlayer (){
 activePlayer = activePlayer === 0 ? 1 : 0;
 roundScore = 0;
 document.getElementById('current--0').textContent = '0';
 document.getElementById('current--1').textContent = '0';
 // if (activePlayer === 0){
 //     activePlayer = 1;
 // } else {
 //     activePlayer = 0;
 // }

 document.querySelector('.player--0').classList.toggle('player--active');
 document.querySelector('.player--1').classList.toggle('player--active');

 document.querySelector('.dice').style.display = 'none';
 
} 
    
document.querySelector('.btn--new').addEventListener('click', init);


