
module Farm.yard {

    export class Tractor {

        static WEIGHT_PER_WHEEL: number = 5;
        static CHASSIS_WEIGHT: number = 10;

        static computeWeight():number {
            return this.computeWheelWeight(4) + this.CHASSIS_WEIGHT;
        }

        static computeWheelWeight(wheels: number):number {
            return this.WEIGHT_PER_WHEEL * wheels;
        }
    }

}

var weight = Farm.yard.Tractor.computeWeight();