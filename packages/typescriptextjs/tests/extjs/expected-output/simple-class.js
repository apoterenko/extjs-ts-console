Ext.define('Farm.yard.Dog', {
    name : "Perrito",
    constructor : function Dog(name) {
        this.name = name || this.name;
    },
    woof : function () {
        console.log('Woof Woof ' + this.name + '!');
    }
});
