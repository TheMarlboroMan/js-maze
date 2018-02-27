"use strict";

import {Input} from './input.js';
import {Display} from './display.js';
import {Maze} from './maze.js';
import {Coords} from './coords.js';
import {Generator_type_a} from './generator_type_a.js';
import {Generator_type_b} from './generator_type_b.js';
import {up, right, down, left, none} from './tools.js';

class Player {
	constructor() {
		this.position=new Coords(0,0);
	}
}

export class Controller {

	constructor() {
		this.input=new Input();
		this.display=new Display();
		this.player=new Player();
		this.generator=null;
		this.maze=null;

		this.input.register(this);
		requestAnimationFrame( () => {this.draw();});
	}

	handle_keydown(code) {

		let coords=Coords.from_coords(this.player.position);
		let dir=none;

		switch(code) {
			case 37: dir=left; break; //Left
			case 38: dir=up; break; //Up
			case 39: dir=right; break; ///Right
			case 40: dir=down; break; //Down
		}
	
		if(none!==dir) {
			if(! (dir & this.maze.get_cell(coords).get_blocked_directions())) {
				coords.move(dir);
				this.player.position=coords;
			}
		}
	}

	reset_maze() {
		this.maze=new Maze(
			parseInt(document.getElementById('input_w').value, 10),
			parseInt(document.getElementById('input_h').value, 10));
		delete this.generator;
		this.generator=null;
	}

	hook_dom() {
		document.getElementById('new_grid').onclick=() => {this.reset_maze()};
		document.getElementById('generate_maze').onclick=() => {this.generate_maze()};
		document.getElementById('step').onclick=() => {this.step()};
	}

	generate_maze() {
		this.build_generator().begin(this.maze);
	}

	step() {
		if(null===this.generator) {
			this.generator=this.build_generator();
		}
		this.generator.step(this.maze);
	}

	draw() {
		this.display.clear();
		if(null!==this.maze) this.display.draw_maze(this.maze);
		if(null!==this.player) this.display.draw_player(this.player);
		if(null!==this.generator && null!==this.generator.get_step_coords()) this.display.draw_generator_head(this.generator.get_step_coords());
		requestAnimationFrame( () => {this.draw();}); 
	}

	build_generator() {

		let get_value=function(_container, _name) {
			let item=_container.querySelector('input[name="'+_name+'"]');
			if(null===item) {
				throw new Error("Undefined value "+_name+" in generator options");
			}

			return parseInt(item.value, 10);
		};

		let selection=document.getElementById('generator').value;
		let options_container=document.getElementsByName(selection).length ? document.getElementsByName(selection)[0] : null;

		switch(selection) {
			case 'type_a': {
				let 	x=get_value(options_container, 'x'), 
					y=get_value(options_container, 'y');
				return new Generator_type_a(new Coords(x, y)); 
			break;
			}
			case 'type_b': {

				let 	x=get_value(options_container, 'x'), 
					y=get_value(options_container, 'y');
				return new Generator_type_b(new Coords(x, y), get_value(options_container, 'max_run'), get_value(options_container, 'min_backtrack')); 
			break;
			}
		}
			
	}

}
