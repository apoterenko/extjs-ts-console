/**
 * ManagementConsole.logic.AccessManager
 */
Ext.define('ManagementConsole.logic.AccessManager', {

    /**
     * @public
     */
    checkAccess: function (module) {
        Ext.log({msg: 'Check access on module: "' + module + '"', level: 'log'});

        return true;
    }
});