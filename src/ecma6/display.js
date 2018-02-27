import {Maze} from './maze.js';
import {Cell} from './cell.js';
import {Coords} from './coords.js';
import {up, right, down, left} from './tools.js';

const unit=10;

export class Display {

	constructor() {
		this.display=document.getElementById('display');
		this.display.width=300;
		this.display.height=300;
		this.context=display.getContext('2d');

		this.position={x: 0, y:0};
	}

	handle_keydown(code) {
		switch(code) {
			case 37: --this.position.x; break; //Left
			case 38: --this.position.y; break; //Up
			case 39: ++this.position.x; break; ///Right
			case 40: ++this.position.y; break; //Down
		}

		//TODO: No refresh, nothing is seen. 
		//TODO: No maze, no refresh.
		//TODO: Refresh loop should be registered, and shit.
	}

	refresh(_maze) {
		this.context.clearRect(0, 0, this.display.width, this.display.height);
		this.context.strokeStyle='#000';
		let coords=new Coords(0,0);
		for(let x=0; x<_maze.width; x++) {
			for(let y=0; y<_maze.height; y++) {
				coords.x=x;
				coords.y=y;
				this.draw_cell(_maze.get_cell(coords), coords);
			}
		}

		console.log("Refresh done");
	}

	draw_cell(_cell, _coords) {

		let blocked=_cell.get_blocked_directions();

		if(blocked & up) {
			this.grid_line(_coords.x, _coords.y, _coords.x+1, _coords.y);
		}
		if(blocked & right) {
			this.grid_line( _coords.x+1, _coords.y, _coords.x+1, _coords.y+1);
		}
		if(blocked & down) {
			this.grid_line( _coords.x, _coords.y+1, _coords.x+1, _coords.y+1);
		}
		if(blocked & left) {
			this.grid_line( _coords.x, _coords.y, _coords.x, _coords.y+1);
		}
	}

	grid_line(p1x, p1y, p2x, p2y) {
		this.context.beginPath();
		this.context.moveTo( (p1x+this.position.x) * unit, (p1y+this.position.y) * unit);
		this.context.lineTo( (p2x+this.position.x) * unit, (p2y+this.position.y) * unit);
		this.context.stroke();
	}
}
