/**
 * ManagementConsole.data.store.Groups
 */
Ext.define('ManagementConsole.data.store.Groups', {
	extend: 'Ext.data.TreeStore',

	// @inheritdoc
	model: 'ManagementConsole.model.GroupT',

	// @inheritdoc
	proxy: {
		// @inheritdoc
		type: 'restproxy',

		// @inheritdoc
		url: 'groups/{node}/children',

		// @inheritdoc
		reader: {
			// @inheritdoc
			type: 'json',

			// @inheritdoc
			rootProperty: 'items'
		}
	}
});