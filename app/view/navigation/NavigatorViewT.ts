import interfaces = require("../IOperationTypeT");
import IOperationTypeT = interfaces.IOperationTypeT;
export import navigatorViewController = require("./NavigatorViewControllerT");

/**
 * @class NavigatorViewT
 */
export class NavigatorViewT extends Ext.panel.Panel {

	// @inheritdoc
	alias = ['widget.navigator.view'];

	// @inheritdoc
	controller:navigatorViewController.NavigatorViewControllerT = <any>'navigator.view';

	// @inheritdoc
	layout = {
		type: 'vbox',
		align: 'stretch'
	};

	// @inheritdoc
	border = false;

	// @inheritdoc
	ui = 'navigation';

	/**
	 * @inheritdoc
	 */
	plugins = 'responsive';

	// @inheritdoc
	responsiveConfig = {
		'width < 1400': {
			// @inheritdoc
			width: 74,

			// @private
			compactMode: true
		},

		'width >= 1400': {
			// @inheritdoc
			width: 192,

			// @private
			compactMode: false
		}
	};

	// @inheritdoc
	defaults = {
		// @inheritdoc
		xtype: 'button',

		// @inheritdoc
		scale: 'large',

		// @inheritdoc
		ui: 'navigation',

		// @inheritdoc
		textAlign: 'left'
	};

	items = [
		{
			text: 'GROUPS',
			cls: 'btn-collapse',
			iconCls: 'icon-groups',
			operationalModule: IOperationTypeT[IOperationTypeT.GROUPS],

			handler: 'showOperationalView'
		},
		{
			text: 'REPORTS',
			iconCls: 'icon-reports',
			operationalModule: IOperationTypeT[IOperationTypeT.REPORTS],

			/**
			 * The example of handler binding not by method name but by the method call.
			 * This approach is better for intelligence and type checking.
			 */
			handler: (scope)=> {
				this.controller.showOperationalView(scope);
			}
		},
		{
			xtype: 'box',
			flex: 1,
			cls: 'icon-powered'
		},
		{
			text: 'ABOUT PROGRAM',
			iconCls: 'icon-info'
		}
	];

	/**
	 * @private
	 */
	private setCompactMode(compact) {
		if (compact) {
			this.addCls('compact-mode');
		} else {
			this.removeCls('compact-mode');
		}
	}
}
