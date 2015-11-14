/**
 * @class ManagementConsole.overrides.Panel
 * The option "visibleCollapsePlaceholder" is added to the class.
 * It allows to completely hide the panel on slidIn functionality of the panel.
 */
Ext.define('ManagementConsole.overrides.Panel', {
	override: 'Ext.panel.Panel',

	/**
	 * Hide or show the placeholder property
	 */
	visibleCollapsePlaceholder: true,

	// @inheritdoc
	placeholderCollapse: function () {
		var me = this,
			placeholderEl;

		this.callParent(arguments);

		if (me.placeholder && this.visibleCollapsePlaceholder === false) {
			placeholderEl = me.placeholder.getEl();

			if (placeholderEl) {
				placeholderEl.slideIn = Ext.emptyFn;
			}
		}
		return me;
	},

	// @inheritdoc
	createReExpander: function () {
		var me = this.callParent(arguments);

		if (this.visibleCollapsePlaceholder === false) {
			me.width = 0;
		}
		return me;
	}
});