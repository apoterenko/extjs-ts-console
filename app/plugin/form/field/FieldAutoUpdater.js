/**
 * @class ManagementConsole.plugin.form.field.FieldAutoUpdater
 */
Ext.define('ManagementConsole.plugin.form.field.FieldAutoUpdater', {
	extend: 'Ext.AbstractPlugin',

	// @inheritdoc
	alias: 'plugin.field.auto.updater',

	// @inheritdoc
	init: function (field) {
		this.callParent(arguments);

		field.on('dirtyvalue', this.onFieldDirtyValue, this);
	},

	/**
	 * Field dirty value handler
	 *
	 * @private
	 * @param {Ext.form.field.Field} field Field
	 */
	onFieldDirtyValue: function (field) {
		var form = field.findParentBy(this.isInstanceOfPanel),
			formRecord = form ? form.getRecord() : null,
			fieldValue = field.getValue(),
			modelVersion,
			operationConfig;

		if (formRecord && !formRecord.phantom) {
			operationConfig = {
				params: {}
			};

			modelVersion = formRecord.get('version');
			if (!Ext.isEmpty(modelVersion)) {
				operationConfig.params.version = modelVersion;
			}

			if (field.fireEvent('beforeupdate', field, fieldValue) !== false) {
				formRecord.set(field.getName(), fieldValue);
				formRecord.save(operationConfig);
			}
		}
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
	}
});