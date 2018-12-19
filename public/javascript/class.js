/*
  Topic: Design using Object Orientation Programming any concept of choice
  Chosen Concept: Machine
  The underscore is used to show the data is private(encapsulation)
  getters are used for abstraction, one can only get, not edit data
*/

class Vehicle {
    constructor(engine_type, colour) {
      this._engine = engine_type;
      this._colour = colour;
    }
    
    get engine() {
      return this._engine;
    }
  
   get colour() {
      return this._colour;
    }
  
    set colour(colourName) {
      this._colour = colourName;
    }
  
    start() {
      console.log('The car with colour colour of this._colour has started and have engine this.engine')
    }
  }
  
  /* Car inherits from vehicle engine type and colour
  */
  class Car extends Vehicle {
    constructor(engine_type, colour, no_of_tyre, speed) {
      super(engine_type, colour);
      this._tyre = no_of_tyre;
      this._speed = speed;
    }
    
    set colour(colour) {
      super.colour = colour;
    }
    
    get colour() {
      return super.colour;
    }
    
    get tyre() {
      return this._tyre;
    }
    
    get speed() {
      return this._speed;
    }
  }

let toyota = new Car('ttt', 'yelow', 4, 78);
//console.log(toyota.colour);
toyota.colour = 'black';
// console.log(toyota.colour);
console.log(toyota.start);