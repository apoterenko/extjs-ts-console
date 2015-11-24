/**
 * @class ManagementConsole.plugin.form.field.GroupField
 */
Ext.define('ManagementConsole.plugin.form.field.GroupField', {
	extend: 'Ext.AbstractPlugin',

	// @inheritdoc
	alias: 'plugin.group.field',

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
		var config = field.groupFieldConfig,
			relation = config.relation,
			master = config.master,
			form = config.parent || field.findParentBy(this.isInstanceOfPanel),
			context,
			localContext;

		context = form.__formGroupScope = form.__formGroupScope || {};

		if (master) {
			/**
			 * Save link on master at the group scope
			 */
			localContext = context[master] = context[master] || {};
			localContext.masterField = field;

			this.prepareMasterField(localContext);
		} else if (relation) {
			localContext = context[relation] = context[relation] || {};
			localContext.relatedFields = localContext.relatedFields || [];
			localContext.relatedFields.push(field);

			this.prepareRelatedField(field, localContext);
		}
	},

	/**
	 * Prepare master field
	 *
	 * @param context Context
	 */
	prepareMasterField: function (context) {
		var masterField = context.masterField,
			masterConfig = masterField.groupFieldConfig,
			masterFieldTpl = masterConfig.tpl;

		// Add listeners
		masterField.on('updatemaster', this.onMasterFieldUpdate, this, {
			context: context,
			masterFieldTpl: masterFieldTpl instanceof Ext.XTemplate
				? masterFieldTpl
				: new Ext.XTemplate(masterFieldTpl)
		});
		masterField.on('focus', this.onMasterFieldFocus, this, context);

		// Redefine reset master field function
		masterField.reset = Ext.emptyFn;
	},

	/**
	 * Prepare related field
	 *
	 * @param field Field
	 * @param context Context
	 */
	prepareRelatedField: function (field, context) {
		// The related field is hidden before
		field.hide();

		field.on('deactivate', this.onRelatedFieldDeactivate, this, context);
		field.on('applyaction', this.onRelatedFieldApplyAction, this, context);
		field.on('cancelaction', this.onRelatedFieldCancelAction, this, context);
		field.on('change', this.onRelatedFieldChange, this, context);
		field.on('render', this.onRelatedFieldRender, this);
	},

	/**
	 * Manual activation of relation field. Forced "globaldown" event processing for current relation field: bind and
	 * unbind listeners from previous relation field
	 *
	 * @param field Field
	 */
	manualActivateRelationField: function (field) {
		this.getEventManager().fireGlobalDownEvent({
			// Synthetic event with target that equal input element of current related field
			target: field.inputEl.dom
		});

		// We need to forcefully put the focus into current related field
		field.focus();
	},

	/**
	 * Before global down handler
	 *
	 * @param event Event
	 * @param target Target
	 * @param context Context
	 * @returns {boolean}
	 */
	onBeforeGlobalDown: function (event, target, context) {
		var relatedFields,
			relationFieldThatContainsTargetElement;

		if (!context || !(relatedFields = context.relatedFields)) {
			return true;
		}

		Ext.Array.each(relatedFields, function (relationField) {
			if (relationField.fireEvent('hasfieldtargetaction', relationField, target) === true) {
				relationFieldThatContainsTargetElement = relationField;
				return false;
			}
		});

		if (relationFieldThatContainsTargetElement) {
			// Global down stop event
			event.stopEvent();

			// Broadcast event to related field, we need activate "relation elements group" (trigger, etc) before
			this.manualActivateRelationField(relationFieldThatContainsTargetElement);

			// Translate global down event to original target - "repeat click algorithm" imitation.
			// Forced "globaldown" event processing for current field: bind and unbind listeners from previous related field
			this.getEventManager().fireGlobalDownEvent(event, target);
			return false;
		}
		return true;
	},

	/**
	 * Related field render handler
	 *
	 * @param field Field
	 */
	onRelatedFieldRender: function (field) {
		field.removeCls('field-trigger-default');

		field.on({
			beforefieldfocus: this.falseFn,
			beforefieldblur: this.falseFn
		});
	},

	/**
	 * Related field change handler
	 *
	 * @param sender Sender
	 * @param newValue New value
	 * @param oldValue Old value
	 * @param context Context
	 */
	onRelatedFieldChange: function (sender, newValue, oldValue, context) {
		this.getMasterField(context).fireEvent('updatemaster');
	},

	/**
	 * Related field apply action handler
	 *
	 * @param field Field
	 * @param target Target
	 * @param context Context
	 * @returns {boolean} False - prevent the default behaviour of plugin
	 */
	onRelatedFieldApplyAction: function (field, target, context) {
		var dirtyFields = this.getDirtyRelatedFields(context),
			masterField = this.getMasterField(context);

		if (this.isTargetInputElementOfRelatedField(target, context)) {
			// Specially disable the default behavior for supporting the other foreign plugins
			// if the field has the input focus and the ESC key was pressed
			return false;
		}

		if (dirtyFields.length) {
			masterField.fireEvent('groupdirtyvalue', this, dirtyFields);
		}
		return false;
	},

	/**
	 * Related field cancel action handler
	 *
	 * @param field Field
	 * @param target Target
	 * @param context Context
	 * @returns {boolean} False - prevent the default behaviour of plugin
	 */
	onRelatedFieldCancelAction: function (field, target, context) {
		var dirtyFields = this.getDirtyRelatedFields(context);

		if (this.isTargetInputElementOfRelatedField(target, context)) {
			// Specially disable the default behavior for supporting the other foreign plugins
			// if the field has the input focus and the ESC key was pressed
			return false;
		}

		if (dirtyFields.length) {
			Ext.Array.each(dirtyFields, function (dirtyField) {
				dirtyField.reset();
			});
		}
		return false;
	},

	/**
	 * Related field deactivate handler
	 *
	 * @param field Field
	 * @param target Target
	 * @param context Context
	 */
	onRelatedFieldDeactivate: function (field, target, context) {
		if (this.isTargetInputElementOfRelatedField(target, context) || !this.isValidRelatedFields(context)) {
			return;
		}
		this.changeState(true, context);
	},

	/**
	 * Master field update handler
	 */
	onMasterFieldUpdate: function (parameters) {
		var relatedFields = this.getRelatedFields(parameters.context),
			masterField = this.getMasterField(parameters.context),
			values = {};

		Ext.Array.each(relatedFields, function (field) {
			values[field.getName()] = field.getValue();
		});

		masterField.setValue(parameters.masterFieldTpl.apply(values).trim());
	},

	/**
	 * Master field focus handler
	 *
	 * @param field Master field
	 * @param event Event
	 * @param context Context
	 */
	onMasterFieldFocus: function (field, event, context) {
		this.changeState(false, context);
	},

	/**
	 * Get master field
	 *
	 * @param context Context
	 * @returns Master field
	 */
	getMasterField: function (context) {
		return context.masterField;
	},

	/**
	 * Get related fields
	 *
	 * @param context Context
	 * @returns {Array} Related fields
	 */
	getRelatedFields: function (context) {
		return context.relatedFields;
	},

	/**
	 * Get related dirty fields
	 *
	 * @param context Context
	 * @returns {Array} Related dirty fields
	 */
	getDirtyRelatedFields: function (context) {
		var relatedFields = this.getRelatedFields(context),
			dirtyFields = [];

		Ext.Array.each(relatedFields, function (relatedField) {
			relatedField.isDirty() && dirtyFields.push(relatedField);
		});
		return dirtyFields;
	},

	/**
	 * Bind to master before global down event listener
	 *
	 * @param bind True - bind, false - unbind
	 * @param context Context
	 */
	bindBeforeGlobalDownToMaster: function (bind, context) {
		var masterField = this.getMasterField(context);
		masterField[bind ? 'mon' : 'mun'](this.getEventManager(), 'beforeglobaldown', this.onBeforeGlobalDown, this, context);

		Ext.log({msg: '[GROUP_FIELD]: bindBeforeGlobalDownToMaster'}, ' >> ' + (bind ? 'bind' : 'unbind') + ' master field name: ' + masterField.getName());
	},

	/**
	 * Change state
	 *
	 * @param activateMaster True - activate master
	 * @param context Context
	 */
	changeState: function (activateMaster, context) {
		var masterField = this.getMasterField(context),
			relatedFields = this.getRelatedFields(context);

		Ext.suspendLayouts();

		masterField.setVisible(activateMaster);

		Ext.Array.each(relatedFields, function (field) {
			field.setVisible(!activateMaster);

			if (!activateMaster) {
				field.resetOriginalValue();

				// Set focus on the related head field
				field.groupFieldConfig.head && field.focus();
			}
		});

		Ext.resumeLayouts(true);

		// Bind/unbind event listener from master
		this.bindBeforeGlobalDownToMaster(!activateMaster, context);
	},

	/**
	 * Check validate related fields
	 *
	 * @param context Context
	 * @returns {boolean} Result
	 */
	isValidRelatedFields: function (context) {
		var result = true;
		Ext.Array.each(this.getRelatedFields(context), function (relatedField) {
			result &= relatedField.isValid();
		});
		return result;
	},

	/**
	 * Is target equal input element of related field
	 *
	 * @param target Target
	 * @param context Context
	 * @returns True - yes
	 */
	isTargetInputElementOfRelatedField: function (target, context) {
		// Maybe action applied on the field from the group
		return target && Ext.Array.findBy(
				this.getRelatedFields(context),
				function (relatedField) {
					return relatedField.inputEl.dom === target;
				}
			);
	},

	/**
	 * Is panel instance of Form Panel
	 *
	 * @private
	 * @param parent Parent
	 * @returns {boolean}
	 */
	isInstanceOfPanel: function (parent) {
		return parent instanceof Ext.form.Panel;
	},

	/**
	 * False function
	 * @returns {boolean} False
	 */
	falseFn: function () {
		return false;
	}
});