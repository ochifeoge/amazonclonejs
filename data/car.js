
    class Car {
        #brand;
        #model;
        speed = 0;
        isTrunkOpen = false;

        constructor(car) {
            this.#brand = car.brand;
            this.#model = car.model;
        }

        go(){
            this.speed += 5;
            if (!this.isTrunkOpen) {
              this.speed += 5;
            }

            if(this.speed > 200){
                this.speed = 200
            }
        }
        brake(){
            this.speed -=5;
            if (this.speed < 0){
                this.speed = 0
            }
        }
        openTrunk() {
            if (this.speed === 0){
               return this.isTrunkOpen = true;
            }
        }
        closeTrunk() {
          return  this.isTrunkOpen = false;
        }

        displayInfo() {
            console.log(`${this.#brand} ${this.#model} ${this.speed}km/h ${this.isTrunkOpen}`);
          }
    }

    class RaceCar extends Car {
        acceleration;

        constructor(car) {
            super(car)
            this.acceleration = car.acceleration;
        }
        go(){
            this.speed += this.acceleration;

            if (this.speed > 300) {
                this.speed = 300
            }
        }
        brake(){
            this.speed -= this.acceleration;

            if (this.speed < 0) {
                this.speed = 0
            }
        }
        openTrunk() {
            console.log('Race cars do not have a trunk.');
          }
        
          closeTrunk() {
            console.log('Race cars do not have a trunk.');
          }
    }

    const car1 = new Car({
        brand : 'Toyota',
        model : 'Corolla'
    });

    const car2 = new Car({
        brand: 'Tesla',
        model: 'Model 3'
    })

   

   const raceCar = new RaceCar({
    brand: 'McLaren',
    model: 'F1',
    acceleration: 20
   });
   car2.displayInfo();

raceCar.go();
raceCar.go();
raceCar.go();
raceCar.displayInfo();
raceCar.openTrunk();
raceCar.displayInfo();
raceCar.brake();
raceCar.displayInfo();