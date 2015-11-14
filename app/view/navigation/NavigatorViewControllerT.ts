/// <reference path="../../../typings_fix/tsd.d.ts"/>
/**
 * @class NavigatorViewControllerT
 */
export class NavigatorViewControllerT extends Ext.app.ViewController {

	// @inheritdoc
	alias = ['controller.navigator.view'];

	/**
	 * Show operational view
	 */
	showOperationalView(scope) {
		this.fireEvent('operationalmodule', this, scope.operationalModule);
	}
}