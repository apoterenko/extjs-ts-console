/**
 * ManagementConsole.model.Storage
 */
Ext.define('ManagementConsole.model.Storage', {
	extend: 'Ext.data.Model',

	// @inheritdoc
	idProperty: 'id',

	// @inheritdoc
	entityName: 'storage',

	// @inheritdoc
	fields: [
		{
			name: 'id',
			type: 'int'
		},
		{
			name: 'name',
			type: 'string'
		},
		{
			name: 'space_usage',
			type: 'string'
		}
	]
});