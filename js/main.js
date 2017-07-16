/*References
 * https://stackoverflow.com/questions/19697033/styling-a-sudoku-grid/19699482#19699482
 * https://jsfiddle.net/MrPolywhirl/Lrgw7eLL/
*/
$(document).ready(function () {
    var data = [
        1, 0, 3, 6, 0, 4, 7, 0, 9, // 0x0
        0, 2, 0, 0, 9, 0, 0, 1, 0, // 0x1
        7, 0, 0, 0, 0, 0, 0, 0, 6, // 0x2
        2, 0, 4, 0, 3, 0, 9, 0, 8, // 1x0
        0, 0, 0, 0, 0, 0, 0, 0, 0, // 1x1
        5, 0, 0, 9, 0, 7, 0, 0, 1, // 1x2
        6, 0, 0, 0, 5, 0, 0, 0, 2, // 2x0
        0, 0, 0, 0, 7, 0, 0, 0, 0, // 2x1
        9, 0, 0, 8, 0, 2, 0, 0, 5  // 2x2
    ];

    $('#board').append(generateSudokuGrid3());

    $('table[class^="sudoku"]').each(function (index, grid) {
        populateGrid($(grid), data);
    });
});

function populateGrid(grid, data) {
    grid.find('input').each(function (index, input) {
        $(input).val(data[index] || '');
    });
}

function generateSudokuGrid3() {
	$("#board").append("<table class=sudoku>");
	
	for(var i = 0; i < 9; i++) {
		$("table").append("<tr id='r" + i + "'>");
		for(var j = 0; j < 9; j++)
			$("#r"+i).append("<td id='c" + i + j + "'><input type='text'></input></td>");
		
	}
	
	$("table").addClass("sudoku");
}

/* Second Method from references above - for reference only
function generateSudokuGrid2(data) {
    return $('<table>').append(multiPush(9, function () {
        return $('<tr>').append(multiPush(9, function () {
            return $('<td>').append(multiPush(1, function() {
            	return $("<input type='text'>");
            }));
        }));
    })).addClass('sudoku2');
}

function multiPush(count, func, scope) {
    var arr = [];
    for (var i = 0; i < count; i++) {
        arr.push(func.call(scope, i));
    }
    return arr;
}
*/