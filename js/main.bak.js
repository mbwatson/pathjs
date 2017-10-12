let nodes = [];
let count = 8;
let r = 10;
let go = true;
let ordering = [];
for (var i = 0; i < count; i++) {
	ordering[i] = i;
}
let shortestLength;
let shortestOrdering = ordering;

class Node {
	constructor(x, y) {
		this.pos = createVector(x, y);
		this.r = r;
	}

	display() {
		fill(255);
		ellipse(this.pos.x, this.pos.y, this.r);
	}
}

function swap(arr, i, j) {
	if ((i < arr.length) && (j < arr.length)) {
		var temp = arr[i];
		arr[i] = arr[j];
		arr[j] = temp;
	}
}

function drawPath(order, weight = 1) {
	strokeWeight(weight);
	stroke(255);
	noFill();
	beginShape();
	for (var i = 0; i < count; i++) {
		vertex(nodes[order[i]].pos.x, nodes[order[i]].pos.y)
	}
	endShape();
}

function mouseClicked() { go = !go; }
function distance(x1, y1, x2, y2) { return sqrt((x2 - x1)**2 + (y2 - y1)**2); }
function edgeLength(node1, node2) { return distance(node1.pos.x, node1.pos.y, node2.pos.x, node2.pos.y); }
function pathLength() {
	let d = 0;
	for (var i = 0; i < count - 1; i++) {
		d += edgeLength(nodes[ordering[i]], nodes[ordering[i+1]]);
	}
	return d;
}

function showDetails() {
  currentOrderingDiv = createDiv('');
  currentLengthDiv = createDiv('');
  shortestOrderingDiv = createDiv('');
  shortestLengthDiv = createDiv('');
}

function setup() {
	createCanvas(600, 600);
	shortestLength = width*count;
	// for (var i = 0; i < count; i++) {
	// 	append(nodes, new Node(round(random(r, width-r)), round(random(r, width-r))));
	// }
	for (var i = 0; i < count; i++) {
		var x = round(0.9*width/2*cos(i*TWO_PI/count))+ width/2;
		var y = round(0.9*width/2*sin(i*TWO_PI/count)) + width/2;
		append(nodes, new Node(x, y));
	}
	ordering = shuffle(ordering);
	showDetails();
}

function draw() {
	background(50);
	for (var i = 0; i < count; i++) {
		nodes[i].display();
	}
	drawPath(ordering, 0.5);
	drawPath(shortestOrdering, 2);
	currentOrderingDiv.html(ordering);
	currentLengthDiv.html(pathLength());
	if (pathLength() < shortestLength) {
		shortestLength = pathLength();
		shortestOrdering = ordering.slice();
	}
	shortestOrderingDiv.html(shortestOrdering);
	shortestLengthDiv.html(shortestLength);
	if (go == true) {
		swap(ordering, floor(random(count)), floor(random(count)));
	}
}