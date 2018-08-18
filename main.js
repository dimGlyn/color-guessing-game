var currentDifficulty = 6;
var squares = document.querySelectorAll(".square");
var colors = new Array();
var correct;
var colorDisplay = document.querySelector("#colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init(); 

function init(){
	//Mode buttons event listeners
	setupModeButtons();

	//resetButton event listener
	resetButton.addEventListener("click", function(){
		reset(currentDifficulty);
	});

	//addind initial colors to squares and event listeners
	setupInitialSquares();
	
	reset(currentDifficulty);
}

function setupModeButtons(){
	for (var i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener("click",function(){
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");
			//figure out the difficulty
			currentDifficulty = (this==modeButtons[0]) ? 3 : 6;
			//Show or hide the squares according to the current difficulty
			for (var i = 3; i < squares.length; i++) {
				(currentDifficulty==3) ? squares[i].classList.add("hidden") : squares[i].classList.remove("hidden");;
			}
			reset(currentDifficulty);
		});
	}
}

function setupInitialSquares(){
	for (var j = 0; j < squares.length; j++) {
		squares[j].addEventListener("click", function(){
		var currentColor = this.style.backgroundColor;
			if(this == correct){
				changeColors(currentColor);
				messageDisplay.textContent = "Correct!";
				resetButton.textContent = "Play Again?";
			}else{
				messageDisplay.textContent = "Try Again :(";
				this.style.backgroundColor ="#232323";
			}
		});
	}
}

function reset(sq){
	//reset colors, squares and winning square
	colors = [];
	for (var i = 0; i < sq; i++) {
		colors[i] = getRandomColor();
		squares[i].style.backgroundColor = colors[i];
	}
	correct = getWinningSquare(sq);
	//reset color display and h1 color
	colorDisplay.innerHTML = correct.style.backgroundColor;
	h1.style.backgroundColor = "steelblue";
	//reset message
	messageDisplay.textContent = "";
	resetButton.textContent = "NEW COLORS";
}

function getRandomColor(){
	return "rgb("+Math.floor(Math.random()*256)+", "+
		Math.floor(Math.random()*256)+", "+
		Math.floor(Math.random()*256)+")";
}

function getWinningSquare(i){
	return squares[Math.floor(Math.random()*i)];
}

function changeColors(color){
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = color;
	}
	h1.style.backgroundColor = color;
}
