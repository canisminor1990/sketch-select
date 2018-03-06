import _ from 'lodash';

export default layers => {
  try {
    _.forEach(layers, layer => (layer.selected = true));
  } catch (e) {
    console.log(e);
  }
};
