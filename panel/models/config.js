const Checked = type => ({
  [type]: '',
  [`${type}Checked`]: false,
});
const Switch = type => ({
  [`${type}Switch`]: false,
});
export default {
  namespace: 'config',

  state: {
    ...Switch('global'),
    ...Checked('type'),
    ...Checked('name'),
    ...Checked('x'),
    ...Checked('y'),
    ...Checked('width'),
    ...Checked('height'),
    // text
    ...Checked('content'),
    ...Switch('contentReg'),
    ...Checked('typeface'),
    ...Checked('weight'),
    ...Checked('size'),
    ...Checked('alignment'),
    ...Checked('spacing'),
    ...Checked('color'),
    // shape
    ...Checked('fills'),
    ...Checked('borders'),
    ...Checked('opacity'),
    ...Checked('blending'),
    ...Checked('shadows'),
    ...Checked('innerShadows'),
    ...Checked('gaussianBlur'),
    // other
    ...Checked('exportable'),
    ...Checked('hidden'),
  },

  reducers: {
    updateSuccess(state, action) {
      const payload = action.payload;
      return { ...state, ...payload };
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
