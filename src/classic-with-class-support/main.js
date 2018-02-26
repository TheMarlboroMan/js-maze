let m=null;
let c=new Coords(0,0);
let g=null;
let d=new Display();

document.getElementById('create_grid').onclick=function() {
	console.log("Creating grid...");
	m=new Maze(
		parseInt(document.getElementById('input_w').value, 10),
		parseInt(document.getElementById('input_h').value, 10));
	draw_maze(m);
}

document.getElementById('generate_maze').onclick=function() {
	console.log("Creating maze...");
	if(null===m) {
		alert('Create a grid first...');
	}
	else {
		g=new Generator_type_a();
		g.begin(m);
		draw_maze(m);
	}
}

document.getElementById('step').onclick=function() {
	console.log("Step...");
	if(null===m) {
		alert('Create a grid first...');
	}
	else {
		if(null===g) {
			g=new Generator_type_a();
		}

		g.step(_m, c);
		draw_maze(m, c);
	}
}

function draw_maze(_maze, _c) {

	d.refresh(_maze);
/*
	let table=document.getElementById('table');
	table.innerHTML='';
	document.body.appendChild(table);

	for(let y=0; y<_maze.height; y++) {
		table.appendChild(document.createElement('tr'));
		for(let x=0; x<_maze.width; ++x) {
			let td=document.createElement('td');
			let exits=_maze.get_cell(new Coords(x, y)).exits;

			td.innerHTML=undefined===_c ? " " : (_c.x===x && _c.y===y) ? "x" : " ";
			td.className='cell'+exits;
			table.childNodes[y].appendChild(td);
		}
	}
*/
}
