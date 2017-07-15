$(function() {
	for(var i = 0; i < 9; i++) {
		$("#board").append("<div class='col-sm-9 col-sm-offset-2' id='row" + i + "'>");
		for(var j = 0; j < 9; j++)
			$("#row"+i).append("<div class='cell col-sm-1 text-center'><input type='text' value='1' class='num-input' maxlength='1' id='" + "c" + i + j + "'></div>");
	}
});