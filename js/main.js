let nodes = [];
let r = 10; // node radius
let nodeCount = 8;
let initialPopulationSize = 50;
let population = []; // of orderings
let fitness = []; // of each population member
let nset = [];
for (var i = 0; i < nodeCount; i++) { nset[i] = i; }
let go = true; // life
let overallShortestLength = Infinity;
let overallShortestOrdering = new Path(nset);
let currentShortestOrdering = new Path(nset);

function swap(arr, i, j) {
	if ((i < arr.length) && (j < arr.length)) {
		var temp = arr[i];
		arr[i] = arr[j];
		arr[j] = temp;
	}
}

function mouseClicked() { go = !go; }

function setup() {
	createCanvas(600, 600);
	// position nodes around canvas randomly
	// for (var i = 0; i < nodeCount; i++) {
	// 	append(nodes, new Node(round(random(width - 2*r))+r, round(random(height-2*r))+r));
	// }
	// position nodes around canvas in a circle
	for (var i = 0; i < nodeCount; i++) {
		var x = round(0.75*width/2*cos(i*TWO_PI/nodeCount))+ width/2;
		var y = round(0.75*width/2*sin(i*TWO_PI/nodeCount)) + width/2;
		append(nodes, new Node(x, y));
	}
	// generate initial population
	for (var i = 0; i < initialPopulationSize; i++) {
		population[i] = new Path(shuffle(nset));
	}
	// population = new Population(populationSize);
}

function draw() {
	background(50);
	for (var i = 0; i < nodeCount; i++) {
		nodes[i].display();
	}
	currentShortestOrdering.draw(0.5);
	overallShortestOrdering.draw(2);
	if (go == true) {
		calculateFitness();
		normalizeFitness();
		nextGeneration();
	}
}