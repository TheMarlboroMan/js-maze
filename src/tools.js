"use strict";

export const none=0;
export const up=1;
export const right=2;
export const down=4;
export const left=8;

export function opposite_direction(_dir) {
	switch(_dir) {
		case none: 	return none; break;
		case up:	return down; break;
		case right:	return left; break;
		case down:	return up; break;
		case left:	return right; break;
		default: throw new Error("Unable to solve opposite_direction "+_dir);
	}
}

export function dir_to_array(_dir) {
	let res=[];
	if(_dir & up) res.push(up);
	if(_dir & right) res.push(right);
	if(_dir & down) res.push(down);
	if(_dir & left) res.push(left);
	return res;
}
