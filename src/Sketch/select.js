const layers = {
	LayerName      : (layer, configLayer) => {
		return layer.name === configLayer.name;
	},
	Width          : (layer, configLayer) => {
		return layer.frame.width === configLayer.frame.width;
	},
	Height         : (layer, configLayer) => {
		return layer.frame.height === configLayer.frame.height
	},
	Fill           : (layer, configLayer) => {
		let configFills = firstVisible(configLayer.style.sketchObject, 'fills');
		let layerFills  = firstVisible(layer.style.sketchObject, 'fills');
		if (layerFills.fillType() === configFills.fillType()) {
			switch (layerFills.fillType()) {
				case 0:
					return layerFills.color().isEqual(configFills.color())
				case 1:
					return layerFills.gradient().gradientType() === configFills.gradient().gradientType() &&
						JSON.stringify(layerFills.gradient().stops()) === JSON.stringify(configFills.gradient().stops())
				case 4:
					return layerFills.image().isEqual(configFills.image())
				case 5:
					return layerFills.noiseIntensity() === configFills.noiseIntensity()
			}
		}
		return false
	},
	BorderColor    : (layer, configLayer) => {
		let configBorders = firstVisible(configLayer.style.sketchObject, 'borders');
		let layerBorders  = firstVisible(layer.style.sketchObject, 'borders');
		return layerBorders.color().isEqual(configBorders.color())
	},
	BorderThickness: (layer, configLayer) => {
		let configBorders = firstVisible(configLayer.style.sketchObject, 'borders');
		let layerBorders  = firstVisible(layer.style.sketchObject, 'borders');
		return layerBorders.thickness() === configBorders.thickness()
	},
	Opacity        : (layer, configLayer) => {
		return layer.style.sketchObject.contextSettings().opacity() === configLayer.style.sketchObject.contextSettings().opacity();
	},
	BlendMode      : (layer, configLayer) => {
		return layer.style.sketchObject.contextSettings().blendMode() === configLayer.style.sketchObject.contextSettings().blendMode();
	}
	
};

const textLayers = {
	TextString: (layer, configLayer) => {
		return layer.text.replace(/^\s+|\s+$/g, "") === configLayer.text.replace(/^\s+|\s+$/g, "")
	},
	FontFamily: (layer, configLayer) => {
		return layer.sketchObject.fontPostscriptName() === configLayer.sketchObject.fontPostscriptName();
	},
	FontSize  : (layer, configLayer) => {
		return layer.sketchObject.fontSize() === configLayer.sketchObject.fontSize();
	},
	FontColor : (layer, configLayer) => {
		return layer.sketchObject.textColor() === configLayer.sketchObject.textColor();
		;
	}
};

const layerTypes = {
	AllTypes    : (layer, configLayer) => {
		return true;
	},
	TextLayers  : (layer, configLayer) => {
		return layer.isText;
	},
	HiddenLayers: (layer, configLayer) => {
		return !layer.sketchObject.isVisible();
	},
	LockedLayers: (layer, configLayer) => {
		return layer.sketchObject.isLocked();
	},
	SymbolLayers: (layer, configLayer) => {
		return (layer.sketchObject.symbolMaster().name()) ? true : false;
	},
	Exportable  : (layer, configLayer) => {
		return true;
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