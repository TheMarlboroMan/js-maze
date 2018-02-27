"use strict";

import {none, up, right, down, left, opposite_direction, dir_to_array} from './tools.js';

export class Cell { 
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
		return res|this.limits;
	}
}
