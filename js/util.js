'use strict';

export function populateGrid(grid, radix, prepopulatedCells) {
	for(let i = 0; i < radix; i++)
		for(let j = 0; j < radix; j++) {
			let cellId = "#d" + i + j;
			clearStyle(cellId);
			if(prepopulatedCells[radix * i + j] === true)
				setStyle(cellId);
			$(cellId).val(grid[radix*i + j] || '');
		}
}

export function clearGrid(radix) {
	for(let i = 0; i < radix; i++)
		for(let j = 0; j < radix; j++) {
			let cellId = "#d" + i + j;
			clearStyle(cellId);
			$(cellId).val("");
		}
}

export function resetArrayItems(arr, prepopulatedCells) {
	arr.forEach(function(item, index, array) {
		if(prepopulatedCells[index] === undefined)
			array[index] = 0; 
	});
}

export function sleep(time) {
	return new Promise(resolve => setTimeout(resolve, time));
}

/*
* Get count number of random indices. Total number of indices = D or R * R
* Use: floor(random() * floor(MAX - MIN + 1)) + MIN to generate integer between MIN and MAX inclusive
* where min = 0, max = D - 1
*/
export function getRandomNumbers(count, arrayLength) {
	let x = [];
	for(let i = 0; i < count;) {
		let rand = getRandomBetweenInclusive(0, arrayLength - 1);
		if(x[rand] === undefined) {
			x[rand] = true;
			i++;
		}
	}

	return x;
}

function getRandomBetweenInclusive(min, max) {
	return Math.floor(Math.random() * Math.floor(max - min + 1)) + min;
}

function clearStyle(id) {
	$(id).prop("readonly", false);
	$(id).css("font-weight", "normal");
	$(id).css("background-color", "white");
}

function setStyle(id) {
	$(id).prop("readonly", true);
	$(id).css("font-weight", "bold");
	$(id).css("background-color", "lightgrey");
}