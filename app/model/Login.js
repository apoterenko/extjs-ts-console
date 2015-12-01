/**
 * ManagementConsole.model.Login
 */
Ext.define('ManagementConsole.model.Login', {
	extend: 'Ext.data.Model',

	requires: [
		'ManagementConsole.data.proxy.RestProxy'
	],

	// @inheritdoc
	idProperty: 'id',

	// @inheritdoc
	entityName: 'login',

	// @inheritdoc
	fields: [
		{
			name: 'id',
			type: 'int',
			persist: false
		},
		{
			name: 'login',
			type: 'string',
			persist: false
		},
		{
			name: 'password',
			type: 'string'
		}
	],

	// @inheritdoc
	proxy: {
		// @inheritdoc
		type: 'restproxy',

		// @inheritdoc
		noCache: true
	}
});