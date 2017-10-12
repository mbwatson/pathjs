function distanceSquared(x1, y1, x2, y2) { return ((x2 - x1)**2 + (y2 - y1)**2); }

class Path {
	constructor(order) {
		this.order = order;
	}

	edgeLength(a, b) {
		return distanceSquared(nodes[a].pos.x, nodes[a].pos.y, nodes[b].pos.x, nodes[b].pos.y);
	}

	pathLength() {
		let d = 0;
		for (var i = 0; i < this.length() - 1; i++) {
			d += this.edgeLength(this.order[i]	, this.order[i+1]);
		}
		return d;
	}

	draw(weight = 1) {
		strokeWeight(weight);
		stroke(255);
		noFill();
		beginShape();
		for (var i = 0; i < nodeCount; i++) {
			vertex(nodes[this.order[i]].pos.x, nodes[this.order[i]].pos.y)
		}
		endShape();
	}

	shortestEdge() {
		let minDistance = Infinity;
		let minIndex = 0;
		for (var i = 0; i < this.length() - 1; i++) {
			let d = this.edgeLength(this.order[i],this.order[i+1]);
			if (d < minDistance) {
				minDistance = d;
				minIndex = i;
			}
		}
		return minIndex;
	}

	length() {
		return this.order.length;
	}

	leastEdge() {
		let minDistance = Infinity;
		let edges = this.edges();
		for (var i = 0; i < edges.length(); i++) {
			let d = this.edgeLength(edges[i][0],edges[i][1]);
			if (d < minDistance) {
				minDistance = d;
				let minEdge = edges[i];
			}
		}
		return minEdge;
	}

	neighbors(n) {
		let position = this.order.indexOf(n)
		let neighbors = [];
		if (position > -1) {
			if (position > 0) { neighbors.push(this.order[position-1]); } 
			if (position < this.length()-1) { neighbors.push(this.order[position+1]); } 
		}
		return neighbors;
	}
	
	closestNeighbor(n) {
		let neighbors = this.neighbors(n);
		let friend = neighbors[0];
		if ((neighbors.length > 1) && (this.edgeLength(n, neighbors[1]) < this.edgeLength(n, neighbors[0]))) {
			friend = neighbors[1];
		}
		return friend;
	}
	
	edges(n = null) {
		let edgeSet = [];
		if (n === null) {
			for (var i = 0; i < this.length()-1; i++) {
				edgeSet.push(this.order.slice(i,i+2));
			}
		} else {
			let i = this.order.indexOf(n);
			if (i > 0) { edgeSet.push(this.order.slice(i-1,i+1)); }
			if (i < this.length() - 1) { edgeSet.push(this.order.slice(i,i+2)); }
		}
		return edgeSet;
	}

	swapPositions(i, j) {
		if ((i < this.length()) && (j < this.length())) {
			var temp = this.order[i];
			this.order[i] = this.order[j];
			this.order[j] = temp;
		}
	}

	// swapValues(i, j) {
	// 	if ((i < this.length()) && (j < this.length())) {
	// 		var temp = this.order[i];
	// 		this.order[i] = this.order[j];
	// 		this.order[j] = temp;
	// 	}
	// }

}



// Path.prototype.toString = function()
// {
//     return this.order.toString;
// }
