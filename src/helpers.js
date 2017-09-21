export const isNull = (value) =>
  value === null;

export const isUndefined = (value) =>
  value === undefined;

export const isNullOrUndefined = (value) =>
  isNull(value) || isUndefined(value);

const isSimpleType = (value) =>
  isNullOrUndefined(value)
    ? true
    : typeof value !== 'object';

export const cloneValue = (value) => {
  if (isSimpleType(value)) {
    return value;
  }
  if (Array.isArray(value)) {
    return value.map(element => cloneValue(element));
  }
  return { ...value };
};

export const getOwnKeys = (obj) =>
  Object.keys(obj);

export const generateCharacterString = (character, length) =>
  new Array(length + 1).join(character);

export const stringWithLastLetterReplaced = (inputString, newLastLetter) =>
  inputString.substring(0, inputString.length - 1) + newLastLetter;

export const getKeyFromValue = (obj, value) =>
  getOwnKeys(obj).filter(k => obj[k] === value)[0];

export const isValidObjectKey = (value) =>
  // eslint-disable-next-line no-extra-parens
  typeof value === 'string' || (value && typeof value === 'number');

export const isObject = (value) =>
  typeof value === 'object';

export const isArray = (value) =>
  Array.isArray(value);
