"use strict";

import {Generator_type_a} from './generator_type_a.js';
import {Coords} from './coords.js';
import {none, up, right, down, left, opposite_direction, dir_to_array} from './tools.js';

export class Generator_type_b extends Generator_type_a {
	constructor(_coords, _max_run, _min_back) {
		super(_coords);

		this.tips=[];
		this.max_run=_max_run;
		this.min_backtrack=_min_back;
		this.cur_run=0;
		this.cur_backtrack=0;
	}

	begin(_maze) {

		let coords=Coords.from_coords(this.initial_cell);
		let direction=none;

		this.stack.push(Coords.from_coords(coords));
		this.visited.add(this.calculate_coords_hash(coords, _maze));

		while(true){
			do{
				direction=this.choose_random_direction(coords, _maze);
				if(none===direction || this.cur_run >= this.max_run) {

					if(this.cur_run >= this.max_run) {
						this.tips.push(Coords.from_coords(coords));
						while(this.stack.length && this.cur_backtrack <= this.min_backtrack) {
							coords=Coords.from_coords(this.stack.pop());
							++this.cur_backtrack;
						}
					}
					else if(this.stack.length) {
						coords=Coords.from_coords(this.stack.pop());
					}

					this.cur_run=0;
					this.cur_backtrack=0;
				}
				else { 
					++this.cur_run;
					_maze.carve_exit(coords, direction);
					coords.move(direction);
					this.stack.push(Coords.from_coords(coords));
					this.visited.add(this.calculate_coords_hash(coords, _maze));
				}
			}while(this.stack.length);

			//Subsequent runs do not backtrack for X cells.
			this.min_backtrack=0;
			
			if(!this.tips.length) {
				break;
			}
			else {
				coords=Coords.from_coords(this.tips.shift());
			}
		};
	}

	//TODO...
	step(_maze) {
		throw new Error("No step available yet!");
	}
}
