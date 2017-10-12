function calculateFitness() {
	for (var i = 0; i < population.length; i++) {
		currentShortestLength = Infinity;
		var d = population[i].pathLength();
		if (d < overallShortestLength) {
			overallShortestLength = d;
			overallShortestOrdering = population[i];
		}
		if (d < currentShortestLength) {
			currentShortestLength = d;
			currentShortestOrdering = population[i];
		}
		fitness[i] = 1 / (d + 1);
	}
}

function normalizeFitness() {
	var sum = 0;
	for (var i = 0; i < population.length; i++) {
		sum += fitness[i];
	}
	for (var i = 0; i < fitness.length; i++) {
		fitness[i] = fitness[i] / sum;
	}
}

function nextGeneration() {
	let newPopulation = [];
	for (var i = 0; i < population.length; i++) {
		let path1 = pickOne(population, fitness);
		let path2 = pickOne(population, fitness);
		let newPath = crossOver(path1, path2);
		mutate(newPath, 0.25);
		newPopulation[i] = newPath;
	}
	population = newPopulation;
}

// choose (a path) from the population
function pickOne(list, probabilities) {
	let index = 0;
	let r = random(1);
	while (r > 0) {
		r = r - probabilities[index];
		index++;
	}
	index--;
	return list[index];
	// return list[index].slice();
}

function crossOver(path1, path2) {
	let start = floor(random(nodeCount));
	let end = floor(random(start + 1, nodeCount));
	let newOrder = path1.order.slice(start, end);
	for (var i = 0; i < nodeCount; i++) {
		if (!newOrder.includes(path2.order[i])) {
			newOrder.push(path2.order[i]);
		}
	}
	let newPath = new Path(newOrder);
	return newPath;
}

function crossOver2(path1, path2) {
	let edges = path1.edges().concat(path2.edges());
	let newOrder = path1.order.slice(0,2);
	return null;
}

function mutate(path, mutationRate) {
	if (random(1) < mutationRate) {
		path.swapPositions(floor(random(nodeCount)), floor(random(nodeCount)));
	}
}