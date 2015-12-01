/**
 * ManagementConsole.model.Profile
 */
Ext.define('ManagementConsole.model.Profile', {
	extend: 'Ext.data.Model',

	requires: [
		'ManagementConsole.data.proxy.RestProxy'
	],

	// @inheritdoc
	idProperty: 'id',

	// @inheritdoc
	entityName: 'profile',

	// @inheritdoc
	fields: [
		{
			name: 'id',
			type: 'int',
			persist: false
		},
		{
			name: 'group'
		},
		{
			name: 'login',
			type: 'string'
		},
		{
			name: 'lastname',
			type: 'string'
		},
		{
			name: 'firstname',
			type: 'string'
		},
		{
			name: 'language',
			type: 'string'
		},
		{
			name: 'email',
			type: 'string'
		},
		{
			name: 'status',
			type: 'int'
		},
		{
			name: 'notifications_backup',
			type: 'int'
		},
		{
			name: 'version',
			type: 'int',
			persist: false
		}
	],

	// @inheritdoc
	proxy: {
		// @inheritdoc
		type: 'restproxy',

		// @inheritdoc
		api: {
			create: 'profile/{id}',
			read: 'profile',
			update: 'admins/{id}',
			destroy: 'profile/{id}'
		},

		// @inheritdoc
		writer: {

			// @inheritdoc
			type: 'json',

			// @inheritdoc
			writeRecordId: false
		}
	}
});