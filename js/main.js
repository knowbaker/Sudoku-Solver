/* References
 * https://stackoverflow.com/questions/19697033/styling-a-sudoku-grid/19699482#19699482
 * https://jsfiddle.net/MrPolywhirl/Lrgw7eLL/
*/
//'use strict';
import { populateGrid } from './util.js';
import { R } from './sudoku.js';

$(function () {
    var grid = [//default sample on page load
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
    
    $('#board').append(createLayout());

    populateGrid(grid, R);
});

function createLayout() {
	$("#board").append("<table class=sudoku>");
	
	for(var i = 0; i < R; i++) {
		$("table").append("<tr id='r" + i + "'>");
		for(var j = 0; j < R; j++)
			$("#r"+i).append("<td id='c" + i + j + "'><input type='text' maxlength='1' id='d" + i + j + "'</input></td>");		
	}
	
	$("table").addClass("sudoku");
}