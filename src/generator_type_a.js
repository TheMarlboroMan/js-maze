"use strict";

import {Coords} from './coords.js';
import {none, up, right, down, left, opposite_direction, dir_to_array} from './tools.js';

export class Generator_type_a {
	constructor(_coords) {
		this.stack=[];
		this.visited=new Set();
		this.initial_cell=Coords.from_coords(_coords);
		this.step_coords=null;
	}

	begin(_maze) {

		//TODO: Can we just have this function call the other???.
		//TODO: The two functions have SLIGHTLY different shapes...

		//Choose first cell...
		let coords=Coords.from_coords(this.initial_cell);
		let direction=none;

		this.stack.push(Coords.from_coords(coords));
		this.visited.add(this.calculate_coords_hash(coords, _maze));

		do{
			direction=this.choose_random_direction(coords, _maze);
			if(none===direction) {
				coords=Coords.from_coords(this.stack.pop());
			}
			else { 
				_maze.carve_exit(coords, direction);
				coords.move(direction);
				this.stack.push(Coords.from_coords(coords));
				this.visited.add(this.calculate_coords_hash(coords, _maze));
			}
		}while(this.stack.length);
	}

	step(_maze) {
		if(null===this.step_coords) {
			console.log("Generating new step coords...");
			this.step_coords=Coords.from_coords(this.initial_cell);
		}

		this.visited.add(this.calculate_coords_hash(this.step_coords, _maze));

		let direction=none;
		direction=this.choose_random_direction(this.step_coords, _maze);
		if(none===direction) {
			if(!this.stack.length) {
				delete this.step_coords;
				this.step_coords=null;
				alert('Maze completed');
			}
			else {
				this.step_coords=Coords.from_coords(this.stack.pop());
			}
		}
		else { 
			this.stack.push(Coords.from_coords(this.step_coords));
			_maze.carve_exit(this.step_coords, direction);
			this.step_coords.move(direction);
		}
	}

	get_step_coords() {
		return this.step_coords;
	}

	choose_random_direction(_coords, _maze) {
		let directions=dir_to_array(_maze.get_cell(_coords).get_blocked_directions());
		while(directions.length){
			//TODO Isn't math random generating a floating point number???
			let res=directions.splice(Math.random() * directions.length, 1)[0];
			if(!this.check_free_direction(_coords, _maze, res)) continue;
			return res;
		};
		return none;
	}

	//!Checks if _dir is free en _maze at _coords.
	check_free_direction(_coords, _maze, _dir) {
		let cell=_maze.get_cell(_coords);
		if(cell.is_open(_dir)) {
			return false;	//If open, we already visited.
		}
		if(cell.is_limit(_dir)) {
			return false;	//If hard limits are found, we can't carve.
		}

		//We still need to check the cell on the other side: we may have carved there already. 
		//However, we don't need to check the maze for that: a simple hash search will do.

		if(this.visited.has(this.calculate_coords_hash(_coords.get_neighbour(_dir), _maze))) {
			return false;
		}
		return true;
	}

	calculate_coords_hash(_coord, _maze) {
		return (_coord.y*_maze.width) + _coord.x;
	}
}
