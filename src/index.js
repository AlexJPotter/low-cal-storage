import { convertKeysFromLowCal, convertKeysToLowCal } from './lowCalHelpers.js';
import {
  cloneValue,
  isNull,
  isObject,
  isUndefined,
  isValidObjectKey,
} from './helpers.js';

const setItem = (key, value) => {
  if (!isValidObjectKey(key)) {
    throw new TypeError('Provided key was not valid. Key: ' + key);
  }

  if (isUndefined(value)) {
    throw new TypeError('undefined is not a valid value.');
  } else if (!isNull(value) && isObject(value)) {
    const valueClone = cloneValue(value);
    convertKeysToLowCal(valueClone);
    localStorage.setItem(key, JSON.stringify(valueClone));
  } else {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

const getItem = (key) => {
  if (!isValidObjectKey(key)) {
    throw new TypeError('Provided key was not a string. Key: ' + key);
  }

  const value = JSON.parse(localStorage.getItem(key));
  convertKeysFromLowCal(value);
  return value;
};

const clear = () => {
  localStorage.clear();
};

const LowCalStorage = { clear, getItem, setItem };

export default LowCalStorage;
