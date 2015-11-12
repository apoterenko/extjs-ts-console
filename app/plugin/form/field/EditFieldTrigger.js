/**
 * @class ManagementConsole.plugin.form.field.EditFieldTrigger
 */
Ext.define('ManagementConsole.plugin.form.field.EditFieldTrigger', {
    extend: 'ManagementConsole.plugin.form.field.FieldTrigger',

    // @inheritdoc
    alias: 'plugin.edit.field.trigger',

    // @private
    cancelAction: 'cancel',

    // @private
    applyAction: 'apply',

    // @inheritdoc
    init: function (field) {
        this.actions = [
            this.applyAction, this.cancelAction
        ];

        this.callParent(arguments);
    },

    // @inheritdoc
    onFieldFocus: function (field) {
        this.callParent(arguments);

        // "GroupField" plugin supported. Listener for event 'beforeresetoriginalvalue' should return false value
        if (field.fireEvent('beforeresetoriginalvalue', field) !== false && field.isDirty()) {

            // We retain value through REST, so for a single field fix it value after the change.
            // For a group of fields we must call the reset method from the form.
            field.resetOriginalValue();
        }
    },

    // @inheritdoc
    onGlobalDown: function (event, target, field) {
        switch (target) {
            // Clicked on itself - nothing to do.
            case field.inputEl.dom:
                return;
            case this.getActionDomElement(field, this.cancelAction):
                // "GroupField" plugin supported. Listener for event 'cancelaction' should return false value.
                if (this.fireActionEvent(field, 'cancelaction', target) !== false) {
                    this.doCancel(field);
                }
                break;
            default:
                // The whole clickable area around the field, except the area of cancel action element.
                // "GroupField" plugin supported. Listener for event 'applyaction' should return false value.
                if (this.fireActionEvent(field, 'applyaction', target) !== false) {
                    this.doAction(field);
                }
        }

        this.callParent(arguments);
    },

    // @inheritdoc
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
        if (field.isDirty()) {
            field.reset();
            field.fireEvent('resetvalue', field);
        }
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

    // @inheritdoc
    onEnterKey: function (field) {
        if (this.fireActionEvent(field, 'applyaction') === false) {
            // "GroupField" plugin supported. Listener for event 'applyaction' should return false value.
            // For a group of fields we have to handle it through the global event manager using synthetic action event.
            this.fireGlobalDownEvent(field, this.applyAction);

            // Prevent default plugin behaviour
            return false;
        }
        this.doAction(field);
    },

    // @inheritdoc
    onEscKey: function (field) {
        if (this.fireActionEvent(field, 'cancelaction') === false) {
            // "GroupField" plugin supported. Listener for event 'cancelaction' should return false value.
            // For a group of fields we have to handle it through the global event manager using synthetic action event.
            this.fireGlobalDownEvent(field, this.cancelAction);

            // Prevent default plugin behaviour
            return false;
        }
        this.doCancel(field);
    },

    /**
     * Fire action event
     *
     * @private
     * @param {Ext.form.field.Field} field Field
     * @param {String} eventName
     * @param {HTMLElement} target Target
     */
    fireActionEvent: function (field, eventName, target) {
        return field.fireEvent(eventName, field, target || field.inputEl.dom);
    },

    /**
     * Fire the global down event
     * @private
     */
    fireGlobalDownEvent: function (field, actionName) {

        // We must relay event for the field is clicked on to activate it through the global event manager
        // to carry out the "re-binding" (force automatically unbind for the previous active field and bind the target
        // active field) operation.
        this.getEventManager().fireGlobalDownEvent({
            // Synthetic action event
            target: this.getActionDomElement(field, actionName)
        });
    }
});