/**
 * ManagementConsole.logic.DataManager
 */
Ext.define('ManagementConsole.logic.DataManager', {
    extend: 'ManagementConsole.overrides.Injectable',
    requires: [
        'ManagementConsole.model.Login',
        'ManagementConsole.model.Account',
        'ManagementConsole.model.Profile',
        'ManagementConsole.logic.group.GroupDataManager',
        'ManagementConsole.logic.ExceptionProcessor'
    ],

    /**
     * @private
     */
    inject: [
        'restConfig',
        'groupDataManager',
        'exceptionProcessor'
    ],

    /**
     * @inherited
     */
    config: {
        /**
         * Rest config
         */
        restConfig: null,

        /**
         * Group data manager
         */
        groupDataManager: null,

        /**
         * Exception processor
         */
        exceptionProcessor: null
    },

    /**
     * Do load group data
     */
    loadGroupData: function () {
        this.loadAccount.apply(this, arguments);
    },

    /**
     * Do load account
     *
     * @private
     * @param callback Callback
     * @param scope Scope
     */
    loadAccount: function (callback, scope) {
        var account = Ext.create('ManagementConsole.model.Account');

        account.load({
            params: {
                login: 'alexander.poterenko@acronis.com'
            },
            scope: {
                me: this,
                callback: callback,
                scope: scope
            },
            callback: this.onSuccessLoadAccount
        });
    },

    /**
     * Load account handler
     *
     * @private
     */
    onSuccessLoadAccount: function (account) {
        var me = this.me,
            login;

        me.getRestConfig().setHost(account.get('server_url'));

        login = Ext.create('ManagementConsole.model.Login', {
            username: account.get('login'),
            password: 'IQgd9ax'
        });

        login.save({
            scope: this,
            success: me.onSuccessLogin,
            failure: me.onFailureLogin
        });
    },

    /**
     * Failure login callback
     *
     * @param {Ext.data.Model} model Model
     * @param {Ext.data.operation.Operation} operation Operation
     * @private
     */
    onFailureLogin: function (model, operation) {
        var me = this.me;
        me.getExceptionProcessor().process(operation);
    },

    /**
     * Success login callback
     *
     * @private
     */
    onSuccessLogin: function () {
        var profile = Ext.create('ManagementConsole.model.Profile');

        profile.load({
            scope: this,
            success: this.me.onSuccessLoadProfile
        });
    },

    /**
     * Success load profile callback
     *
     * @private
     */
    onSuccessLoadProfile: function (profile) {
        this.me.getGroupDataManager().load(
            this.callback,
            this.scope,
            {
                id: profile.get('group').id // TODO get from model instance
            }
        );
    },

    /**
     * @public
     */
    loadReportData: function () {
        // TODO
    }
});
