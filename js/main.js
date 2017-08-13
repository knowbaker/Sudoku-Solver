/* References
 * https://stackoverflow.com/questions/19697033/styling-a-sudoku-grid/19699482#19699482
 * https://jsfiddle.net/MrPolywhirl/Lrgw7eLL/
*/

$(function () {
	console.log("Main...");
//    var data = [//sample
//    	7, 0, 8, 0, 0, 0, 3, 0, 0,
//		0, 0, 0, 2, 0, 1, 0, 0, 0,
//		5, 0, 0, 0, 0, 0, 0, 0, 0,
//		0, 4, 0, 0, 0, 0, 0, 2, 6,
//		3, 0, 0, 0, 8, 0, 0, 0, 0,
//		0, 0, 0, 1, 0, 0, 0, 9, 0,
//		0, 9, 0, 6, 0, 0, 0, 0, 4,
//		0, 0, 0, 0, 7, 0, 5, 0, 0,
//		0, 0, 0, 0, 0, 0, 0, 0, 0
//	];
    
	var data = [
		0,0,0, 0,0,0, 0,0,1,
		0,0,0, 0,0,0, 0,2,3,
		0,0,4, 0,0,5, 0,0,0,
		0,0,0, 1,0,0, 0,0,0,
		0,0,0, 0,3,0, 6,0,0,
		0,0,7, 0,0,0, 5,8,0,
		0,0,0, 0,6,7, 0,0,0,
		0,1,0, 0,0,4, 0,0,0,
		5,2,0, 0,0,0, 0,0,0
	];
//    var data = [
//    	0,0,0, 0,0,0, 0,1,0,
//    	0,0,0, 0,0,2, 0,0,3,
//    	0,0,0, 4,0,0, 0,0,0,
//    	0,0,0, 0,0,0, 5,0,0,
//    	4,0,1, 6,0,0, 0,0,0,
//    	0,0,7, 1,0,0, 0,0,0,
//    	0,5,0, 0,0,0, 2,0,0,
//    	0,0,0, 0,8,0, 0,4,0,
//    	0,3,0, 9,1,0, 0,0,0
//    ];
    
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