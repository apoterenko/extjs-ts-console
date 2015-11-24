/**
 * ManagementConsole.model.Account
 */
Ext.define('ManagementConsole.model.Account', {
	extend: 'Ext.data.Model',

	requires: [
		'ManagementConsole.data.proxy.RestProxy'
	],

	// @inheritdoc
	entityName: 'account',

	// @inheritdoc
	fields: [
		{
			name: 'login',
			type: 'string'
		},
		{
			name: 'server_url',
			type: 'string'
		}
	],

	// @inheritdoc
	proxy: {
		// @inheritdoc
		type: 'restproxy',

		// @inheritdoc
		url: 'accounts',

		// @inheritdoc
		noCache: true,

		// @inheritdoc
		cors: false
	}
});