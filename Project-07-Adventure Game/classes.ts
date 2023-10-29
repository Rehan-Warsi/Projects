class Characters {
    name : string
    health = 100

    constructor(name:string){
        this.name = name
     }
}

export class Player extends Characters {
    
    constructor(name:string){
        super(name)
        this.name = name
        
    }

    healthDecrease(){
        this.health -= 25
    }
}

export class Opponent extends Characters {
     
    constructor(name:string){
        super(name)
    }

    healthDecrease(){
        this.health -= 25
    }
}
