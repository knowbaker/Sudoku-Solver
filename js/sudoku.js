/*
 * References
 * Algorithms by by Robert Sedgewick and Kevin Wayne
 */
const R = 9;//4;
const D = R*R;
const S = Math.sqrt(R);

$(function() {
	$("#s1").on("click", function() {
		var board = getCellVals();
//		for(var i = 0; i < board.length; i++)
//			console.log(board[i]);
		setTimeout(function() {
			console.log(".");
		}, 3000);
		solve(board);
	});
});

function getCellVals() {
	var cellVals = [];
	for(var i = 0; i < R; i++)
		for(var j = 0; j < R; j++) {
			var x = $("#d" + i + j).val();
			if(x == "")
				x = 0;
			cellVals[R*i + j] = parseInt(x);
		}
	return cellVals;
}

function solve(board) {
	dfs(board, 0);
}

function dfs(board, d) {//d = depth on tree
	if(d === D) {
		print(board); return;
	}
	
	if(board[d] !== 0) {
		dfs(board, d+1); return;
	}
	
	for(var i = 1; i <= R; i++) {
		board[d] = i;
		if(!canBacktrack(board, d))
			dfs(board, d+1);
	}
	board[d] = 0;//cleanup
}

function canBacktrack(a, k) {
	//check elements along Y axis
	for(var i = k+R; i < a.length; i+=R)
		if(a[k] === a[i]) return true;
	for(var i = k-R; i >= 0; i-=R)
		if(a[k] === a[i]) return true;
	
	//check elements along X axis
	var LEFT = Math.floor(k / R) * R;
	var RIGHT = Math.ceil(k / R) * R;//LEFT:0, R, 2*R,...(k-1)*R; RIGHT: R-1, 2*(R-1),..., (k / R) * (R - 1) 
	for(var i = k+1; i < RIGHT; i++)
		if(a[k] === a[i]) return true;
	for(var i = k-1; i >= LEFT; i--)
		if(a[k] === a[i]) return true;
	
	//check cells in the appropriate sqrt(R) X sqrt(R) square
	//root => root index of little squares (0, 3, 6, 27, 30, 33, 54, 57, 60 are the roots in 9X9)
	var col = k % R;
	var row = Math.floor(k / R);
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

function print(board) {
	for(var i = 0; i < R; i++) {
		var line = "";
		for(var j = 0; j < R; j++) {
			line += board[R*i + j] + " ";
		}
		console.log(line);
	}
}

/*
 * 7 2 8 9 4 6 3 1 5 
   9 3 4 2 5 1 6 7 8 
   5 1 6 7 3 8 2 4 9 
   1 4 7 5 9 3 8 2 6 
   3 6 9 4 8 2 1 5 7 
   8 5 2 1 6 7 4 9 3 
   2 9 3 6 1 5 7 8 4 
   4 8 1 3 7 9 5 6 2 
   6 7 5 8 2 4 9 3 1 
*/
