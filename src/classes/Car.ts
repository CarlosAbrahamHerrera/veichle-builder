// Importing Vehicle and Wheel classes
import Vehicle from './Vehicle.js';
import Wheel from './Wheel.js';

// Car class that extends Vehicle class
class Car extends Vehicle {
  private defaultWheels: Wheel[] = [
    new Wheel(18, "Goodyear"),
    new Wheel(18, "Goodyear"),
    new Wheel(18, "Goodyear"),
    new Wheel(18, "Goodyear")
  ];

  constructor(
    vin: string,
    color: string,
    make: string,
    model: string,
    year: number,
    weight: number,
    maxSpeed: number,
    wheels: Wheel[]
  ) {
    // Create finalWheels before super() call
    const finalWheels = wheels.length === 4 ? wheels : [
      new Wheel(18, "Goodyear"),
      new Wheel(18, "Goodyear"),
      new Wheel(18, "Goodyear"),
      new Wheel(18, "Goodyear")
    ];
    super(vin, color, make, model, year, weight, maxSpeed, finalWheels);
  }

  override printDetails(): void {
    super.printDetails();
    console.log(`VIN: ${this.vin}`);
    console.log(`Color: ${this.color}`);
    console.log(`Make: ${this.make}`);
    console.log(`Model: ${this.model}`);
    console.log(`Year: ${this.year}`);
    console.log(`Weight: ${this.weight} lbs`);
    console.log(`Top Speed: ${this.maxSpeed} mph`);

    this.wheels.forEach((wheel, index) => {
      console.log(`Wheel ${index + 1}: ${wheel.getInfo()}`);
    });
  }

  getInfo(): string {
    return `${this.year} ${this.color} ${this.make} ${this.model}`;
  }

  performAction(): string {
    return `The ${this.make} ${this.model} honks its horn!`;
  }
}

// Export the Car class as the default export
export default Car;
