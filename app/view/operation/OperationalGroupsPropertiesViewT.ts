export import operationalGroupsAdministratorsViewWrapperT = require("./OperationalGroupsAdministratorsViewWrapperT");

/**
 * @class OperationalGroupsPropertiesViewT
 */
export class OperationalGroupsPropertiesViewT extends Ext.tab.Panel {

    /**
     * @inheritdoc
     */
    alias = ['widget.operational.groups.properties.view'];

    /**
     * @inheritdoc
     */
    ui = 'property';

    /**
     * @inheritdoc
     */
    border = false;

    /**
     * @inheritdoc
     */
    defaults = {

        /**
         * @inheritdoc
         */
        xtype: 'box',

        /**
         * @inheritdoc
         */
        ui: 'property-item'
    };

    /**
     * @inheritdoc
     */
    items = [
        {
            xtype: 'operational.groups.administrators.view.wrapper'
        },
        {
            title: 'СВОЙСТВА'
        },
        {
            title: 'ХРАНИЛИЩЕ'
        },
        {
            title: 'ФИРМЕННОЕ ОФОРМЛЕНИЕ'
        },
        {
            title: 'ЦЕНЫ'
        }
    ];
}
