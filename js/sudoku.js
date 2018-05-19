/*
 * References
 * Algorithms by by Robert Sedgewick and Kevin Wayne
 */
const R = 9;
const D = R*R;
const S = Math.sqrt(R);
const PCT = 0.01;
var SOLVED = false;
const NUM_REGEX = /[1-9]{1}/;
var PROGRESS = function() {//TODO: Might be useless due to high CPU utilization by dfs
	var arr = [];
	for(let i = 0; i <= D; i++)
		arr[i] = Math.floor((i/D) * 100);
	return arr;
}();
	
$(function() {
	SOLVED = false;
	
	$("#clear").on("click", function(e) {
		e.preventDefault();
		clearInput();
		$("#inst").removeClass("improper");
		SOLVED = false;
	});
	
	$("input[type=text]").blur(function(e) {
		if(SOLVED)
			return;
		if(!e.target.value.match(NUM_REGEX)) {
			e.target.value = "";
			return;
		}
		//TODO: Add more validation
	});
	
	$("#solve").on("click", e => {
		e.preventDefault();
		var game = loadGame();
		if("serviceWorker" in navigator) {
			var msgChan = new MessageChannel();
			msgChan.port1.onmessage = e1 => {
				if(e1.data.error)
					console.log("ERROR...");
				else {
					printToScreen(e1.data);
					$("#progBar").remove();
				}
			}
			$("#prog").append("<img src='img/ajax-loader.gif' id='progBar'>");
			navigator.serviceWorker.controller.postMessage(game.grid, [msgChan.port2]);
		} else {//fall back to main thread if no service worker
			$("#prog").append("<p id='progBar' style='font-size:14px;font-family:Helvetica,Arial,sans-serif'>Solving...</p>");
			sleep(500).then(() => {//sleep to allow the progBar to display
				solve(game.grid);
				$("#progBar").remove();
			});
		}
	});
});

function print(grid) {
	for(let i = 0; i < R; i++) {
		let line = "";
		for(let j = 0; j < R; j++) 
			line += grid[i*R + j] + " ";
		console.log(line);
	}
}

function loadGame() {
	var game = {};
	try {
		game = getGame();
	} catch(e) {
		$("#inst").removeClass("improper");
		$("#inst").addClass("improper");
		console.log(e.message);
		throw e;
	}
	return game;
}

function getGame() {
	var game = {};
	var grid = [];
	var knowns = 0;
	for(var i = 0; i < R; i++)
		for(var j = 0; j < R; j++) {
			var x = $("#d" + i + j).val();
			var trimmed = x.trim();
			if(trimmed === "")
				x = 0;
			else {
				if(trimmed.match(NUM_REGEX)) {
					x = trimmed;
					knowns++;
				} else
					throw new Error("Input not a digit between 1 and 9");
			}
			grid[R*i + j] = parseInt(x);
		}
	
	if(knowns < 17)
		throw new Error("Improper Sudoku");
	
	game.grid = grid;
	game.solved = false;
	game.knowns = knowns;
	return game;
}

function solve(grid) {
	Solver.dfs(grid, 0);
}

function printToScreen(grid) {
	for(var i = 0; i < R; i++)
		for(var j = 0; j < R; j++)
			$("#d" + i + j).val(grid[R*i + j]);
}

function clearInput() {
	for(var i = 0; i < R; i++)
		for(var j = 0; j < R; j++)
			$("#d" + i + j).val("");
}

function sleep(time) {
	return new Promise(resolve => setTimeout(resolve, time));
}

//TODO: Need more checks besides "proper Sudoku" check
function isValid(game) {
	return game.knowns >= 17;
}