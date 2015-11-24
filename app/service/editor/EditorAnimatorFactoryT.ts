/// <reference path="../../../typings_fix/tsd.d.ts"/>

/**
 * @class EditorAnimatorFactoryT
 */
export class EditorAnimatorFactoryT {

	private animatorCls = 'Ext.fx.Anim';
	private showDurationTime = 450;
	private hideDurationTime = 200;

	animationShow(config:any) {
		var editor = config.target,
			viewWidthSize = config.view.getWidth();

		Ext.create(this.animatorCls, Ext.apply({
			duration: this.showDurationTime,
			from: {
				left: viewWidthSize
			},
			to: {
				left: viewWidthSize - editor.width
			}
		}, config));
	}

	animationHide(config:any) {
		var editor = config.target,
			viewWidthSize = config.view.getWidth();

		Ext.create(this.animatorCls, Ext.apply({
			duration: this.hideDurationTime,
			from: {
				left: viewWidthSize - editor.width
			},
			to: {
				left: viewWidthSize
			}
		}, config));
	}
}