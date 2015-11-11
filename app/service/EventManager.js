/**
 * @class ManagementConsole.service.EventManager
 *
 * Global DOM-event manager.
 */
Ext.define('ManagementConsole.service.EventManager', {

    /**
     * @inheritdoc
     */
    mixins: ['Ext.mixin.Observable'],

    /**
     * @inheritdoc
     */
    constructor: function (config) {
        this.mixins.observable.constructor.call(this, config);

        this.callParent(arguments);

        Ext.getBody().on('mousedown', this.onMouseDown, this);
    },

    /**
     * @private
     */
    onMouseDown: function (event) {
        if (this.fireEvent('beforeglobaldown', event, event.target) !== false) {
            this.fireEvent('globaldown', event, event.target);
        }
    }
});