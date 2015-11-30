/**
 * @class ManagementConsole.overrides.Injectable
 * Temporary solution
 */
Ext.define('ManagementConsole.overrides.Injectable', {
	doInjection: function () {
		if (this.inject) {
			Deft.Injector.inject(this.inject, this);
		}

		if (this.beforeCallParent) {
			this.beforeCallParent();
		}
	},
	constructor: function () {
		this.doInjection();
		this.callParent(arguments);
	},
	/**
	 * @protected
	 * @abstract
	 */
	beforeCallParent: function () {
	}
}, function () {
	var doInjection = ManagementConsole.overrides.Injectable.prototype.doInjection;

	Ext.define('ManagementConsole.overrides.Component', {
		override: 'Ext.Component',

		// @inheritdoc
		constructor: function () {
			doInjection.apply(this, arguments);
			this.callParent(arguments);
		}
	});
	Ext.define('ManagementConsole.overrides.BaseController', {
		override: 'Ext.app.BaseController',

		// @inheritdoc
		constructor: function () {
			doInjection.apply(this, arguments);
			this.callParent(arguments);
		}
	});
	Ext.define('ManagementConsole.overrides.Proxy', {
		override: 'Ext.data.proxy.Proxy',

		// @inheritdoc
		constructor: function () {
			doInjection.apply(this, arguments);
			this.callParent(arguments);
		}
	});
	Ext.define('ManagementConsole.overrides.AbstractPlugin', {
		override: 'Ext.AbstractPlugin',

		// @inheritdoc
		constructor: function () {
			doInjection.apply(this, arguments);
			this.callParent(arguments);
		}
	});
});