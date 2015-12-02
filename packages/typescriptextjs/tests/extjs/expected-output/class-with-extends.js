Ext.define('Farm.yard.Bird', {
    can_fly : true,
    constructor : function Bird(can_fly) {
        this.can_fly = typeof can_fly === 'boolean' ? can_fly : this.can_fly;
    },
    swim : function (distance) {
        console.log('swimming', distance, '!');
    }
});
Ext.define('Farm.yard.Chicken', {
    extend : 'Farm.yard.Bird',
    constructor : function Chicken() {
        Farm.yard.Chicken.superclass.constructor.call(this, false);
    },
    swim : function (distance) {
        Farm.yard.Chicken.superclass.swim.call(this, distance);
        console.log('I\'m drowning! oh no!');
    }
});
