const layers = {
	All            : (layer, configLayer) => {},
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

const layerStates = {
	TextLayers  : (layer, configLayer) => {},
	HiddenLayers: (layer, configLayer) => {},
	LockedLayers: (layer, configLayer) => {},
	SymbolLayers: (layer, configLayer) => {},
	Exportable  : (layer, configLayer) => {}
};

export default{
	Layers     : layers,
	TextLayers : textLayers,
	LayerStates: layerStates
};
