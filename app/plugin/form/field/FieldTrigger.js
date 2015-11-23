/**
 * @class ManagementConsole.plugin.form.field.FieldTrigger
 *
 * Provides an additional functionality for Fields that adds a clickable trigger elements (looks like a combobox by default) on the right side.
 */
Ext.define('ManagementConsole.plugin.form.field.FieldTrigger', {
	extend: 'Ext.AbstractPlugin',

	// @inheritdoc
	alias: 'plugin.field.trigger',

	// @private
	triggerUI: 'fieldtrigger',

	// @protected
	fieldTriggerPrefixCls: 'field-trigger-',

	// Array actions
	actions: [],

	// @private
	inject: [
		'eventManager'
	],

	// @inheritdoc
	config: {
		/**
		 * Event manager
		 * @private
		 */
		eventManager: null
	},

	// @inheritdoc
	init: function (field) {
		field.__fieldTriggerScope = {};

		field.setUI(this.triggerUI);
		field.addCls(this.fieldTriggerPrefixCls + 'default');

		field.on({
			scope: this,
			focus: this.onFieldFocus,
			blur: this.onFieldBlur,
			afterrender: this.onFieldAfterRender,
			specialkey: this.onSpecialKey,
			hasfieldtargetaction: this.hasFieldTargetAction
		});
	},

	/**
	 * Special key handler
	 */
	onSpecialKey: function (field, e) {
		var keyHandlerResult;

		switch (e.getKey()) {
			case e.ENTER:
				keyHandlerResult = this.onEnterKey(field);
				break;
			case e.ESC:
				keyHandlerResult = this.onEscKey(field);
				break;
		}

		// Prevent default plugin behaviour
		if (keyHandlerResult === false) {
			return;
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
	},

	/**
	 * Has field target action
	 *
	 * @param field Field
	 * @param target Target dom element
	 */
	hasFieldTargetAction: function (field, target) {
		var hasFieldTargetAction = false;
		Ext.Object.each(this.getActionDomElements(field), function (key, actionDomElement) {
			target === actionDomElement && (hasFieldTargetAction |= true);
		});
		return hasFieldTargetAction;
	},

	/**
	 * Field focus handler
	 *
	 * @protected
	 * @param {Ext.form.field.Field} field Field
	 */
	onFieldFocus: function (field) {
		if (field.fireEvent('beforefieldfocus', this, field) !== false) {
			field.removeCls(this.fieldTriggerPrefixCls + 'default');
		}
		this.bindGlobalDown(field);
	},

	/**
	 * Field blur handler
	 *
	 * @protected
	 * @param {Ext.form.field.Field} field Field
	 */
	onFieldBlur: function (field) {
		if (field.fireEvent('beforefieldblur', this, field) !== false) {
			field.addCls(this.fieldTriggerPrefixCls + 'default');
		}
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
		return this.getActionDomElements(field)[actionName];
	},

	/**
	 * Get trigger actions dom elements
	 *
	 * @protected
	 * @param {Ext.form.field.Field} field Field
	 * @returns {Array}
	 */
	getActionDomElements: function (field) {
		return field.__fieldTriggerScope.actionsDomElements;
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
		// Unbind global down listener when the field deactivated
		this.unbindGlobalDown(field);
	},

	/**
	 * Bind global down listener for the current active field
	 *
	 * @param field Field
	 */
	bindGlobalDown: function (field) {
		Ext.log({msg: '[FIELD_TRIGGER]: bind global down'}, ' >> field name: ' + field.getName());

		field.mon(this.getEventManager(), 'globaldown', this.onGlobalDown, this, field);
	},

	/**
	 * Unind global down listener for the current active field
	 *
	 * @param field Field
	 */
	unbindGlobalDown: function (field) {
		Ext.log({msg: '[FIELD_TRIGGER]: unbind global down'}, ' >> field name: ' + field.getName());

		field.mun(this.getEventManager(), 'globaldown', this.onGlobalDown, this);
	}
});