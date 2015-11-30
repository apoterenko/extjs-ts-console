/**
 * ManagementConsole.data.store.Storage
 */
Ext.define('ManagementConsole.data.store.Storage', {
    extend: 'Ext.data.Store',

    requires: [
        'ManagementConsole.model.Storage'
    ],

    // @inheritdoc
    model: 'ManagementConsole.model.Storage',

    // @inheritdoc
    proxy: {
        // @inheritdoc
        type: 'restproxy',

        // @inheritdoc
        url: 'groups/{id}/storages',

        // @inheritdoc
        reader: {
            // @inheritdoc
            type: 'json',

            // @inheritdoc
            rootProperty: 'items'
        }
    }
});