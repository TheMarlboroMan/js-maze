js-maze
=======

A small maze generator in JS. 

# About:

A small maze generator written in Javascript with which supports more than 1 algorithms (so far I have depth-first search and a variant on it).

It also allows for the user to walk a dot around the maze in search of another dot.

# Rationale:

I just wanted to test class syntax, imports and exports. I also like mazes and wanted to refresh my Canvas basics so...

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

	- Add scrolling on very large mazes.
	- Allow view panning.
	- Center on smaller mazes.
	- Add a better presentation, just in case.
	- Add step marker, for the step thing.
	- Add STEP method for generator B.
	- Fix TODO.
	- Add "3d" view.
