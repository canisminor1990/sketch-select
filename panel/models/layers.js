const defaultConfig = {
  checkedList: [],
  indeterminate: false,
  checkAll: false,
};

export default {
  namespace: 'layers',

  state: {
    options: [
      'Artboard',
      'Page',
      'Group',
      'Text',
      'Shape',
      'Image',
      'SymbolInstance',
      'SymbolMaster',
      'SymbolOverride',
    ],
    ...defaultConfig,
  },

  reducers: {
    reset(state, action) {
      return { ...state, ...defaultConfig };
    },
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
