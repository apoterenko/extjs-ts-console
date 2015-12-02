/// <reference path="../../../typings_fix/tsd.d.ts"/>
/**
 * OperationalGroupsAdministratorsViewControllerT
 */
export class OperationalGroupsAdministratorsViewControllerT extends Ext.app.ViewController {

    /**
     * @inheritdoc
     */
    alias = ['controller.operational.groups.administrators'];

    /**
     * Item click handler
     * @param scope Scope
     * @param record Record
     */
    onItemClick(scope, record) {
        if (this.previousSelectedRecord === record) {
            this.fireEvent('open-editor', this, record);
        }
        this.previousSelectedRecord = record;
    }

    private previousSelectedRecord;
}
