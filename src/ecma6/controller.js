import {Input} from './input.js';
import {Display} from './display.js';
import {Maze} from './maze.js';
import {Coords} from './coords.js';
import {Generator_type_a} from './generator_type_a.js';
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
		this.generator=new Generator_type_a();
		this.player=new Player();
		this.maze=null;
		this.input.register(this);
	}

	handle_keydown(code) {

		let coords=new Coords(this.player.position.x, this.player.position.y);
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

	start() {
		this.reset_maze();
		requestAnimationFrame( () => {this.draw();});
	}

	reset_maze() {
		this.maze=new Maze(
			parseInt(document.getElementById('input_w').value, 10),
			parseInt(document.getElementById('input_h').value, 10));
	}

	hook_dom() {
		document.getElementById('new_grid').onclick=() => {this.reset_maze()};
		document.getElementById('generate_maze').onclick=() => {this.generate_maze()};
		document.getElementById('step').onclick=() => {this.step()};
	}

	generate_maze() {
		this.generator.begin(this.maze);
	}

	step() {
		if(undefined===this.step_coords) {
			this.step_coords=new Coords(0,0);
		}
		this.generator.step(this.maze, this.step_coords);
	}

	draw() {
		this.display.clear();
		this.display.draw_maze(this.maze);
		this.display.draw_player(this.player);
		requestAnimationFrame( () => {this.draw();});
	}

}
