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
    opt.types
  );
  const All = [];
  const Layers = [];
  let Filter = [];
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

  /*
	const Props = {
	  Name: ['name', 'id'],
	  Rect: ['x', 'y', 'width', 'height'],
	  Prototyping: ['text', 'alignment', 'lineSpacing', 'fixedWidth'],
	  Style: ['fillColor', 'fillType', 'borderColor', 'borderThickness'],
	  Symbol: ['symbolId'],
	};
	*/

  _.forEach(All, layer => {
    let save = true;
    if (!configs[layer.type]) save = false;

    if (save && opt.config.Name) {
      _.forEach(opt.config.Name, (value, key) => {
        if (layer[key] !== value) save = false;
      });
    }

    if (save && opt.config.Rect) {
      _.forEach(opt.config.Rect, (value, key) => {
        if (layer.frame[key] !== value) save = false;
      });
    }

    if (save && opt.config.Symbol) {
      _.forEach(opt.config.Symbol, (value, key) => {
        if (layer[key] !== value) save = false;
      });
    }

    if (save && opt.config.Prototyping) {
      _.forEach(opt.config.Prototyping, (value, key) => {
        if (key === 'text') {
          if (opt.config.Prototyping.textReg) {
            const reg = new RegExp(value);
            if (!reg.test(layer.text)) save = false;
          } else {
            if (layer.text !== value) save = false;
          }
        } else {
          if (layer[key] && layer[key] !== value) save = false;
        }
      });
    }

    if (save && opt.config.Style) {
      const Style = opt.config.Style;
      const fill = layer.style.fills[0];
      const border = layer.style.borders[0];
      if (save && Style.fillColor) {
        if (!fill) save = false;
        if (save && fill.color !== Style.fillColor) save = false;
      }
      if (save && Style.fillType) {
        if (!fill) save = false;
        if (save && fill.fill !== Style.fillType) save = false;
      }
      if (save && Style.borderColor) {
        if (!border) save = false;
        if (save && border.color !== Style.borderColor) save = false;
      }
      if (save && Style.borderThickness) {
        if (!border) save = false;
        if (save && border.thickness !== Style.borderThickness) save = false;
      }
    }

    if (save) Filter.push(layer);
  });

  console.log('Filter', JSON.stringify(Filter));

  return Filter;
};
