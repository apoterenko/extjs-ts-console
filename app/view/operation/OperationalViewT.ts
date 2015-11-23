/// <reference path="../../../typings_fix/tsd.d.ts"/>
export import operationalGroupsViewT = require("./OperationalGroupsViewT");
export import operationalReportsViewT = require("./OperationalReportsViewT");

/**
 * @class OperationalViewT
 */
export class OperationalViewT extends Ext.container.Container {

	// @inheritdoc
	alias = ['widget.operational.view'];

	// @inheritdoc
	requires = [
		'Ext.layout.container.Card'
	];

	// @inheritdoc
	layout = 'card';

	// @inheritdoc
	items = [
		{
			// @inheritdoc
			xtype: 'operational.groups.view'
		},
		{
			// @inheritdoc
			xtype: 'operational.reports.view'
		}
	];
}