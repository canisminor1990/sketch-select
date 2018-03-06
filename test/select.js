const layers = {
	LayerName      : (layer, configLayer) => {
		return layer.name() === configLayer.name();
	},
	Width          : (layer, configLayer) => {
		return layer.frame().width() === configLayer.frame().width();
	},
	Height         : (layer, configLayer) => {
		return layer.frame().height() === configLayer.frame().height()
	},
	Fill           : (layer, configLayer) => {
		let configFills = firstVisible(configLayer.style(), 'fills');
		let layerFills  = firstVisible(layer.style(), 'fills');
		if (layerFills.fillType() === configFills.fillType()) {
			switch (layerFills.fillType()) {
				case 0:
					return layerFills.color().isEqual(configFills.color())
				case 1:
					return layerFills.gradient().gradientType() === configFills.gradient().gradientType() && JSON.stringify(layerFills.gradient().stops()) === JSON.stringify(configFills.gradient().stops())
				case 4:
					return layerFills.image().isEqual(configFills.image())
				case 5:
					return layerFills.noiseIntensity() === configFills.noiseIntensity()
			}
		}
		return false
	},
	BorderColor    : (layer, configLayer) => {
		let configBorders = firstVisible(configLayer.style(), 'borders');
		let layerBorders  = firstVisible(layer.style(), 'borders');
		return layerBorders.color().isEqual(configBorders.color())
	},
	BorderThickness: (layer, configLayer) => {
		let configBorders = firstVisible(configLayer.style(), 'borders');
		let layerBorders  = firstVisible(layer.style(), 'borders');
		return layerBorders.thickness() === configBorders.thickness()
	},
	Opacity        : (layer, configLayer) => {
		return layer.style().contextSettings().opacity() === configLayer.style().contextSettings().opacity();
	},
	BlendMode      : (layer, configLayer) => {
		return layer.style().contextSettings().blendMode() === configLayer.style().contextSettings().blendMode();
	}

};

const textLayers = {
	TextString: (layer, configLayer) => {
		return layer.stringValue().replace(/^\s+|\s+$/g, "") === configLayer.stringValue().replace(/^\s+|\s+$/g, "")
	},
	FontFamily: (layer, configLayer) => {
		return layer.fontPostscriptName() === configLayer.fontPostscriptName();
	},
	FontSize  : (layer, configLayer) => {
		return layer.fontSize() === configLayer.fontSize();
	},
	FontColor : (layer, configLayer) => {
		return layer.textColor().isEqual(configLayer.textColor())
	}
};

const layerTypes = {
	AllTypes    : (layer, configLayer) => {
		return true;
	},
	TextLayers  : (layer, configLayer) => {
		return layer.class() === MSTextLayer;
	},
	HiddenLayers: (layer, configLayer) => {
		return !layer.isVisible();
	},
	LockedLayers: (layer, configLayer) => {
		return layer.isLocked();
	},
	SymbolLayers: (layer, configLayer) => {
		return layer.class() === MSSymbolInstance
	},
	Exportable  : (layer, configLayer) => {
		return layer.exportOptions().exportFormats().count() > 0
	}
};

export default{
	Layers    : layers,
	TextLayers: textLayers,
	LayerTypes: layerTypes
};

function firstVisible(layer, type) {
	try {
		for (let i = 0; i < layer[type]().count(); i++) {
			let callback = layer[type]().objectAtIndex(i);
			if (callback.isEnabled()) {
				return callback;
			}
		}
	} catch (e) {
	}
	return false;
}


