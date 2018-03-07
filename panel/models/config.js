const Checked = type => ({
  [type]: '',
  [`${type}Checked`]: false,
});
const Switch = type => ({
  [`${type}Switch`]: false,
});

const defaultConfig = {
  ...Switch('global'),
  ...Checked('type'),
  ...Checked('name'),
  ...Checked('id'),
  // rect
  ...Checked('x'),
  ...Checked('y'),
  ...Checked('width'),
  ...Checked('height'),
  // text
  ...Checked('text'),
  ...Switch('textReg'),
  ...Checked('alignment'),
  ...Checked('lineSpacing'),
  ...Checked('fixedWidth'),
  // shape
  ...Checked('fillColor'),
  ...Checked('fillType'),
  ...Checked('borderColor'),
  ...Checked('borderThickness'),
  // symbol
  ...Checked('symbolId'),
  // other
  ...Switch('exportable'),
  ...Switch('hide'),
  ...Switch('lock'),
};
export default {
  namespace: 'config',

  state: {
    page: 'Any',
    ...defaultConfig,
  },

  reducers: {
    updateSuccess(state, action) {
      const payload = action.payload;
      return { ...state, ...payload };
    },
    reset(state, action) {
      return { ...state, ...defaultConfig };
    },
  },

  effects: {
    *update(action, { put }) {
      const payload = action.payload;
      console.log('update', payload);
      yield put({ type: 'updateSuccess', payload });
    },
  },
};
