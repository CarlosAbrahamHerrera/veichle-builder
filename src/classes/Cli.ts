// importing classes from other files
import inquirer from "inquirer";
import Vehicle from "./Vehicle.js";
import Car from "./Car.js";
import Truck from "./Truck.js";
import Motorbike from "./Motorbike.js";
import Wheel from "./Wheel.js";

// define the Cli class
class Cli {
  vehicles: Vehicle[];
  selectedVehicleIndex: number | undefined;
  exit: boolean = false;

  // TODO: Update the constructor to accept Truck and Motorbike objects as well
  constructor(vehicles: Vehicle[]) {
    this.vehicles = vehicles;
  }

  // static method to generate a vin
  static generateVin(): string {
    // return a random string
    return Math.random().toString(36).substring(2, 10).toUpperCase();
  }

  // method to start the cli
  async startCli(): Promise<void> {
    while (true) {
      const { action } = await inquirer.prompt({
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: ['Create new vehicle', 'Select existing vehicle', 'Exit']
      });

      if (action === 'Exit') break;

      if (action === 'Create new vehicle') {
        await this.createNewVehicle();
      } else {
        await this.selectExistingVehicle();
      }
    }
  }

  private async createNewVehicle(): Promise<void> {
    const { type } = await inquirer.prompt({
      type: 'list',
      name: 'type',
      message: 'What type of vehicle would you like to create?',
      choices: ['Car', 'Truck', 'Motorbike']
    });

    const baseInfo = await inquirer.prompt([
      {
        type: 'input',
        name: 'make',
        message: 'Enter make:'
      },
      {
        type: 'input',
        name: 'model',
        message: 'Enter model:'
      },
      {
        type: 'number',
        name: 'year',
        message: 'Enter year:'
      },
      {
        type: 'input',
        name: 'color',
        message: 'Enter color:'
      },
      {
        type: 'number',
        name: 'weight',
        message: 'Enter weight (lbs):'
      },
      {
        type: 'number',
        name: 'maxSpeed',
        message: 'Enter max speed (mph):'
      }
    ]);

    let vehicle: Vehicle;

    if (type === 'Car') {
      vehicle = new Car(
        Cli.generateVin(),
        baseInfo.color,
        baseInfo.make,
        baseInfo.model,
        baseInfo.year,
        baseInfo.weight,
        baseInfo.maxSpeed,
        []
      );
    } else if (type === 'Truck') {
      const { cargoCapacity } = await inquirer.prompt({
        type: 'number',
        name: 'cargoCapacity',
        message: 'Enter cargo capacity (lbs):'
      });
      vehicle = new Truck(
        Cli.generateVin(),
        baseInfo.color,
        baseInfo.make,
        baseInfo.model,
        baseInfo.year,
        baseInfo.weight,
        baseInfo.maxSpeed,
        [],
        cargoCapacity
      );
    } else {
      const wheels = [
        new Wheel(17, "Michelin"),
        new Wheel(17, "Michelin")
      ];
      vehicle = new Motorbike(
        Cli.generateVin(),
        baseInfo.color,
        baseInfo.make,
        baseInfo.model,
        baseInfo.year,
        baseInfo.weight,
        baseInfo.maxSpeed,
        wheels
      );
    }

    this.vehicles.push(vehicle);
    this.selectedVehicleIndex = this.vehicles.length - 1;
    await this.performActions(vehicle);
  }

  private async selectExistingVehicle(): Promise<void> {
    if (this.vehicles.length === 0) {
      console.log('No vehicles exist yet. Please create a vehicle first.');
      return;
    }

    const { index } = await inquirer.prompt({
      type: 'list',
      name: 'index',
      message: 'Select a vehicle:',
      choices: this.vehicles.map((v, i) => ({
        name: v.getInfo(),
        value: i
      }))
    });

    this.selectedVehicleIndex = index;
    await this.performActions(this.vehicles[index]);
  }

  private async performActions(vehicle: Vehicle): Promise<void> {
    while (true) {
      const choices = [
        'Show info',
        'Perform action',
        'Start vehicle',
        'Stop vehicle',
        'Accelerate 5 MPH',
        'Decelerate 5 MPH',
        'Turn right',
        'Turn left',
        'Reverse'
      ];

      if (vehicle instanceof Truck) {
        choices.push('Load cargo');
      }
      choices.push('Back to main menu');

      const { action } = await inquirer.prompt({
        type: 'list',
        name: 'action',
        message: 'What would you like to do with this vehicle?',
        choices
      });

      if (action === 'Back to main menu') break;

      switch (action) {
        case 'Show info':
          console.log(vehicle.getInfo());
          break;
        case 'Perform action':
          console.log(vehicle.performAction());
          break;
        case 'Start vehicle':
          vehicle.start();
          break;
        case 'Stop vehicle':
          vehicle.stop();
          break;
        case 'Accelerate 5 MPH':
          vehicle.accelerate(5);
          break;
        case 'Decelerate 5 MPH':
          vehicle.decelerate(5);
          break;
        case 'Turn right':
          vehicle.turn('right');
          break;
        case 'Turn left':
          vehicle.turn('left');
          break;
        case 'Reverse':
          vehicle.reverse();
          break;
        case 'Load cargo':
          if (vehicle instanceof Truck) {
            console.log(vehicle.loadCargo());
          }
          break;
      }
    }
  }
}

// export the Cli class
export default Cli;
