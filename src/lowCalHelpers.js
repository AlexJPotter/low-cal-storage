import {
  cloneValue,
  generateCharacterString,
  getKeyFromValue,
  getOwnKeys,
  isArray,
  isNullOrUndefined,
  isObject,
  stringWithLastLetterReplaced,
} from './helpers.js';

// eslint-disable-next-line max-len
const characters = 'a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,0,1,2,3,4,5,6,7,8,9'.split(',').sort();
const maxIndex = characters.length - 1;

const getLowCalKeyMapDictionary = () => {
  const keyMapDictionaryRaw = localStorage.getItem('lowCalKeys');
  return !keyMapDictionaryRaw
    ? {}
    : JSON.parse(keyMapDictionaryRaw);
};

export const updateLowCalKeyMapDictionary = (newDictionary) =>
  localStorage.setItem('lowCalKeys', JSON.stringify(newDictionary));

const setLowCalKey = (lowCalKey, fullFatKey) => {
  const keyMapDictionary = getLowCalKeyMapDictionary();
  keyMapDictionary[lowCalKey] = fullFatKey;
  updateLowCalKeyMapDictionary(keyMapDictionary);
};

const keySort = (key1, key2) => {
  const lengthOfKey1 = key1.length;
  const lengthOfKey2 = key2.length;
  if (lengthOfKey1 < lengthOfKey2) {
    return -1;
  } else if (lengthOfKey1 > lengthOfKey2) {
    return 1;
  } else if (key1 < key2) {
    return -1;
  } else if (key1 > key2) {
    return 1;
  }
  return 0;
};

const getNextKey = () => {
  const keyMapDictionary = getLowCalKeyMapDictionary();
  const keysInOrder = getOwnKeys(keyMapDictionary).sort(keySort);

  if (keysInOrder.length === 0) {
    return characters[0];
  }

  const indexOfLastKey = keysInOrder.length - 1;
  const previousKey = keysInOrder[indexOfLastKey];
  const lengthOfPreviousKey = previousKey.length;
  const lastCharacterOfPreviousKey = previousKey[lengthOfPreviousKey - 1];
  const indexInCharactersArray = characters.indexOf(lastCharacterOfPreviousKey);

  if (indexInCharactersArray === maxIndex) {
    return generateCharacterString(lengthOfPreviousKey + 1, characters[0]);
  }

  const nextCharacter = characters[indexInCharactersArray + 1];
  return stringWithLastLetterReplaced(previousKey, nextCharacter);
};

const getLowCalKeyIfAlreadyExists = (key) => {
  const keyMapDictionary = getLowCalKeyMapDictionary();
  return getKeyFromValue(keyMapDictionary, key);
};

const addKeyMapAndGetLowCalKey = (key) => {
  const existingKey = getLowCalKeyIfAlreadyExists(key);

  if (!isNullOrUndefined(existingKey)) {
    return existingKey;
  }

  const nextKey = getNextKey();
  setLowCalKey(nextKey, key);
  return nextKey;
};

export const convertKeysToLowCal = (obj) => {
  if (!isObject(obj)) {
    return;
  }

  if (isArray(obj)) {
    // eslint-disable-next-line no-use-before-define
    arrayConvertKeysToLowCal(obj);
  } else {
    // eslint-disable-next-line no-use-before-define
    objectConvertKeysToLowCal(obj);
  }
};

const arrayConvertKeysToLowCal = (array) => {
  for (let i = 0; i < array.length; i++) {
    convertKeysToLowCal(array[i]);
  }
};

const objectConvertKeysToLowCal = (obj) => {
  for (const fullFatKey in obj) {
    if (!obj.hasOwnProperty(fullFatKey)) {
      continue;
    }

    const value = cloneValue(obj[fullFatKey]);
    convertKeysToLowCal(value);
    const lowCalKey = addKeyMapAndGetLowCalKey(fullFatKey);

    delete obj[fullFatKey];
    obj[lowCalKey] = value;
  }
};

const getOriginalKey = (lowCalKey) => {
  const keyMapDictionary = getLowCalKeyMapDictionary();
  return keyMapDictionary[lowCalKey] || lowCalKey;
};

export const convertKeysFromLowCal = (obj) => {
  if (!isObject(obj)) {
    return;
  }

  if (isArray(obj)) {
    // eslint-disable-next-line no-use-before-define
    arrayConvertKeysFromLowCal(obj);
  } else {
    // eslint-disable-next-line no-use-before-define
    objectConvertKeysFromLowCal(obj);
  }
};

const arrayConvertKeysFromLowCal = (array) => {
  for (let i = 0; i < array.length; i++) {
    convertKeysFromLowCal(array[i]);
  }
};

const objectConvertKeysFromLowCal = (obj) => {
  for (const lowCalKey in obj) {
    if (!obj.hasOwnProperty(lowCalKey)) {
      continue;
    }

    const value = cloneValue(obj[lowCalKey]);
    convertKeysFromLowCal(value);
    const fullFatKey = getOriginalKey(lowCalKey);

    delete obj[lowCalKey];
    obj[fullFatKey] = value;
  }
};
