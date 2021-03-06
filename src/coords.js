"use strict";

import {none, up, right, down, left, opposite_direction, dir_to_array} from './tools.js';

export class Coords{
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

	move_to(_x, _y) {
		this.x=_x;
		this.y=_y;
	}

	is_equal_to(_coords) {
		return this.x===_coords.x && this.y===_coords.y;
	}

	get_neighbour(_dir) {
		let res=new Coords(this.x, this.y);
		res.move(_dir);
		return res;
	}

	static from_coords(_coords) {
		return new Coords(_coords.x, _coords.y);
	}
}
