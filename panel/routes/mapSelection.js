export default data => {
  return {
    ...map(data, 'type'),
    ...map(data, 'name'),
    ...map(data, 'id'),
    ...mapFrame(data, 'x'),
    ...mapFrame(data, 'y'),
    ...mapFrame(data, 'width'),
    ...mapFrame(data, 'height'),
    ...map(data, 'text'),
    ...map(data, 'alignment'),
    ...map(data, 'lineSpacing'),
    ...map(data, 'fixedWidth'),
    ...mapStyle(data, 'fillColor', 'fills', 'color'),
    ...mapStyle(data, 'fillType', 'fills', 'fill'),
    ...mapStyle(data, 'borderColor', 'borders', 'color'),
    ...mapStyle(data, 'borderThickness', 'borders', 'thickness'),
    ...map(data, 'symbolId'),
  };
};

function map(data, key, dataKey) {
  try {
    return {
      [key]: data[dataKey || key],
    };
  } catch (e) {}
}

function mapFrame(data, key) {
  try {
    return {
      [key]: data.frame[key],
    };
  } catch (e) {}
}

function mapStyle(data, key, type, dataKey) {
  try {
    return {
      [key]: data.style[type][0][dataKey],
    };
  } catch (e) {}
}
