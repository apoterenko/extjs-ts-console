/**
 * ManagementConsole.logic.RouteManager
 */
Ext.define('ManagementConsole.logic.RouteManager', {
    extend: 'ManagementConsole.overrides.Injectable',
    /**
     * @private
     */
    inject: [
        'application'
    ],

    /**
     * @inherited
     */
    config: {
        /**
         * Application
         */
        application: null
    },

    /**
     * @public
     *
     * @param {ManagementConsole.logic.entity.Exception} error Error
     */
    goErrorPage: function (error) {
        this.redirectTo('error');
    },

    /**
     * @public
     */
    goGroupPage: function () {
        // TODO
        Ext.defer(function () {
            this.redirectTo('group');
        }, 1000, this);
    },

    /**
     * @private
     * @param {String} token Token
     */
    redirectTo: function (token) {
        this.getApplication().redirectTo(token)
    }
});
