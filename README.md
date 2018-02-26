js-maze
=======

A small maze generator in JS. 

#About:

A small maze generator written in Javascript with a recursive algorithm (depth-first search, I think) that usually generates a large correct path with a few smaller dead-ends.

#Rationale:

I just wanted to test class syntax, imports and exports.

#TODO

	- Modify the generator a bit, so stretches aren't as long.
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
	- Fix the non ES6 part... or better, transpile and such.
	- Add bonuses around.
	- Add scrolling on very large mazes.
	- Center on smaller mazes.
	- Add a better presentation, just in case.
	- Add step marker, for the step thing.
	- Fix TODO.
