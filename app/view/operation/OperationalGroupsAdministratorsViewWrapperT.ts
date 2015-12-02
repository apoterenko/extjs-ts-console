export import operationalGroupsAdministratorsViewT = require("./OperationalGroupsAdministratorsViewT");

/**
 * @class OperationalGroupsAdministratorsViewWrapperT
 */
export class OperationalGroupsAdministratorsViewWrapperT extends Ext.container.Container {

    /**
     * @inheritdoc
     */
    alias = ['widget.operational.groups.administrators.view.wrapper'];

    /**
     * @inheritdoc
     */
    title = 'АДМИНИСТРАТОРЫ';

    /**
     * @inheritdoc
     */
    layout = {

        /**
         * @inheritdoc
         */
        type: 'vbox',

        /**
         * @inheritdoc
         */
        align: 'stretch'
    };

    /**
     * @inheritdoc
     */
    items = {

        /**
         * @inheritdoc
         */
        xtype: 'operational.groups.administrators.view',

        /**
         * @inheritdoc
         */
        flex: 1
    };
}
