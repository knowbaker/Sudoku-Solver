/* References
 * https://stackoverflow.com/questions/19697033/styling-a-sudoku-grid/19699482#19699482
 * https://jsfiddle.net/MrPolywhirl/Lrgw7eLL/
*/

$(function () {
    var data = [
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
	/*
	2 3 1 4 
	4 1 3 2 
	1 2 4 3 
	3 4 2 1
	*/ 
//    var data = [
//			2, 0, 1, 0,
//			0, 1, 0, 2,
//			1, 0, 0, 0,
//			0, 4, 0, 0
//	];

    $('#board').append(generateSudokuGrid());

    $('table[class^="sudoku"]').each(function (index, grid) {
        populateGrid($(grid), data);
    });
});

function populateGrid(grid, data) {
    grid.find('input').each(function (index, input) {
        $(input).val(data[index] || '');
    });
}

function generateSudokuGrid() {
	$("#board").append("<table class=sudoku>");
	
	for(var i = 0; i < 9; i++) {
		$("table").append("<tr id='r" + i + "'>");
		for(var j = 0; j < 9; j++)
			$("#r"+i).append("<td id='c" + i + j + "'><input type='text' maxlength='1' id='d" + i + j + "'</input></td>");
		
	}
	
	$("table").addClass("sudoku");
}