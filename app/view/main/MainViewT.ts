/// <reference path="../../../typings_fix/tsd.d.ts"/>
export import navigatorViewT = require("../navigation/NavigatorViewT");
export import operationalViewT = require("../operation/OperationalViewT");

/**
 * @MainViewT
 */
export class MainViewT extends Ext.container.Container {

    /**
     * @inheritdoc
     */
    alias = ['widget.main.view'];

    /**
     * @inheritdoc
     */
    requires = [
        'Ext.layout.container.Border'
    ];

    /**
     * @inheritdoc
     */
    layout = 'border';

    /**
     * @inheritdoc
     */
    items = [
        {
            /**
             * @inheritdoc
             */
            xtype: 'navigator.view',

            /**
             * @inheritdoc
             */
            region: 'west',

            /**
             * @inheritdoc
             */
            title: 'Acronis'
        },
        {
            /**
             * @inheritdoc
             */
            xtype: 'operational.view',

            /**
             * @inheritdoc
             */
            region: 'center'
        }
    ];
}
