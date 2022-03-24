let roundCounter = 0;
let playerScore = 0;
let cpuScore = 0;
const choices = document.querySelector('#choices');
const buttons = document.querySelectorAll('.choice'); 
const text = document.querySelector('#text');
const round = document.createElement('div');
const results = document.createElement('div');
const playAgain = document.createElement('button');
const playerScoreDisplay = document.querySelector('#player-score');
const cpuScoreDisplay = document.querySelector('#cpu-score');

// create random integer for next function
function getRandomInt() {
    return Math.floor(Math.random() * 3);
}

// call this function to pick rock, paper, or scissors for cpu
function cpuPlay() {
    randomInt = getRandomInt();

    if (randomInt === 0) {      // convert numbers into strings for readability
        return 'rock';
    } else if (randomInt === 1) {
        return 'paper';
    } else if (randomInt === 2) {
        return 'scissors';
    }
}

// actual gameplay logic
function playRound(player, cpu) {
    playerChoice = player;
    cpuChoice = cpu;

    switch (playerChoice) {
        case 'rock':
            if (cpuChoice === 'rock') drawRound();
            else if (cpuChoice === 'paper') loseRound();
            else if (cpuChoice === 'scissors') winRound();
            break;
        case 'paper':
            if (cpuChoice === 'rock') winRound();
            else if (cpuChoice === 'paper') drawRound();
            else if (cpuChoice === 'scissors') loseRound();
            break;
        case 'scissors':
            if (cpuChoice === 'rock') loseRound();
            else if (cpuChoice === 'paper') winRound();
            else if (cpuChoice === 'scissors') drawRound();
            break;
        default:
            return 'error';
    }
}

// updates score display
function updateScore() {
    playerScoreDisplay.textContent = `${playerScore}`;
    cpuScoreDisplay.textContent = `${cpuScore}`;
}

function winRound() {
    round.textContent = `You played ${playerChoice} and the computer played
        ${cpuChoice}. You win this round!`;
    text.appendChild(round);
    ++playerScore;
    updateScore();
    checkScore();
}

function loseRound() {
    round.textContent = `You played ${playerChoice} and the computer played
        ${cpuChoice}. You lose this round.`;
    text.appendChild(round);
    ++cpuScore;
    updateScore();
    checkScore();
}

function drawRound
    () {
    round.textContent = `You played ${playerChoice} and the computer played
        ${cpuChoice}. This round is a draw.`;
    text.appendChild(round);
}

// check to see if game is over yet; best 3 out of 5
function checkScore() {
    if (playerScore == 3 || cpuScore == 3) {
        choices.style.visibility = 'hidden';
        showGameResults();
    }
}

// adds a functional replay button
function replay () {
    playAgain.textContent = 'Play again?';
    playAgain.id = 'play-again';
    text.appendChild(playAgain);
    const playAgainButton = document.querySelector('#play-again');
    playAgainButton.addEventListener('click', () => {
        playerScore = 0;
        cpuScore = 0;
        updateScore();
        cleanSlate();
    })
}

// removes added round and results text, play again button; restores play buttons
function cleanSlate () {
    while (text.firstChild) {
        text.firstChild.remove();
    }
    choices.style.visibility = 'visible';
}

function showGameResults() {
    if (playerScore > cpuScore) {
        results.textContent = 'You won the game! Amazing!';
        text.appendChild(results);
        replay();
    } else if (playerScore < cpuScore) {
        results.textContent = 'You lost the game. Better luck next time!';
        text.appendChild(results);
        replay();
    } else {
        results.textContent = 'Wait... what happened?';
        text.appendChild(results);
    }
}

// adding event listeners to buttons and allowing play
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        playRound(button.id, cpuPlay());
    })
})
