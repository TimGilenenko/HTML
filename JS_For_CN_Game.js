
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

var cell4StrikeOutRows;
var cell4StrikeOutCols;
var StrikeSymbol;


function drawMainTable() {
	var strTable = "";
	for (var aRow = 0; aRow <= SIZE-1; aRow++) { 
		strTable = strTable + "<tr>";
		
		for (var aCol = 0; aCol <= SIZE-1; aCol++) {
			strTable = strTable + "\
			<td width=\"200px\" height=\"200px\">\
				<a href=\"\" onclick=\"clicked("+aRow+", "+aCol+"); return false;\">\
					<div id=\"div_r"+aRow+"c"+aCol+"\" clas=\"div_Cell\">\
					<img id=\"r"+aRow+"c"+aCol+"\" src=\"images\\transp.png\" width=\"200px\" height=\"200px\" border=\"0\"/>\
					</div>\
				</a>\
			</td>\
			";
		}
		strTable = strTable + "</tr>";
	}

	eltMainTable = document.getElementById("mainTable");
	eltMainTable.innerHTML = "\
	<table border=\"1\"  align=\"center\" cellpadding=\"0\">\
	"+strTable+"\
	</table>\
	";
}

function init() {
	SIZE = Number.parseInt(document.getElementById("number").value);
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
	
	drawMainTable();
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
	
	StrikeSymbol = "horizontal"
	for (aRow = 0; aRow <= SIZE - 1; aRow++) { 
	
		currentValue = matrix[aRow][0];
		
		if (!currentValue) {
			continue;
		} 
		
		flagEqual = true;
		
		iNum = 0;
		cell4StrikeOutRows = new array(SIZE);
		cell4StrikeOutCols = new array(SIZE);
		cell4StrikeOutRows[iNum] = aRow;
		cell4StrikeOutCols[iNum] = 0;
		iNum++;
		
		
		for (aCol = 0; aCol <= SIZE - 1 - 1; aCol++) { 
			if (matrix[aRow][aCol] !== matrix[aRow][aCol + 1]) {
				flagEqual = false;
				break;
			} else {
				cell4StrikeOutRows[iNum] = aRow;
				cell4StrikeOutCols[iNum] = aCol + 1;
				iNum++;
			}
		}
		
		if (flagEqual) {
			return currentValue;
		} 
	}
	
	StrikeSymbol = "vertical"
	for (aCol = 0; aCol <= SIZE - 1; aCol++) { 
		
		currentValue = matrix[0][aCol];
		
		if (!currentValue) {
			continue;
		} 
		
		flagEqual = true;
		
		iNum = 0;
		cell4StrikeOutRows = new array(SIZE);
		cell4StrikeOutCols = new array(SIZE);
		cell4StrikeOutRows[iNum] = 0;
		cell4StrikeOutCols[iNum] = aCol;
		iNum++;
		
		for (aRow = 0; aRow <= SIZE - 1 - 1; aRow++) { 
			if (matrix[aRow][aCol] !== matrix[aRow + 1][aCol]) {
				flagEqual = false;
				break;
			} else {
				cell4StrikeOutRows[iNum] = aRow + 1;
				cell4StrikeOutCols[iNum] = aCol;
				iNum++;
			}
		}
		
		if (flagEqual) {
			return currentValue;
		} 
	}
	
	StrikeSymbol = "left"
	currentValue = matrix[0][0];
	
	if (currentValue) {
		
		flagEqual = true;
		
		iNum = 0;
		cell4StrikeOutRows = new array(SIZE);
		cell4StrikeOutCols = new array(SIZE);
		cell4StrikeOutRows[iNum] = 0;
		cell4StrikeOutCols[iNum] = 0;
		iNum++;
		
		for (var i =0;i <= SIZE - 1 - 1; i++) {
			if( matrix[i][i] !== matrix[i + 1][i + 1]){
				flagEqual = false;
				break;
			} else {
				cell4StrikeOutRows[iNum] = i + 1;
				cell4StrikeOutCols[iNum] = i + 1;
				iNum++;
			}
		}
		
		if (flagEqual) {
			return currentValue;
		}  
	}
	
	aRow = 0;
	aCol = SIZE - 1;
	StrikeSymbol = "right"
	
	currentValue = matrix[aRow][aCol];
	if (currentValue) {
		
		flagEqual = true;
		
		iNum = 0;
		cell4StrikeOutRows = new array(SIZE);
		cell4StrikeOutCols = new array(SIZE);
		cell4StrikeOutRows[iNum] = aRow;
		cell4StrikeOutCols[iNum] = aCol;
		iNum++;
		
		while (aRow <= SIZE - 1 - 1) {
			if( matrix[aRow][aCol] !== matrix[aRow + 1][aCol - 1]){
				flagEqual = false;
				break;
			} else {
				cell4StrikeOutRows[iNum] = aRow + 1;
				cell4StrikeOutCols[iNum] = aCol - 1;
				iNum++;
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

function strikeOutCells() {
	for (var i =0;i <= SIZE - 1; i++) {
		elt = document.getElementById("div_r"+cell4StrikeOutRows[i]+"c"+cell4StrikeOutCols[i]);
		elt.innerHTML = elt.innerHTML + "<img src=\"images\\"+StrikeSymbol+".png\" class=\"upper\">";
	}
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
	
	strikeOutCells();
	
	//showModelState();
}