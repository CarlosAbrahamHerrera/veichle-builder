// Wheel class that defines the properties of a wheel
class Wheel {
  // Declare properties of the Wheel class using private access modifier
  private size: number;
  private brand: string;

  // Constructor for the Wheel class
  constructor(size: number, brand: string) {
    this.size = size;
    this.brand = brand;
  }

  // Getter methods for the properties of the Wheel class
  get getSize(): number {
    return this.size;
  }

  // Setter method for the size property
  get getBrand(): string {
    return this.brand;
  }

  getInfo(): string {
    return `${this.size}" ${this.brand} wheel`;
  }
}

// Export the Wheel class
export default Wheel;
