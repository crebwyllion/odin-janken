let roundCounter = 0;
let playerScore = 0;
let cpuScore = 0;
const choices = document.querySelector('#choices');
const buttons = document.querySelectorAll('.choice'); 
const game = document.querySelector('#game');
const round = document.createElement('div');
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

function updateScore() {
    playerScoreDisplay.textContent = `${playerScore}`;
    cpuScoreDisplay.textContent = `${cpuScore}`;
}

function winRound() {
    round.textContent = `You played ${playerChoice} and the computer played
        ${cpuChoice}. You win this round!`;
    game.appendChild(round);
    ++playerScore;
    updateScore();
    checkScore();
}

function loseRound() {
    round.textContent = `You played ${playerChoice} and the computer played
        ${cpuChoice}. You lose this round.`;
    game.appendChild(round);
    ++cpuScore;
    updateScore();
    checkScore();
}

function drawRound
    () {
    round.textContent = `You played ${playerChoice} and the computer played
        ${cpuChoice}. This round is a draw.`;
    game.appendChild(round);
}

function checkScore() {
    if (playerScore == 3 || cpuScore == 3) {
        choices.style.visibility = 'hidden';
        showGameResults();
    }
    else {
        choices.style.visibility = 'visible';
    }
}

function showGameResults() {
    if (playerScore > cpuScore) {
        console.log('You win the game! Amazing!');
    } else if (playerScore < cpuScore) {
        console.log('You lost the game. Better luck next time!');
    } else {
        console.log('Wait... what happened?');
    }
}

// adding event listeners to buttons and allowing play
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        playRound(button.id, cpuPlay());
    })
})

function playGame() {
    roundCounter = 0;
    playerScore = 0;
    cpuScore = 0;

    while (roundCounter < 5) {
        playRound(prompt('Rock, paper, or scissors?').toLowerCase(), cpuPlay());

        console.log(`Your score is ${playerScore} and the computer's score is ${cpuScore}.`);
    }

    showGameResults();
}