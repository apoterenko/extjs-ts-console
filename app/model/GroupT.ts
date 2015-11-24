/// <reference path="../../typings_fix/tsd.d.ts"/>

/**
 * @class GroupT
 */
export class GroupT extends Ext.data.Model {

	// @inheritdoc
	requires = [
		'ManagementConsole.data.proxy.RestProxy'
	];

	// @inheritdoc
	idProperty = 'id';

	// @inheritdoc
	entityName = 'group';

	// @inheritdoc
	fields = [
		{
			name: 'id',
			type: 'auto'
		},
		{
			name: 'text',
			type: 'string',
			mapping: 'name'
		},
		{
			name: 'name',
			type: 'string'
		},
		{
			name: 'has_children',
			type: 'bool'
		}
	];

	// @inheritdoc
	proxy = {
		// @inheritdoc
		type: 'restproxy',

		// @inheritdoc
		url: 'groups/{id}'
	};

	/**
	 * The method used to generate a URL at RestProxy class
	 * @override
	 *
	 * @returns {*|Number|String} Group id
	 */
	toString() {
		return this.getId();
	}
}