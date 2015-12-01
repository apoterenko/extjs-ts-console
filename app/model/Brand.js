/**
 * ManagementConsole.model.Brand
 */
Ext.define('ManagementConsole.model.Brand', {
	extend: 'Ext.data.Model',

	requires: [
		'ManagementConsole.data.proxy.RestProxy'
	],

	// @inheritdoc
	entityName: 'brand',

	// @inheritdoc
	fields: [
		{
			name: 'color',
			type: 'string'
		},
		{
			name: 'color_scheme',
			type: 'string'
		}
	],

	// @inheritdoc
	proxy: {
		// @inheritdoc
		type: 'restproxy',

		// @inheritdoc
		url: 'groups/{id}/brand'
	}
});