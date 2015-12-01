/**
 * @class ManagementConsole.service.TaskRunnerManager
 */
Ext.define('ManagementConsole.service.task.TaskRunnerManager', {

	// @inheritdoc
	requires: [
		'ManagementConsole.service.task.Task'
	],

	// @inheritdoc
	constructor: function () {
		this.callParent(arguments);

		this.tasks = {};
		this.running = {};
	},

	/**
	 * Register task
	 *
	 * @param id Task id
	 * @param callback Callback
	 * @returns {ManagementConsole.service.task.Task} task
	 */
	register: function (id, callback) {
		var MCT = ManagementConsole.service.task,
			task = this.getTask(id);

		if (!task) {
			task = this.tasks[id] = MCT.Task.makeInstance(callback);
			task.on('complete', this.onTaskComplete, this, {task: task, id: id});
			task.on('run', this.onTaskRun, this, {task: task, id: id});

			Ext.log({msg: '[TASK_RUNNER_MANAGER]: register'}, ' >> id: ' + id);
		}
		return task;
	},

	/**
	 * Unregister task
	 *
	 * @param id Task id
	 */
	unregister: function (id) {
		this.tasks[id] = null;
		this.running[id] = null;
	},

	/**
	 * Run task
	 *
	 * @param id Task id
	 * @param {Object} context Task context
	 * @param {Object} scope Scope
	 */
	run: function (id, context, scope) {
		var task;

		if (this.isRunning(id)) {
			Ext.log({msg: '[TASK_RUNNER_MANAGER]: run'}, ' >> the task "' + id + '" is running');
			return;
		}

		task = this.getTask(id);

		if (!task) {
			Ext.log({msg: '[TASK_RUNNER_MANAGER]: run'}, ' >> the task "' + id + '" is not found');
			return;
		}

		task.run(context, scope);

		Ext.log({msg: '[TASK_RUNNER_MANAGER]: run'}, ' >> the task "' + id + '" has started');
	},

	/**
	 * Get task
	 *
	 * @private
	 * @param id
	 * @returns {ManagementConsole.service.task.Task} task
	 */
	getTask: function (id) {
		return this.tasks[id];
	},

	/**
	 * Is the task running
	 *
	 * @private
	 * @param id Task id
	 * @returns {boolean} True - the task is running
	 */
	isRunning: function (id) {
		return this.running[id] === true;
	},

	/**
	 * Task complete handler
	 *
	 * @private
	 * @param sender Sender
	 * @param config Config
	 */
	onTaskComplete: function (sender, config) {
		var taskId = config.id;
		this.running[taskId] = false;

		Ext.log({msg: '[TASK_RUNNER_MANAGER]: on task complete'}, ' >> the task "' + taskId + '" is completed');
	},

	/**
	 * Task run handler
	 *
	 * @private
	 * @param sender Sender
	 * @param config Config
	 */
	onTaskRun: function (sender, config) {
		var taskId = config.id;
		this.running[taskId] = true;
	}
});