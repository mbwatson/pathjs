population = [];

class Population {

	constructor(size) {
		for (var i = 0; i < size; i++) {
			population[i] = new Path(shuffle(nset));
		}
		this.members = population;
	}

}