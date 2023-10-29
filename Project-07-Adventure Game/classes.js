class Characters {
    name;
    health = 100;
    constructor(name) {
        this.name = name;
    }
}
export class Player extends Characters {
    constructor(name) {
        super(name);
        this.name = name;
    }
    healthDecrease() {
        this.health -= 25;
    }
}
export class Opponent extends Characters {
    constructor(name) {
        super(name);
    }
    healthDecrease() {
        this.health -= 25;
    }
}
