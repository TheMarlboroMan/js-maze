js-maze
=======

A small maze generator in JS. 

# About:

A small maze generator written in Javascript with a recursive algorithm (depth-first search, I think) that usually generates a large correct path with a few smaller dead-ends.

# Rationale:

I just wanted to test class syntax, imports and exports.

# Building.

- If your browser support ES6 style imports and exports:
	- Do nothing. Use index.html and be happy.
- Else:
	- Solve the package.json dependencies with npm. 
	- Do "npm run build".
	- Use index.html

# Adding generators.

The interface of a generator is begin(_maze):void, step(_maze):void and get_step_coords():Coords.

Generators are created in the "build_generator" method, in "controller.js". Check the examples provided.

# TODO

	- Modify the generator a bit, so stretches aren't as long.
Do modifications in a new class!!!!
		- Perhaps a counter of successful steps.
			- Store the tip, just in case.
			- backtrack when you reach X for at least positions.
			- backtrack for X / n steps.
			- Continue with the algorithm.
		- When the stack is empty:
			- We should have a count of "visited" of w*h.
			- If not, for each tip:
				- Make the tip the current head.
				- Have a go at the algorithm with it.
	- Add bonuses around.
	- Add scrolling on very large mazes.
	- Center on smaller mazes.
	- Add a better presentation, just in case.
	- Add step marker, for the step thing.
	- Fix TODO.
