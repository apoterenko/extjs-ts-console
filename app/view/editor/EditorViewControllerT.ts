/// <reference path="../../../typings_fix/tsd.d.ts"/>

/**
 * @class EditorViewControllerT
 */
export class EditorViewControllerT extends Ext.app.ViewController {

	// @inheritdoc
	alias = 'controller.editor.view';

	onEditorViewClose() {
		this.fireEvent('closeeditor', this, this.getView());
	}
}