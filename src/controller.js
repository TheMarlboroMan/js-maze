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

class Bonus {
	constructor(_x, _y) {
		this.position=new Coords(_x,_y);
	}
}

export class Controller {

	constructor() {
		this.input=new Input();
		this.display=new Display();
		this.player=new Player();
		this.bonus=Array();
		this.generator=null;
		this.maze=null;

		this.input.register(this);
		requestAnimationFrame( () => {this.draw();});
	}

	handle_keydown(code) {

		let coords=Coords.from_coords(this.player.position);
		let dir=none;

		//TODO: Enable view panning too.

		switch(code) {
			case 37: dir=left; break; //Left
			case 38: dir=up; break; //Up
			case 39: dir=right; break; ///Right
			case 40: dir=down; break; //Down
		}

		//TODO: Center the view????
	
		if(none!==dir) {
			if(! (dir & this.maze.get_cell(coords).get_blocked_directions())) {
				coords.move(dir);
				this.player.position=coords;

				let total_bonus=this.bonus.length;

				if(total_bonus) {
					this.bonus=this.bonus.filter( (item) => {
						return !item.position.is_equal_to(this.player.position);
					});

					if(this.bonus.length !== total_bonus) {
						console.log("caught ", total_bonus-this.bonus.length);
						if(!this.bonus.length) {
							alert("Well done!!!");
						}
					}
					
				}
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
		let g=this.build_generator();
		g.begin(this.maze);
		this.player.position=Coords.from_coords(g.initial_cell);
		this.generate_bonuses();
	}

	generate_bonuses() {
		let get_coord=function(min, max) {
			return Math.floor(Math.random() * (max - min)) + min;
		};

		//This could actually end in an infinite loop if there are more bonuses than w x h.
		for(let i=0; i < parseInt(document.getElementById('input_bonus').value, 10);) {
			let 	x=get_coord(0, this.maze.width), 
				y=get_coord(0, this.maze.height),
				repeated=false;

			this.bonus.forEach( (item) => {
				if(item.position.x == x && item.position.y == y) {
					repeated=true;
				}
			})

			if(!repeated) {
				i++;
				this.bonus.push(new Bonus(x, y));
			}
		}
	}

	step() {
		if(null===this.generator) {
			this.generator=this.build_generator();
		}
		this.generator.step(this.maze);
	}

	draw() {
		this.display.clear();
		if(null!==this.maze) {
			this.display.draw_maze(this.maze);
		}

		if(null!==this.player) {
			this.display.draw_player(this.player);
		}

		if(this.bonus.length) {
			this.bonus.forEach( (item) => {this.display.draw_bonus(item);});
		}

		if(null!==this.generator && null!==this.generator.get_step_coords()) {
			this.display.draw_generator_head(this.generator.get_step_coords());
		}

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
