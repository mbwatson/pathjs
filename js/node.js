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

