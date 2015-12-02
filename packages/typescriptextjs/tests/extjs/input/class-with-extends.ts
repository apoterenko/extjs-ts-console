
module Farm.yard {

    export class Bird {

        can_fly: boolean = true;

        constructor(can_fly?: boolean) {
            this.can_fly = typeof can_fly === 'boolean' ? can_fly : this.can_fly;
        }

        swim(distance: number):void {
            console.log('swimming', distance, '!');
        }
    }

    export class Chicken extends Bird {

        constructor() {
            super(false);
        }

        swim(distance: number):void {
            super.swim(distance);
            console.log('I\'m drowning! oh no!')
        }
    }

}