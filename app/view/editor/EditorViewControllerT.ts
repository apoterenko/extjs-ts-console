/// <reference path="../../../typings_fix/tsd.d.ts"/>
/**
 * EditorViewControllerT
 */
export class EditorViewControllerT extends Ext.app.ViewController {

	// @inheritdoc
	alias = ['controller.editor.view'];

	/**
	 * Editor view close handler
	 */
	onEditorViewClose() {
		this.fireEvent('closeeditor', this, this.getView());
	}
}