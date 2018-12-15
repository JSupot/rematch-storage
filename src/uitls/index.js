// 测试sessionStorage或localStorage是否可用
export function testStorage(storage) {
  if (storage) {
    try {
      storage.setItem('key', 'value');
      storage.removeItem('key');
      return true;
    } catch (e) {
      return false;
    }
  } else {
    return false;
  }
}

export function isListener(reducer) {
  return reducer.includes('/');
}

export function getStorageByKey(key, storageType = 'sessionStorage') {
  return JSON.parse(window[storageType].getItem(key));
}

export function setStorageByKey(key, value, storageType = 'sessionStorage') {
  window[storageType].setItem(key, JSON.stringify(value));
}
