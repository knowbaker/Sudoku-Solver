/*
 * References
 * 1. Algorithms by by Robert Sedgewick and Kevin Wayne
 * 2. https://stackoverflow.com/questions/19697033/styling-a-sudoku-grid/19699482#19699482
 * 3. https://jsfiddle.net/MrPolywhirl/Lrgw7eLL/
 * 4. http://arxiv.org/abs/1201.0749
 */
//'use strict';
import * as util from './util.js';
import { dfs } from './solver.js';

const R = 9;
const D = R*R;
const S = Math.sqrt(R);
const PROPER_SUDOKU_THRESHOLD = 17;
const PCT = 0.01;
const NUM_REGEX = /[1-9]{1}/;
const ACTION = {
	MAKE: 0,
	SOLVE: 1
};

var game = {
	grid: [],
	solved: false
};
game.grid = [//default sample on page load
	7, 0, 8, 0, 0, 0, 3, 0, 0,
	0, 0, 0, 2, 0, 1, 0, 0, 0,
	5, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 4, 0, 0, 0, 0, 0, 2, 6,
	3, 0, 0, 0, 8, 0, 0, 0, 0,
	0, 0, 0, 1, 0, 0, 0, 9, 0,
	0, 9, 0, 6, 0, 0, 0, 0, 4,
	0, 0, 0, 0, 7, 0, 5, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0
];

var prepopulatedCells = [];

$(function() {
	createInitialLayout();
	
	$("#clear").on("click", function(e) {
		e.preventDefault();
		util.clearGrid(game.grid, R, prepopulatedCells);

		$("#inst").removeClass("improper");
		game.solved = false;
	});
	
	$("input[type=text]").blur(function(e) {
		if(game.solved)
			return;
		if(!e.target.value.match(NUM_REGEX)) {
			e.target.value = "";
			return;
		}
		//TODO: Add more validation
	});
	
	$("#solve").on("click", e => perform(e, ACTION.SOLVE));

	$("#make").on("click", e => perform(e, ACTION.MAKE));
});

function createInitialLayout() {
	$('#board').append(createTableLayout());

    game.grid.forEach(function(item, index, array) {
    	if(item !== 0)
    		prepopulatedCells[index] = true;
    });
    
    util.populateGrid(game.grid, R, prepopulatedCells);
}

function createTableLayout() {
	$("#board").append("<table class=sudoku>");
	
	for(let i = 0; i < R; i++) {
		$("table").append("<tr id='r" + i + "'>");
		for(let j = 0; j < R; j++)
			$("#r"+i).append("<td id='c" + i + j + "'><input type='text' maxlength='1' id='d" + i + j + "'</input></td>");		
	}
	
	$("table").addClass("sudoku");
}

function perform(e, action) {
	e.preventDefault();
	if(action === ACTION.MAKE)
		newEmptyGame();

	if("serviceWorker" in navigator) {
		var msgChan = new MessageChannel();
		msgChan.port1.onmessage = e1 => {
			if(e1.data.error)
				console.log("ERROR...");
			else {
				game.grid = e1.data;
				if(action == ACTION.MAKE) {
					prepopulatedCells = util.getRandomNumbers(PROPER_SUDOKU_THRESHOLD, D);
					util.resetArrayItems(game.grid, prepopulatedCells);
				}
				util.populateGrid(game.grid, R, prepopulatedCells);
				$("#progBar").remove();
			}
		}
		$("#prog").append("<img src='img/ajax-loader.gif' id='progBar'>");
		var message = {
			grid: game.grid,
			cmd: 0
		}
		if(action == ACTION.SOLVE)
			message.cmd = 1;

		navigator.serviceWorker.controller.postMessage(message, [msgChan.port2]);
	} else {
		$("#prog").append("<p id='progBar' style='font-size:14px;font-family:Helvetica,Arial,sans-serif'>Solving...</p>");
		util.sleep(500).then(() => {//sleep to allow the progBar to display
			solve(game.grid);
			$("#progBar").remove();
		});
	}

}

function newEmptyGame() {
	for(let i = 0; i < R; i++)
		for(let j = 0; j < R; j++)
			game.grid[i * R + j] = 0;

	game.solved = false;
}

function solve(grid) {
	dfs(grid, 0);
}

//TODO: Need more checks besides "proper Sudoku" check
function isValid(game) {
	return game.knowns >= PROPER_SUDOKU_THRESHOLD;
}