/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, previousRoll1, previousRoll2, gamePoint;

function init(){
    scores = [0,0];
    roundScore = 0 ;
    activePlayer = 0 ; 
    gamePlaying = true;
    gamePoint = 20;
    previousRoll1 = 0;
    previousRoll2 = 0;

    //to change the CSS of the element using querySelector
    document.querySelector('.dice1').style.display='none';
    document.querySelector('.dice2').style.display='none';

    // selecting element by ID, note the absence of # that 
    // was present in queryselector when selecting by id
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    
    document.querySelector('.player-0-panel').classList.add('active');
}

init();

// dice  = Math.floor(Math.random()*6) + 1; 
// console.log(dice);

// document.querySelector('#current-'+activePlayer).textContent = dice; //setter

// document.querySelector('#current-'+activePlayer).innerHTML = '<em>' + dice + '</em>';

// var x = document.querySelector('#score-0').textContent; //getter
// console.log(x);





// document.querySelector('.btn-roll').addEventListener('click', btn);
document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying){
        // 1. Random Number
        var dice1  = Math.floor(Math.random()*6) + 1; 
        var dice2  = Math.floor(Math.random()*6) + 1; 
        if (dice1 === 6 && previousRoll1===6){
            scores[activePlayer] = 0;
            document.querySelector('#score-'+ activePlayer).textContent = '0';
            nextPlayer();
        }
        if (dice2 === 6 && previousRoll1===6){
            scores[activePlayer] = 0;
            document.querySelector('#score-'+ activePlayer).textContent = '0';
            nextPlayer();
        }

        previousRoll1 = dice1;
        previousRoll2 = dice2;

        //2. Display the result

        var diceDOM1 = document.querySelector('.dice1')
        var diceDOM2 = document.querySelector('.dice2')
        diceDOM1.style.display = 'block';
        diceDOM2.style.display = 'block';
        // In CSS opposite of display = 'none' is display = 'block'
        // none removes and block brings
        diceDOM1.src = 'dice-'+ dice1 +'.png'; // dice-1.png present in 
        diceDOM2.src = 'dice-'+ dice2 +'.png'; // dice-1.png present in 


        //3. Update the round score IF the rolled number was NOT a 1
        if (dice1 !== 1 || dice2 !== 1){
            //Add score
            roundScore += dice1 + dice2;
            document.querySelector('#current-'+activePlayer).textContent = roundScore;
        } else{
            // Next player
            nextPlayer();
        }
    }

});

document.querySelector('.btn-hold').addEventListener('click', function(){
    if (gamePlaying){
        // 1. Add current  score to global score
        scores[activePlayer] += roundScore;

        // 2. Update UI
        document.querySelector('#score-'+ activePlayer).textContent = scores[activePlayer];

        // 3. Check if player won the game.
        if(scores[activePlayer]>=gamePoint){
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice1').style.display = 'none'; 
            document.querySelector('.dice2').style.display = 'none'; 
            document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
            document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
            gamePlaying = false;
        } else{
            nextPlayer();
        }
    }
});

function nextPlayer(){
    // Next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    previousRoll1 = 0;
    previousRoll2 = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // document.querySelector('.player-0-panel').classList.remove('active');
    // document.querySelector('.player-1-panel').classList.add('active');
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice1').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

//setting custom gamepoint
document.getElementById('submit-game-value').addEventListener('click',function(){
    if(document.getElementById('gamepoint').value){ //check if undefined, o , null or "" is present
        gamePoint = document.getElementById('gamepoint').value;
        document.getElementById('gamepoint').value = '';
        // console.log(gamePoint);
    }
});