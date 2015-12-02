/**
 * ManagementConsole.logic.EntityManager
 */
Ext.define('ManagementConsole.logic.EntityManager', {

    /**
     * @inheritdoc
     */
    constructor: function () {
        this.cache = {};

        this.callParent(arguments);
    },

    /**
     * Get instance of model, creating instance if not exists
     *
     * @param {String} cls Class
     * @param {Object} id Object ID
     * @param {Object} config Configuration
     * @param {Function} callback Callback
     */
    getInstance: function (cls, id, config, callback) {
        var key = this.toKey(cls, id),
            instance = this.cache[key];

        if (!instance) {
            Ext.log({msg: '[ENTITY_MANAGER]: create instance'}, ' >> key: ' + key);

            this.cache[key] = instance = Ext.create(cls, config);
            instance.setNewest(true);

            Ext.callback(callback);
        } else {
            Ext.log({msg: '[ENTITY_MANAGER]: get instance from cache'}, ' >> key: ' + key);
        }
        return instance;
    },

    /**
     * @private
     * @param {String} cls Class
     * @param {Object} id Object ID
     */
    toKey: function (cls, id) {
        return (cls + '-' + id).toLowerCase();
    }
});