document.querySelector("h1").innerHTML="Using the classic (with class syntax) mode";

const none=0;
const up=1;
const right=2;
const down=4;
const left=8;

function opposite_direction(_dir) {
	switch(_dir) {
		case none: 	return none; break;
		case up:	return down; break;
		case right:	return left; break;
		case down:	return up; break;
		case left:	return right; break;
		default: throw new Error("Unable to solve opposite_direction "+_dir);
	}
}

function dir_to_array(_dir) {
	let res=[];
	if(_dir & up) res.push(up);
	if(_dir & right) res.push(right);
	if(_dir & down) res.push(down);
	if(_dir & left) res.push(left);
	return res;
}

class Cell { 
	constructor(_hard) {
		this.exits=none;
		this.limits=_hard;
	}

	carve(_pos) {
		if(!(this.exits & _pos)) {
			this.exits|=_pos;
		}
	}

	is_limit(_pos) {
		return this.limits & _pos;
	}

	is_open(_pos) {
		return this.exits & _pos;
	}

	get_blocked_directions(){
		let res=this.exits^(up|right|down|left);
		return res^this.limits;
	}
}

class Coords{
	constructor(_x, _y) {
		this.x=_x;
		this.y=_y;
	}

	move(_dir) {
		switch(_dir) {
			case up: 	--this.y; break;
			case right:	++this.x; break;
			case down:	++this.y; break;
			case left:	--this.x; break;
			default: throw new Error("Unknown exit type "+_dir); break;
		}
	}

	get_neighbour(_dir) {
		let res=new Coords(this.x, this.y);
		res.move(_dir);
		return res;
	}
}

class Generator_type_a {
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

class Maze {

	constructor(_w, _h) {
		this.width=_w;
		this.height=_h;
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
