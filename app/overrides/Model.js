/**
 * @class ManagementConsole.overrides.Model
 */
Ext.define('ManagementConsole.overrides.Model', {
	override: 'Ext.data.Model',

	mixins: ['Ext.mixin.Observable'],

	// @inheritdoc
	config: {

		/**
		 * If the record has an existing ID, but the record not loaded yet
		 * @private
		 */
		newest: null
	},

	// @override
	constructor: function () {
		this.mixins.observable.constructor.apply(this, arguments);
		this.callParent(arguments);
	},

	/**
	 * @override
	 * @param {Object} config Config
	 */
	load: function (config) {
		var me = this,
			callback = function () {
				me.setNewest(false);
				me.fireEvent('load', me);
			};

		config = config || {};

		if (config.callback) {
			config.callback = Ext.Function.createSequence(config.callback, callback, config.scope || me);
		} else {
			config.callback = callback;
		}
		return this.callParent([config]);
	}
});