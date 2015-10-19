/**
 * @class ManagementConsole.plugin.form.field.FieldTrigger
 *
 * Provides an additional functionality for Fields that adds a clickable trigger elements (looks like a combobox by default) on the right side.
 */
Ext.define('ManagementConsole.plugin.form.field.FieldTrigger', {
    extend: 'Ext.AbstractPlugin',

    /**
     * @inheritdoc
     */
    alias: 'plugin.field.trigger',

    /**
     * @private
     */
    triggerUI: 'fieldtrigger',

    /**
     * @protected
     */
    fieldTriggerPrefixCls: 'field-trigger-',

    /**
     * Array actions
     */
    actions: [],

    /**
     * @private
     */
    inject: [
        'eventManager'
    ],

    /**
     * @inheritdoc
     */
    config: {
        /**
         * Event manager
         * @private
         */
        eventManager: null
    },

    /**
     * @inheritdoc
     */
    init: function (field) {
        field.__fieldTriggerScope = {};

        field.setUI(this.triggerUI);

        field.on({
            scope: this,
            focus: this.onFieldFocus,
            afterrender: this.onFieldAfterRender,
            specialkey: this.onSpecialKey
        });
    },

    /**
     * Special key handler
     */
    onSpecialKey: function (field, e) {
        switch (e.getKey()) {
            case e.ENTER:
                this.onEnterKey(field);
                break;
            case e.ESC:
                this.onEscKey(field);
                break;
        }

        if (Ext.Array.contains([e.ENTER, e.ESC], e.getKey())) {
            this.processGlobalDown(field);
        }
    },

    /**
     * Special Enter key handler
     *
     * @protected
     * @param {Ext.form.field.Field} field Field
     */
    onEnterKey: Ext.emptyFn,

    /**
     * Special Esc key handler
     *
     * @@protected
     * @param {Ext.form.field.Field} field Field
     */
    onEscKey: Ext.emptyFn,

    /**
     * Field after render handler
     *
     * @protected
     * @param {Ext.form.field.Field} field Field
     */
    onFieldAfterRender: function (field) {
        var el,
            me = this,
            inputEl = field.inputEl,
            actionsTotalWidth = 0,
            config = field.fieldTriggerConfig,
            actions = config && config.actions ? config.actions : Ext.clone(this.actions),
            fieldTriggerScope = field.__fieldTriggerScope;

        fieldTriggerScope.actionsDomElements = {};

        Ext.Array.each(actions.reverse(), function (action, index) {
            var customActionConfig;

            if (!Ext.isString(action)) {
                /**
                 * Support of custom widget config such as combobox, etc
                 */
                customActionConfig = Ext.clone(action);
                action = 'custom- ' + index;
            }

            el = fieldTriggerScope.actionsDomElements[action] = Ext.DomHelper.insertAfter(inputEl, {
                tag: 'div',
                cls: Ext.String.format(
                    '{1} {2}placeholder {2}{0}',
                    action,
                    customActionConfig ? '' : me.fieldTriggerPrefixCls + 'action',
                    me.fieldTriggerPrefixCls
                ),
                action: action
            });

            if (customActionConfig) {
                customActionConfig.renderTo = el;
                Ext.widget(customActionConfig);
            }

            el = Ext.fly(el);
            actionsTotalWidth += el.getWidth() + el.getMargin('lr');
        });

        // TODO Support layout
        inputEl.setWidth(inputEl.getWidth() - actionsTotalWidth);
    },

    /**
     * Field focus handler
     *
     * @protected
     * @param {Ext.form.field.Field} field Field
     */
    onFieldFocus: function (field) {
        this.bindGlobalDown(field);
    },

    /**
     * Get trigger action dom element by name
     *
     * @protected
     * @param {Ext.form.field.Field} field Field
     * @param {String} actionName Action name
     * @returns {HTMLElement}
     */
    getActionDomElement: function (field, actionName) {
        return field.__fieldTriggerScope.actionsDomElements[actionName];
    },

    /**
     * Global down handler
     *
     * @param {Object} event Event
     * @param {HTMLElement} target target
     * @param {Ext.form.field.Field} field Field
     */
    onGlobalDown: function (event, target, field) {
        this.processGlobalDown(field, target);
    },

    /**
     * Process global down
     *
     * @protected
     * @param {HTMLElement} target target
     * @param {Ext.form.field.Field} field Field
     */
    processGlobalDown: function (field, target) {
        Ext.log({msg: '[FIELD_TRIGGER]: process global down'}, ' >> field name: ' + field.getName());

        /**
         * Unbind global down listener when deactivated
         */
        this.unbindGlobalDown(field);
    },

    /**
     * Bind global down
     *
     * @param field Field
     */
    bindGlobalDown: function (field) {
        field.mon(this.getEventManager(), 'globaldown', this.onGlobalDown, this, field);
    },

    /**
     * Unbind global down
     *
     * @param field Field
     */
    unbindGlobalDown: function (field) {
        field.mun(this.getEventManager(), 'globaldown', this.onGlobalDown, this);
    }
});