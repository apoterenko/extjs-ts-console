/**
 * ManagementConsole.data.store.Administrators
 */
Ext.define('ManagementConsole.data.store.Administrators', {
	extend: 'Ext.data.Store',

	requires: [
		'ManagementConsole.model.Profile'
	],

	// @inheritdoc
	model: 'ManagementConsole.model.Profile',

	// @inheritdoc
	proxy: {

		/**
		 * @inheritdoc
		 */
		type: 'restproxy',

		// @inheritdoc
		url: 'groups/{id}/admins',

		// @inheritdoc
		reader: {

			// @inheritdoc
			type: 'json',

			// @inheritdoc
			rootProperty: 'items'
		}
	}
});