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
    checkedList: [],
    indeterminate: true,
    checkAll: false,
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
