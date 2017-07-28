/*
 * References
 * Algorithms by by Robert Sedgewick and Kevin Wayne
 */
const R = 9;//4;
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
	$("#solve").on("click", function(e) {
		e.preventDefault();
		var game = {};
		try {
			game = getGame();
		} catch(e) {
			$("#inst").addClass("improper");
			console.log(e.message);
			return;
		}
//		if(isValid(game))
			solve(game.grid);
			console.log("Done..")
	});
	
	$("#clear").on("click", function(e) {
		e.preventDefault();
		clearInput();
		$("#inst").removeClass("improper");
		SOLVED = false;
//		game = {};
	});
	
	$("input[type=text]").blur(function(e) {
		if(SOLVED)
			return;
		if(!e.target.value.match(NUM_REGEX)) {
			e.target.value = "";
			return;
		}
		//TODO: Add validation
	});
});

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
	dfs(grid, 0);
}

function dfs(grid, d) {//d = depth on tree
	if(d === D) {
		console.log("Solved...");
		SOLVED = true;
//		updateProgress(D);
		printToScreen(grid);
		return;
	}
	
	if(grid[d] !== 0) {
		dfs(grid, d+1);
		return;
	}
	
	for(var i = 1; i <= R && !SOLVED; i++) {
		grid[d] = i;
		if(!canBacktrack(grid, d))
			dfs(grid, d+1);
	}
	grid[d] = 0;
}

function canBacktrack(a, k) {
	//check elements along Y axis
	for(var i = k+R; i < a.length; i+=R)
		if(a[k] === a[i])
			return true;
	for(var i = k-R; i >= 0; i-=R)
		if(a[k] === a[i])
			return true;
	
	//check elements along X axis
	let p = k / R;
	var LEFT = Math.floor(p) * R;
	var RIGHT = Math.ceil(p) * R;//LEFT:0, R, 2*R,...(k-1)*R; RIGHT: R-1, 2*(R-1),..., (k / R) * (R - 1) 
	for(var i = k+1; i < RIGHT; i++)
		if(a[k] === a[i])
			return true;
	for(var i = k-1; i >= LEFT; i--)
		if(a[k] === a[i])
			return true;
	
	//check cells in the appropriate sqrt(R) X sqrt(R) square
	//root => root index of little squares (0, 3, 6, 27, 30, 33, 54, 57, 60 are the roots in 9X9)
	var col = k % R;
	var row = Math.floor(p);
	var colsAwayFromRoot = col % S;
	var rowsAwayFromRoot = row % S;
	var root = k - colsAwayFromRoot - (R * rowsAwayFromRoot);	
	var count = 0;
	for(var i = root; count < S; i += R) {
		for(var j = i; j < i + S; j++)
			if(j !== k && a[k] === a[j])
				return true;
		count++;
	}		
	return false;
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

//TODO: Finish me
function isValid(game) {
	return game.knowns >= 17;
}