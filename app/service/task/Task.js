/**
 * @class ManagementConsole.service.task.Task
 *
 * Clients of this class must call the public methods, such as:
 *
 * 1) fireComplete - it called when the task is finished
 * 2) run - it called when the task should run
 */
Ext.define('ManagementConsole.service.task.Task', {

	// @inheritdoc
	statics: {

		/**
		 * Factory method
		 * @param {Function} task Function
		 * @returns {ManagementConsole.service.task.Task}
		 */
		makeInstance: function (task) {
			return Ext.create('ManagementConsole.service.task.Task', {
				task: task
			});
		}
	},

	// @inheritdoc
	mixins: {
		observable: 'Ext.util.Observable'
	},

	// @inheritdoc
	constructor: function (config) {
		this.mixins.observable.constructor.call(this, config);
		this.callParent(arguments);

		this.addEvents('complete');
	},

	/**
	 * Complete the task handler
	 */
	fireComplete: function () {
		this.fireEvent('complete', this);
	},

	/**
	 * Run the task
	 * @param {Object} context Task context
	 * @param {Object} scope Scope
	 */
	run: function (context, scope) {
		Ext.callback(this.task, scope || this, [context]);

		this.fireEvent('run', this);
	}
});