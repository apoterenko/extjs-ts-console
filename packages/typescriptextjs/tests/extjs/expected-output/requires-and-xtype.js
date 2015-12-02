Ext.define('Farm.yard.Duck', {
    xtype : 'Farm_yard_Duck',
    requires : [
        'Farm.yard.Tractor'
    ],
    constructor : function Duck() {
        console.log('Quack');
    }
});
