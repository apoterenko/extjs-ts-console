/**
 * @class ManagementConsole.plugin.form.field.LabelledSlider
 */
Ext.define('ManagementConsole.plugin.form.field.LabelledSlider', {
	extend: 'Ext.AbstractPlugin',

	// @inheritdoc
	alias: 'plugin.labelled.slider',

	/**
	 * Slider label template
	 */
	labelTemplate: '<div class="slider-label" style="float: left; text-align: {1};">{0}</div>',

	// @inheritdoc
	init: function (field) {
		var sliderConfig = field.labelledSliderConfig,
			labelsArray = sliderConfig.labels,
			labelsCount = labelsArray.length,
			labelsTpl,
			me = this;

		field.increment = 1;
		field.minValue = 0;
		field.maxValue = labelsArray.length - 1;

		labelsTpl = Ext.Array.map(labelsArray, function (label, index) {
			return Ext.String.format(me.labelTemplate,
				label,
				index === 0 ? 'left' : index === labelsCount - 1 ? 'right' : 'center'
			);
		});

		labelsTpl.splice(0, 0, Ext.String.format('<div class="labelled-slider-title">{0}</div>', sliderConfig.title));
		labelsTpl.push('<div style="clear: both;"></div>');

		field.preSubTpl = labelsTpl.join('');

		field.on({
			changecomplete: this.onFieldChangecomplete,
			render: this.onFieldRender,
			scope: this
		});
		field.on('resize', this.adjustSize, this, field);
	},

	/**
	 * @private
	 * @param field Field
	 */
	onFieldRender: function (field) {
		field.__labelsEls = field.getEl().select('.slider-label');

		this.adjustSize(field);
	},

	/**
	 * @private
	 * @param field Field
	 */
	onFieldChangecomplete: function (field) {
		field.fireEvent('new-value', field, this.toSliderValue(field));
	},

	/**
	 * @private
	 * @param field Field
	 */
	toSliderValue: function (field) {
		var sliderConfig = field.labelledSliderConfig,
			valuesArray = sliderConfig.values,
			value = field.getValue();

		return valuesArray ? valuesArray[value] : value;
	},

	/**
	 * @private
	 * @param field Field
	 */
	adjustSize: function (field) {
		var totalWidth = field.getWidth(),
			labelsEls = field.__labelsEls,
			labelsCount,
			centerLabelWidth;

		if (!field.rendered) {
			return;
		}

		labelsCount = labelsEls.getCount();
		centerLabelWidth = totalWidth / (labelsCount - 1);

		labelsEls.each(function (element, scope, index) {
			var currentWidth = centerLabelWidth;

			element.setWidth(
				index === 0 || index === labelsCount - 1 ? currentWidth / 2 : currentWidth
			);
		});
	}
});