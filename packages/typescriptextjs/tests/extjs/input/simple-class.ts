

module Farm.yard {

    export class Dog {

        name: string = "Perrito";

        constructor(name?: string) {
            this.name = name || this.name;
        }

        woof() {
            console.log('Woof Woof ' + this.name + '!');
        }
    }

}