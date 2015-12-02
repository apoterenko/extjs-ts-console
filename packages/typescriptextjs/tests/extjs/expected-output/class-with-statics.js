Ext.define('Farm.yard.Tractor', {
    statics : {
        WEIGHT_PER_WHEEL : 5,
        CHASSIS_WEIGHT : 10,
        computeWeight : function () {
            return this.computeWheelWeight(4) + this.CHASSIS_WEIGHT;
        },
        computeWheelWeight : function (wheels) {
            return this.WEIGHT_PER_WHEEL * wheels;
        }
    }
});
var weight = Farm.yard.Tractor.computeWeight();
