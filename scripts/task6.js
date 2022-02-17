// Week 6

// Gets the current day of the week
const today = new Date();
let dayOfWeek;
dayOfWeek = today.getDay();

let message1;
if (dayOfWeek >= 1 && dayOfWeek <= 5) {
    message1 = 'Hang in there!';
}

else {
    message1 = 'Woohoo!  It is the weekend!';
}

//Returns the name of the day as string
let message2;
switch (dayOfWeek) {
    case 0:
        message2 = 'Sunday';
        break;
    case 1:
        message2 = 'Monday';
        break;
    case 2:
        message2 = 'Tuesday';
        break;
    case 3:
        message2 = 'Wednesday';
        break;
    case 4:
        message2 = 'Thursday';
        break;
    case 5:
        message2 = 'Friday';
        break;
    case 6:
        message2 = 'Saturday';
        break;
    default:
        message2 = 'Unknown - ' + dayOfWeek;
        break;
}

document.querySelector('#message1').textContent = message1;
document.querySelector('#message2').textContent = message2;


//Tic tac toe game
window.addEventListener('DOMContentLoaded', () => {
    let tiles = Array.from(document.querySelectorAll('.tile'));
    let playerDisplay = document.querySelector('.display-player');
    let resetButton = document.querySelector('#reset');
    let announcer = document.querySelector('.announcer');

    //Intialize board
    //First player is X
    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let isGameActive = true;

    let PLAYERX_WON = 'PLAYERX_WON';
    let PLAYERO_WON = 'PLAYERO_WON';
    let TIE = 'TIE';

 
        // Indexes within the board
        // [0] [1] [2]
        // [3] [4] [5]
        // [6] [7] [8]
  
//Conditions for winning
    let winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];


    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            let winCondition = winningConditions[i];
            let a = board[winCondition[0]];
            let b = board[winCondition[1]];
            let c = board[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

    if (roundWon) {
            announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
            isGameActive = false;
            return;
        }

    if (!board.includes(''))
        announce(TIE);
    }

    let announce = (type) => {
        switch(type){
            case PLAYERO_WON:
                announcer.innerHTML = 'Congratulations! Player <span class="playerO">O</span> Won!';
                break;
            case PLAYERX_WON:
                announcer.innerHTML = 'Congratulations! Player <span class="playerX">X</span> Won!';
                break;
            case TIE:
                announcer.innerText = 'Sorry, the game is tied.';
        }
        announcer.classList.remove('hide');
    };

    let isValidAction = (tile) => {
        if (tile.innerText === 'X' || tile.innerText === 'O'){
            return false;
        }

        return true;
    };

    let updateBoard =  (index) => {
        board[index] = currentPlayer;
    }

    //After each turn, the player resets
    let changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
    }

    //Calls updatdeboard, handleresultvalidation and changeplayer functions
    let userAction = (tile, index) => {
        if(isValidAction(tile) && isGameActive) {
            tile.innerText = currentPlayer;
            tile.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            handleResultValidation();
            changePlayer();
        }
    }
    //Resets the board function
    let resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        announcer.classList.add('hide');

        if (currentPlayer === 'O') {
            changePlayer();
        }
        //removes the text inside the board
        tiles.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('playerX');
            tile.classList.remove('playerO');
        });
    }

    tiles.forEach( (tile, index) => {
        tile.addEventListener('click', () => userAction(tile, index));
    });

    //When Play again button is click, the reset board function will run
    resetButton.addEventListener('click', resetBoard);
});