/*
 * Create a list that holds all of your cards
 */
let card_names = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-anchor", "fa fa-leaf", "fa fa-bicycle", "fa fa-diamond", "fa fa-bomb", "fa fa-leaf", "fa fa-bomb", "fa fa-bolt", "fa fa-bicycle", "fa fa-paper-plane-o", "fa fa-cube"],
    open_cards = [],
    shown_cards = [],
    move_count = 0,
    matched_pairs = 0,
    totalClicks = 0,
    game_started = false;

let timer = 0;
let timePTR;
num_stars = 3;

const deck = document.getElementById('mainDeck');
const reset_button = document.querySelector('.restart');
const play_again = document.querySelector('.play-again');
const moves = document.querySelector('.moves');
const endMoves = document.getElementById('finalMoves');
const starOne = document.getElementById('star-one');
const starTwo = document.getElementById('star-two');
const starThree = document.getElementById('star-three');
const starLine = document.getElementById('stars');
const scoreDisplay = document.getElementById("show-score");
const modal = document.getElementById('win-modal');
const starNums = document.getElementById('num-stars');
const endTime = document.getElementById('endTime');
reset_button.addEventListener('click', resetGame);
play_again.addEventListener('click', playAgain);

//display the matched pairs from the start
playGame();

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
function createDeck() {
    // clears deck to start before redrawing.
    // Remove ChildrenNodes - StackOverflow --> https://bit.ly/2Hmw67R
    while(deck.hasChildNodes() ){
        deck.removeChild(deck.lastChild);
    }

    // Loops through the card_names array and recreates the card elements on the page.
    for (let i = 0; i < card_names.length; i++) {
        const newCard = document.createElement('li');
        newCard.className = "card";
        const newCardData = document.createElement('i');
        newCardData.className = card_names[i];

        const addNewCardData = newCard.appendChild(newCardData);
        const addNewCard = deck.appendChild(newCard);
    }
}


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}


function flipOver() {
  event.target.classList.add('open');
  event.target.classList.add('show');
}


// adds click eventListener to <ul> rather than each individual card.
 // * set up the event listener for a card. If a card is clicked:
deck.addEventListener('click', function(event) {
    // stops user from just clicking on 1 card twice to "match" it.
    if (event.target.classList.contains('open')) { 
        return; 
    }

//prevents just one click from being considered 1 move. Will make sure 2 cards are open 
    //before it counts as one move.
  if (totalClicks < 2){
    if (event.target.className === "card"){
        totalClicks += 1;
        flipOver();
        if (totalClicks === 2){
            increaseMoveCount();
        }
    }
 // *  - display the card's symbol (put this functionality in another function that you call from this one)
 // *  + increment the move counter and display it on the page (put this functionality in another function that you call from this one)   
    // stops user from just clicking on 1 card twice to "match" it.
    
  if (open_cards.length != 2 && event.target.className === "card open show" && 
        shown_cards.length != 2){
        open_cards.push(event.target.childNodes[0].className);
        shown_cards.push(event.target);
    }

 // *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
    // addToOpenArray();
 // *  - if the list already has another card, check to see if the two cards match
  // *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
    if (open_cards.length > 1) {
        if(open_cards[0] === open_cards[1] ) {
                increaseScore();
                setTimeout(function(){
                shown_cards[0].classList.add('match');
                shown_cards[1].classList.add('match');
                open_cards = [];
                shown_cards = [];
                totalClicks = 0;
            }, 110);
// *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
        } else if (open_cards[0] != open_cards[1]) {
            setTimeout(function(){
            shown_cards[0].classList.remove('open');
            shown_cards[0].classList.remove('show');
            shown_cards[1].classList.remove('open');
            shown_cards[1].classList.remove('show');
            open_cards = [];
            shown_cards = [];
            totalClicks = 0;
            }, 600);
        }
    }
 // *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
    if(matched_pairs === 8) {
        // clearInterval(myVar);
        clearTimeout(timePTR);
        showModal();
      } 
    }
 });


// increases move count: 2 clicks === 1 move
function increaseMoveCount() {
    move_count += 1;
    moves.innerHTML = move_count;

    if (move_count === 15) {
          starOne.style.display = "none";
          num_stars -= 1;
    } else if (move_count === 30) {
          starTwo.style.display = "none";
          num_stars -= 1;
    } 
}

//function to increase score
function increaseScore(){
    matched_pairs += 1;
}

 
// Winning Modal
function showModal() {
    modal.style.display = "block";
    starNums.innerHTML = num_stars;
    endMoves.innerHTML = move_count;
    endTime.innerHTML = timer;
};


function playGame() {
    startTimer();
    shuffle(card_names);
    createDeck();
    num_stars = 3;
    moves.innerHTML = move_count;
    modal.style.display = "none";
}

function resetGame(){
    timer = 0;
    num_stars = 3;
    clearTimeout(timePTR);
    document.getElementById('timer').innerHTML = 0;
   
    playGame();

    move_count = 0;
    moves.innerHTML = 0;
    matched_pairs = 0;
    starOne.style.display = "block";
    starTwo.style.display = "block";
    starThree.style.display = "block";
         
}

function playAgain(){
    resetGame();
    modal.style.display = "none";
}

function startTimer(){
    timer += 1;
    document.getElementById("timer").innerHTML = timer;
    timePTR = setTimeout(startTimer, 1000);
}


