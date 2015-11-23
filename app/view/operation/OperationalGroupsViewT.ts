/// <reference path="../../../typings_fix/tsd.d.ts"/>
export import operationalGroupsTreeViewT = require("./OperationalGroupsTreeViewT");
export import operationalGroupsPropertiesViewWrapperT = require("./OperationalGroupsPropertiesViewWrapperT");

/**
 * @class OperationalGroupsViewT
 */
export class OperationalGroupsViewT extends Ext.container.Container {

	// @inheritdoc
	alias = ['widget.operational.groups.view'];

	// @inheritdoc
	requires = [
		'Ext.layout.container.Border'
	];

	// @inheritdoc
	layout = 'border';

	// @inheritdoc
	items = [
		{
			// @inheritdoc
			xtype: 'operational.groups.tree.view',

			// @inheritdoc
			flex: 3,

			// @inheritdoc
			title: 'Groups',

			// @inheritdoc
			region: 'west',

			// @inheritdoc
			collapsible: true,

			// @private
			visibleCollapsePlaceholder: false
		},
		{
			// @inheritdoc
			xtype: 'operational.groups.properties.view.wrapper',

			// @inheritdoc
			flex: 10,

			// @inheritdoc
			region: 'center'
		}
	];
}