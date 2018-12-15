import { testStorage, isListener, setStorageByKey, getStorageByKey } from './utils';

const StoragePlugin = {
  onModel(model) {
    const {
      useSession = false, useLocal = false, name, reducers = {},
    } = model;
    const modelReducers = {};
    const storageKey = `REDUCE_${name}`;
    function combinedReducerByStorage(state = model.state, action) {
      if (typeof modelReducers[action.type] === 'function') {
        const storageType = useSession ? 'sessionStorage' : 'localStorage';
        const storageValue = getStorageByKey(storageKey, storageType) || state;

        // 计算出新的storage的值
        const newStorageValue = modelReducers[action.type](storageValue, action.payload, action.meta);
        setStorageByKey(storageKey, newStorageValue, storageType);
        return storageValue;
      }
      return state;
    }

    if (useSession === true || useLocal === true) {
      // 使用storage的值进行初始化, sessionStorage的优先级高于LocalStorage
      const storageType = useSession ? 'sessionStorage' : 'localStorage';
      model.state = getStorageByKey(storageKey, storageType) || model.state;

      if (testStorage(window.sessionStorage)) {
        Object.keys(reducers).forEach((modelReducer) => {
          const action = isListener(modelReducer) ? modelReducer : `${name}/${modelReducer}`;
          modelReducers[action] = model.reducers[modelReducer];
        });

        model.baseReducer = combinedReducerByStorage;
      }
    }
  },
};

export default StoragePlugin;
