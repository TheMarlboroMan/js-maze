"use strict";

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

	clear() {
		this.context.clearRect(0, 0, this.display.width, this.display.height);
	}

	draw_maze(_maze) {
		let draw_cell=(_cell, _coords)=>{
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
		};

		this.setup_draw('#000', 'none');
		let coords=new Coords(0,0);
		for(let x=0; x<_maze.width; x++) {
			for(let y=0; y<_maze.height; y++) {
				coords.x=x;
				coords.y=y;
				draw_cell(_maze.get_cell(coords), coords);
			}
		}
	}
	

	draw_generator_head(_coords) {
		this.setup_draw('#0f0', '#0f0');
		this.grid_circle(_coords.x, _coords.y);
	}

	draw_player(_player) {
		this.setup_draw('#f00', '#f00');
		this.grid_circle(_player.position.x, _player.position.y);
	}

	//TODO: These might go in a separate thing
	//TODO: Healthy defaults?
	setup_draw(_stroke, _fill) {
		if(undefined!==_stroke) this.context.strokeStyle=_stroke;
		if(undefined!==_fill) this.context.fillStyle=_fill;
	}

	grid_line(_p1x, _p1y, _p2x, _p2y) {
		this.context.beginPath();
		this.context.moveTo( (_p1x+this.position.x) * unit, (_p1y+this.position.y) * unit);
		this.context.lineTo( (_p2x+this.position.x) * unit, (_p2y+this.position.y) * unit);
		this.context.stroke();
	}

	grid_circle(_cx, _cy) {
		let half_unit=unit/2;
		let radius=unit/4;
		this.context.beginPath();
		this.context.arc( (_cx*unit)+half_unit, (_cy*unit)+half_unit, radius, 0,  2 * Math.PI, false);
		this.context.stroke();
	}
}
