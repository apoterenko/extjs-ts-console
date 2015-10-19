/**
 * @class ManagementConsole.plugin.form.field.FieldAutoUpdater
 */
Ext.define('ManagementConsole.plugin.form.field.FieldAutoUpdater', {
    extend: 'Ext.AbstractPlugin',

    /**
     * @inheritdoc
     */
    alias: 'plugin.field.auto.updater',

    /**
     * @inheritdoc
     */
    init: function (field) {
        this.callParent(arguments);

        field.on('dirtyvalue', this.onFieldDirtyValue, this);
    },

    /**
     * Field dirty value handler
     *
     * @private
     * @param {Ext.form.field.Field} field Field
     * @param newValue New value
     */
    onFieldDirtyValue: function (field, newValue) {
        var form = field.findParentBy(this.findFieldParent),
            record = form ? form.getRecord() : null,
            modelVersion,
            saveConfig;

        newValue = Ext.isDefined(newValue) ? newValue : field.getValue();

        if (record) {
            record.set(field.getName(), newValue);

            saveConfig = {
                params: {}
            };

            modelVersion = record.get('version');
            if (!Ext.isEmpty(modelVersion)) {
                saveConfig.params.version = modelVersion;
            }

            field.fireEvent('beforeupdate', field, newValue);

            record.save(saveConfig);
        }
    },

    /**
     * Find field parent
     *
     * @private
     * @param parent Parent
     * @returns {boolean}
     */
    findFieldParent: function (parent) {
        return parent instanceof Ext.form.Panel;
    }
});