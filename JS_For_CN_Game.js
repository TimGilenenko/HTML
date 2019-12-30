
var IMAGE_TRANSP;
var IMAGE_CROSS;
var IMAGE_ZERO;
var SYMBOL_CROSS;
var SYMBOL_ZERO;
var flagEqual;
var SIZE;
var matrix;
var nextSymbol;
var gameIsOver = false;

function init() {
	SIZE = 3;
	IMAGE_TRANSP = "images\\transp.png";
	IMAGE_CROSS = "images\\cross.png";
	IMAGE_ZERO = "images\\zero.png";
	SYMBOL_CROSS = "X";
	SYMBOL_ZERO = "0";
	
	matrix = new Array(SIZE);
	for (var i = 0; i <= SIZE-1; i++) { 
		matrix[i] = new Array(SIZE);
	}
	
	nextSymbol = SYMBOL_CROSS;
}

function showModelState() {
	console.log("=================================");
	
	for (var aRow = 0; aRow <= SIZE-1; aRow++) { 
		console.log("-----");
		strRow = "";
		for (var aCol = 0; aCol <= SIZE-1; aCol++) { 
			currentValue = matrix[aRow][aCol];
			if (strRow) {
				strRow = strRow + "|";
			}
			if (currentValue) {
				strRow = strRow + currentValue;
			} else {
				strRow = strRow + " ";
			}
		}
		console.log(strRow);
	}
	console.log("-----");
}

function imageForSymbol(symbol) {
	var res = "";
	
	if (symbol == SYMBOL_CROSS) {
		res = IMAGE_CROSS;
	} else if (symbol == SYMBOL_ZERO) {
		res = IMAGE_ZERO;
	} else {
		res = IMAGE_TRANSP;
	}
	
	return res;
}

function updateView() {
	for (var aRow = 0; aRow <= SIZE-1; aRow++) { 
		for (var aCol = 0; aCol <= SIZE-1; aCol++) { 
			cellImage = document.getElementById("r"+aRow+"c"+aCol);
			
			correctSrc = imageForSymbol(matrix[aRow][aCol]);
			if (cellImage.src != correctSrc) {
				cellImage.src = correctSrc;
			}
		}
	}
}

function checkWinner() {
	
	for (aRow = 0; aRow <= SIZE - 1; aRow++) { 
	
		currentValue = matrix[aRow][0];
		
		if (!currentValue) {
			continue;
		} 
		
		flagEqual = true;
		
		for (aCol = 0; aCol <= SIZE - 1 - 1; aCol++) { 
			if (matrix[aRow][aCol] !== matrix[aRow][aCol + 1]) {
				flagEqual = false;
				break;
			}
		}
		
		if (flagEqual) {
			return currentValue;
		} 
	}
	
	for (aCol = 0; aCol <= SIZE - 1; aCol++) { 
		
		currentValue = matrix[0][aCol];
		
		if (!currentValue) {
			continue;
		} 
		
		flagEqual = true;
		
		for (aRow = 0; aRow <= SIZE - 1 - 1; aRow++) { 
			if (matrix[aRow][aCol] !== matrix[aRow + 1][aCol]) {
				flagEqual = false;
				break;
			}
		}
		
		if (flagEqual) {
			return currentValue;
		} 
	}
	
	currentValue = matrix[0][0];
	
	if (currentValue) {
		
		flagEqual = true;
		
		for (var i =0;i <= SIZE - 1 - 1; i++) {
			if( matrix[i][i] !== matrix[i + 1][i + 1]){
				flagEqual = false;
				break;
			}
		}
		
		if (flagEqual) {
			return currentValue;
		}  
	}
	
	aRow = 0;
	aCol = SIZE - 1;
	
	currentValue = matrix[aRow][aCol];
	if (currentValue) {
		
		flagEqual = true;
		
		while (aRow <= SIZE - 1 - 1) {
			if( matrix[aRow][aCol] !== matrix[aRow + 1][aCol - 1]){
				flagEqual = false;
				break;
			}
			
			aRow++;
			aCol--;
		}
		
		if (flagEqual) {
			return currentValue;
		}  
	}
	
	return "";	
}

function clicked(aRow, aCol) {
	
	if(gameIsOver){
		alert("The game is over!!!");
		return;
	}
	
	currentValue = matrix[aRow][aCol];
	if (currentValue) {
		alert("The cell is not empty!");
		return;
	}
	
	matrix[aRow][aCol] = nextSymbol;
	
	if (nextSymbol == SYMBOL_CROSS) { 
		nextSymbol = SYMBOL_ZERO; 
	} else {
		nextSymbol = SYMBOL_CROSS; 
	}
	
	updateView();
	
	var winnerIs = checkWinner();
	if(winnerIs != "") {
		alert("The winner is" +" "+winnerIs);
		gameIsOver = true;
	}
	
	
	//showModelState();
}