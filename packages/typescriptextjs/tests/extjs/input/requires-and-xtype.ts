
module Farm.yard {

    export class Duck {
        xtype = 'Farm_yard_Duck';

        requires = [
            'Farm.yard.Tractor'
        ];

        constructor() {
            console.log('Quack');
        }
    }

}