"use strict";

export class Input {
	constructor() {
		this.listeners=new Array();
		document.addEventListener('keydown', (event) => {this.handle_keydown(event);});
		
	}

	register(item) {
		this.listeners.push(item);
	}

	handle_keydown(event) {
		this.listeners.forEach( (item) => {item.handle_keydown(event.keyCode);});
	}
}
