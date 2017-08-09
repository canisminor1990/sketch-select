const all = {
	All: (layer, configLayer) => {}
};

const layers = {
	LayerName      : (layer, configLayer) => {},
	Width          : (layer, configLayer) => {},
	Height         : (layer, configLayer) => {},
	Fill           : (layer, configLayer) => {},
	BorderColor    : (layer, configLayer) => {},
	BorderThickness: (layer, configLayer) => {},
	Opacity        : (layer, configLayer) => {},
	BlendMode      : (layer, configLayer) => {}

};

const textLayers = {
	TextString: (layer, configLayer) => {},
	FontFamily: (layer, configLayer) => {},
	FontSize  : (layer, configLayer) => {},
	FontColor : (layer, configLayer) => {}
};

const layerTypes = {
	All  : (layer, configLayer) => {},
	TextLayers  : (layer, configLayer) => {},
	HiddenLayers: (layer, configLayer) => {},
	LockedLayers: (layer, configLayer) => {},
	SymbolLayers: (layer, configLayer) => {},
	Exportable  : (layer, configLayer) => {}
};

export default{
	All        : all,
	Layers     : layers,
	TextLayers : textLayers,
	LayerTypes: layerTypes
};
