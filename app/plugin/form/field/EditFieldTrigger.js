/**
 * @class ManagementConsole.plugin.form.field.EditFieldTrigger
 */
Ext.define('ManagementConsole.plugin.form.field.EditFieldTrigger', {
    extend: 'ManagementConsole.plugin.form.field.FieldTrigger',

    /**
     * @inheritdoc
     */
    alias: 'plugin.edit.field.trigger',

    /**
     * @inheritdoc
     */
    actions: ['apply', 'cancel'],

    /**
     * @private
     */
    cancelAction: 'cancel',

    /**
     * @inheritdoc
     */
    onFieldFocus: function (field) {
        this.callParent(arguments);

        field.resetOriginalValue();
    },

    /**
     * @inheritdoc
     */
    onGlobalDown: function (event, target, field) {
        switch (target) {
            case field.inputEl.dom:
                return;
            case this.getActionDomElement(field, this.cancelAction):
                this.doCancel(field);
                break;
            default:
                this.doAction(field);
        }

        this.callParent(arguments);
    },

    /**
     * @inheritdoc
     */
    processGlobalDown: function (field, target) {
        field.fireEvent('deactivate', field, target);

        field.blur();
        if (field.triggerBlur) {
            field.triggerBlur();
        }

        this.callParent(arguments);
    },

    /**
     * Trigger cancel handler
     *
     * @private
     * @param {Ext.form.field.Field} field Field
     */
    doCancel: function (field) {
        field.reset();
        field.fireEvent('resetvalue', field);
    },

    /**
     * Trigger action handler
     *
     * @private
     * @param {Ext.form.field.Field} field Field
     */
    doAction: function (field) {
        if (field.isDirty()) {
            field.fireEvent('dirtyvalue', field);
        }
    },

    /**
     * @inheritdoc
     */
    onEnterKey: function (field) {
        this.doAction(field);
    },

    /**
     * @inheritdoc
     */
    onEscKey: function (field) {
        this.doCancel(field);
    }
});