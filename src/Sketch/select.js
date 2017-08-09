const layers = {
	LayerName      : (layer, configLayer) => {return layer.name === configLayer.name;},
	Width          : (layer, configLayer) => {return true;},
	Height         : (layer, configLayer) => {return true;},
	Fill           : (layer, configLayer) => {return true;},
	BorderColor    : (layer, configLayer) => {return true;},
	BorderThickness: (layer, configLayer) => {return true;},
	Opacity        : (layer, configLayer) => {return true;},
	BlendMode      : (layer, configLayer) => {return true;}

};

const textLayers = {
	TextString: (layer, configLayer) => {return true;},
	FontFamily: (layer, configLayer) => {return true;},
	FontSize  : (layer, configLayer) => {return true;},
	FontColor : (layer, configLayer) => {return true;}
};

const layerTypes = {
	AllTypes    : (layer, configLayer) => {return true;},
	TextLayers  : (layer, configLayer) => {return layer.isText;},
	HiddenLayers: (layer, configLayer) => {return true;},
	LockedLayers: (layer, configLayer) => {return true;},
	SymbolLayers: (layer, configLayer) => {return true;},
	Exportable  : (layer, configLayer) => {return true;}
};

export default{
	Layers    : layers,
	TextLayers: textLayers,
	LayerTypes: layerTypes
};
