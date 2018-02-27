"use strict";

import {none, up, right, down, left, opposite_direction, dir_to_array} from './tools.js';
import {Cell} from './cell.js';

export class Maze {

	constructor(_w, _h) {
		this.width=parseInt(_w, 10);
		this.height=parseInt(_h, 10);
		this.grid=Array();

		this.initialize_grid();
	}

	initialize_grid() {
		for(let x=0; x<this.width; x++){
			this.grid.push(new Array());
			for(let y=0; y<this.height; y++) {
				let limits=none;
				if(0===x) limits|=left;		//No else, in case we want a 1x1 maze XD.
				if(x==this.width-1) limits|=right;
				if(0===y) limits|=up;
				if(y==this.height-1) limits|=down;

				this.grid[x].push(new Cell(limits));
			}
		}
	}

	//Will not check. Make sure to check before issuing call!.
	carve_exit(_coords, _exit) {
		this.get_cell(_coords.get_neighbour(_exit)).carve(opposite_direction(_exit));
		this.get_cell(_coords).carve(_exit);
	}

	//Will never throw.
	check_cell(_coords) {
		return !(_coords.x < 0 || _coords.x >= this.width || _coords.y < 0 || _coords.y >= this.height);
	}

	//Will not check, make sure to call "check_cell" before.
	get_cell(_coords) {
		return this.grid[_coords.x][_coords.y];
	}
}
