class Solver {	
	static dfs(grid, d) {//d = depth on tree
		if(d === D) {
			console.log("Solved...");
			SOLVED = true;
			printToScreen(grid);
			return;
		}
		
		if(grid[d] !== 0) {
			Solver.dfs(grid, d+1);
			return;
		}
		
		for(var i = 1; i <= R && !SOLVED; i++) {
			grid[d] = i;
			if(!Solver.canBacktrack(grid, d))
				Solver.dfs(grid, d+1);
		}
		grid[d] = 0;
	}
	
	static canBacktrack(a, k) {
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
}
