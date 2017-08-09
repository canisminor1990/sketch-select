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
		let configFills = firstVisible(configLayer.style.sketchObject,'fills');
		let layerFills  = firstVisible(layer.style.sketchObject,'fills');
		try {
			if (layerFills.fillType() === configFills.fillType()) {
				switch (layerFills.fillType()) {
					case 0:
						if (layerFills.color().isEqual(configFills.color())) return true
						break
					case 1:
						if (layerFills.gradient().gradientType() === configFills.gradient().gradientType() &&
							JSON.stringify(layerFills.gradient().stops()) === JSON.stringify(configFills.gradient().stops())) return true
						break
					case 4:
						if (layerFills.image().isEqual(configFills.image())) return true
						break
					case 5:
						if (layerFills.noiseIntensity() === configFills.noiseIntensity())return true
				}
			}
		} catch (e) {
		
		}
		return false
	},
	BorderColor    : (layer, configLayer) => {
		return true;
	},
	BorderThickness: (layer, configLayer) => {
		return true;
	},
	Opacity        : (layer, configLayer) => {
		return true;
	},
	BlendMode      : (layer, configLayer) => {
		return true;
	}
	
};

const textLayers = {
	TextString: (layer, configLayer) => {
		return true;
	},
	FontFamily: (layer, configLayer) => {
		return true;
	},
	FontSize  : (layer, configLayer) => {
		return true;
	},
	FontColor : (layer, configLayer) => {
		return true;
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
		return true;
	},
	LockedLayers: (layer, configLayer) => {
		return true;
	},
	SymbolLayers: (layer, configLayer) => {
		return true;
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

function firstVisible(layer,type) {
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