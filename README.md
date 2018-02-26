js-maze
=======

A small maze generator in JS. 

#About:

A small maze generator written in Javascript with a recursive algorithm (depth-first search, I think) that usually generates a large correct path with a few smaller dead-ends.

#Rationale:

I just wanted to test class syntax, imports and exports.

#TODO

	- Modify the generator a bit, so stretches aren't as long.
		- Perhaps a counter of successful steps, backtrack when you reach X for at least positions.
		- Store the tip, just in case.
		- Once the stack is empty, we should have a count of "visited" of w*h.
		- If not, take the tip and go again... Repeat for all tips.
	- Fix the non ES6 part... or better, transpile and such.
	- Add bonuses around.
	- Add scrolling on very large mazes.
	- Center on smaller mazes.
	- Add a better presentation, just in case.
	- Add step marker, for the step thing.
	- Fix TODO.
