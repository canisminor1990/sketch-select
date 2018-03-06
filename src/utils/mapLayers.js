import _ from 'lodash';

export default (page, opt = {}) => {
  const configs = _.assign(
    {
      Artboard: false,
      Page: false,
      Group: false,
      Text: false,
      Shape: false,
      Image: false,
      SymbolInstance: false,
      SymbolMaster: false,
      SymbolOverride: false,
    },
    opt
  );
  const All = [];
  const Layers = [];
  const Filter = [];
  const mapLayers = layers => {
    _.forEach(layers, layer => {
      All.push(layer);
      if (!layer.layers) {
        Layers.push(layer);
      } else {
        mapLayers(layer.layers);
      }
    });
  };

  mapLayers(page.layers);

  _.forEach(All, layer => {
    if (configs[layer.type]) Filter.push(layer);
  });

  return {
    all: All,
    layers: Layers,
    filter: Filter,
  };
};
