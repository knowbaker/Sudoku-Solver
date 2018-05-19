const R = 9;
const D = R*R;
const S = Math.sqrt(R);
const PCT = 0.01;
const NUM_REGEX = /[1-9]{1}/;

self.addEventListener("install", e => {
	console.log("Installing...");
});

self.addEventListener("message", e => {
	var grid = e.data;
	var solvedGrid = [];
	solve(grid, solvedGrid);
	e.ports[0].postMessage(solvedGrid);
});

function solve(grid, solvedGrid) {
	var ref = {status: false};
	dfs(grid, 0, ref, solvedGrid);
	console.log(solvedGrid.length);
}

function dfs(grid, d, ref, solvedGrid) {//d = depth on tree
	if(d === D) {
		ref.status = true;
		deepCopy(grid, solvedGrid);
		return;
	}
	
	if(grid[d] !== 0) {
		dfs(grid, d+1, ref, solvedGrid);
		return;
	}
	
	for(var i = 1; i <= R && !ref.status; i++) {
		grid[d] = i;
		if(!canBacktrack(grid, d))
			dfs(grid, d+1, ref, solvedGrid);
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

function deepCopy(grid1, grid2) {
	for(let i = 0; i < grid1.length; i++)
		grid2[i] = grid1[i];
}