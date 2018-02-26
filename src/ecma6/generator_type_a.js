import {Coords} from './coords.js';
import {none, up, right, down, left, opposite_direction, dir_to_array} from './tools.js';

export class Generator_type_a {
	constructor() {
		this.stack=[];
		this.visited=new Set();
	}

	begin(_maze) {
		//Choose first cell...
		let coords=new Coords(0,0);
		let direction=none;

		this.stack.push(new Coords(coords.x, coords.y));
		this.visited.add(this.calculate_coords_hash(coords, _maze));

		do{
			direction=this.choose_random_direction(coords, _maze);
			if(none===direction) {
				//TODO: Remind me why I cannot just coords=this.stack.pop();
				let t=this.stack.pop();
				coords.x=t.x;
				coords.y=t.y;
			}
			else { 
				_maze.carve_exit(coords, direction);
				coords.move(direction);
				this.stack.push(new Coords(coords.x, coords.y));
				this.visited.add(this.calculate_coords_hash(coords, _maze));
			}
		}while(this.stack.length);
	}

	step(_maze, _coords) {
		this.visited.add(this.calculate_coords_hash(_coords, _maze));

		let direction=none;
		direction=this.choose_random_direction(_coords, _maze);
		if(none===direction) {
			let t=this.stack.pop();
			_coords.x=t.x;
			_coords.y=t.y;
		}
		else { 
			this.stack.push(new Coords(_coords.x, _coords.y));
			_maze.carve_exit(_coords, direction);
			_coords.move(direction);
		}
	}

	choose_random_direction(_coords, _maze) {
		let directions=dir_to_array(_maze.get_cell(_coords).get_blocked_directions());
		while(directions.length){
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
