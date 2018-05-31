/*
 * References
 * Algorithms by by Robert Sedgewick and Kevin Wayne
 */
//'use strict';
import * as util from './util.js';
import { dfs } from './solver.js';

export const R = 9;
const D = R*R;
const S = Math.sqrt(R);
const PROPER_SUDOKU_THRESHOLD = 17;
const PCT = 0.01;
const NUM_REGEX = /[1-9]{1}/;
const ACTION = {
	MAKE: "make",
	SOLVE: "solve"
}

var SOLVED = false;

$(function() {
	SOLVED = false;
	
	$("#clear").on("click", function(e) {
		e.preventDefault();
		util.clearGrid(R);

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
	
	$("#solve").on("click", e => work(e, ACTION.SOLVE));

	$("#make").on("click", e => work(e, ACTION.MAKE));
});

function work(e, action) {
	e.preventDefault();
	var game = loadGame(action);//TODO: after clear throws error of improper game
	if("serviceWorker" in navigator) {
		var msgChan = new MessageChannel();
		msgChan.port1.onmessage = e1 => {
			if(e1.data.error)
				console.log("ERROR...");
			else {
				if(action == ACTION.MAKE) {
					let randomlyPopulatedIndices = util.getRandomNumbers(PROPER_SUDOKU_THRESHOLD, D);
					util.resetArrayItems(e1.data, randomlyPopulatedIndices);
				}
				util.populateGrid(e1.data, R);
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

function loadGame(action) {
	if(action === ACTION.MAKE)
		return newEmptyGame();

	var game = {};
	try {
		game = getExistingGame();
	} catch(e) {
		$("#inst").removeClass("improper");
		$("#inst").addClass("improper");
		console.log(e.message);
		throw e;
	}
	return game;
}

function newEmptyGame() {
	let game = {
		grid:[],
		solved: false
	};
	let grid = [];
	for(let i = 0; i < R; i++)
		for(let j = 0; j < R; j++)
			game.grid[i * R + j] = 0;

	return game;
}

function getExistingGame() {
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

//TODO: Need more checks besides "proper Sudoku" check
function isValid(game) {
	return game.knowns >= PROPER_SUDOKU_THRESHOLD;
}