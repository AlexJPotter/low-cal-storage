(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("LowCalStorage", [], factory);
	else if(typeof exports === 'object')
		exports["LowCalStorage"] = factory();
	else
		root["LowCalStorage"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lowCalHelpers = __webpack_require__(2);

var _helpers = __webpack_require__(1);

var setItem = function setItem(key, value) {
  if (!(0, _helpers.isValidObjectKey)(key)) {
    throw new TypeError('Provided key was not valid. Key: ' + key);
  }

  if ((0, _helpers.isUndefined)(value)) {
    throw new TypeError('undefined is not a valid value.');
  } else if (!(0, _helpers.isNull)(value) && (0, _helpers.isObject)(value)) {
    var valueClone = (0, _helpers.cloneValue)(value);
    (0, _lowCalHelpers.convertKeysToLowCal)(valueClone);
    localStorage.setItem(key, JSON.stringify(valueClone));
  } else {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

var getItem = function getItem(key) {
  if (!(0, _helpers.isValidObjectKey)(key)) {
    throw new TypeError('Provided key was not a string. Key: ' + key);
  }

  var value = JSON.parse(localStorage.getItem(key));
  (0, _lowCalHelpers.convertKeysFromLowCal)(value);
  return value;
};

var clear = function clear() {
  localStorage.clear();
};

var LowCalStorage = { clear: clear, getItem: getItem, setItem: setItem };

exports.default = LowCalStorage;
module.exports = exports['default'];

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var isNull = exports.isNull = function isNull(value) {
  return value === null;
};

var isUndefined = exports.isUndefined = function isUndefined(value) {
  return value === undefined;
};

var isNullOrUndefined = exports.isNullOrUndefined = function isNullOrUndefined(value) {
  return isNull(value) || isUndefined(value);
};

var isSimpleType = function isSimpleType(value) {
  return isNullOrUndefined(value) ? true : (typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object';
};

var cloneValue = exports.cloneValue = function cloneValue(value) {
  if (isSimpleType(value)) {
    return value;
  }
  if (Array.isArray(value)) {
    return [].concat(_toConsumableArray(value));
  }
  return _extends({}, value);
};

var getOwnKeys = exports.getOwnKeys = function getOwnKeys(obj) {
  return Object.keys(obj);
};

var generateCharacterString = exports.generateCharacterString = function generateCharacterString(character, length) {
  return new Array(length + 1).join(character);
};

var stringWithLastLetterReplaced = exports.stringWithLastLetterReplaced = function stringWithLastLetterReplaced(inputString, newLastLetter) {
  return inputString.substring(0, inputString.length - 1) + newLastLetter;
};

var getKeyFromValue = exports.getKeyFromValue = function getKeyFromValue(obj, value) {
  return getOwnKeys(obj).filter(function (k) {
    return obj[k] === value;
  })[0];
};

var isValidObjectKey = exports.isValidObjectKey = function isValidObjectKey(value) {
  return (
    // eslint-disable-next-line no-extra-parens
    typeof value === 'string' || value && typeof value === 'number'
  );
};

var isObject = exports.isObject = function isObject(value) {
  return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object';
};

var isArray = exports.isArray = function isArray(value) {
  return Array.isArray(value);
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertKeysFromLowCal = exports.convertKeysToLowCal = exports.updateLowCalKeyMapDictionary = undefined;

var _helpers = __webpack_require__(1);

// eslint-disable-next-line max-len
var characters = 'a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,0,1,2,3,4,5,6,7,8,9'.split(',').sort();
var maxIndex = characters.length - 1;

var getLowCalKeyMapDictionary = function getLowCalKeyMapDictionary() {
  var keyMapDictionaryRaw = localStorage.getItem('lowCalKeys');
  return !keyMapDictionaryRaw ? {} : JSON.parse(keyMapDictionaryRaw);
};

var updateLowCalKeyMapDictionary = exports.updateLowCalKeyMapDictionary = function updateLowCalKeyMapDictionary(newDictionary) {
  return localStorage.setItem('lowCalKeys', JSON.stringify(newDictionary));
};

var setLowCalKey = function setLowCalKey(lowCalKey, fullFatKey) {
  var keyMapDictionary = getLowCalKeyMapDictionary();
  keyMapDictionary[lowCalKey] = fullFatKey;
  updateLowCalKeyMapDictionary(keyMapDictionary);
};

var keySort = function keySort(key1, key2) {
  var lengthOfKey1 = key1.length;
  var lengthOfKey2 = key2.length;
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

var getNextKey = function getNextKey() {
  var keyMapDictionary = getLowCalKeyMapDictionary();
  var keysInOrder = (0, _helpers.getOwnKeys)(keyMapDictionary).sort(keySort);

  if (keysInOrder.length === 0) {
    return characters[0];
  }

  var indexOfLastKey = keysInOrder.length - 1;
  var previousKey = keysInOrder[indexOfLastKey];
  var lengthOfPreviousKey = previousKey.length;
  var lastCharacterOfPreviousKey = previousKey[lengthOfPreviousKey - 1];
  var indexInCharactersArray = characters.indexOf(lastCharacterOfPreviousKey);

  if (indexInCharactersArray === maxIndex) {
    return (0, _helpers.generateCharacterString)(lengthOfPreviousKey + 1, characters[0]);
  }

  var nextCharacter = characters[indexInCharactersArray + 1];
  return (0, _helpers.stringWithLastLetterReplaced)(previousKey, nextCharacter);
};

var getLowCalKeyIfAlreadyExists = function getLowCalKeyIfAlreadyExists(key) {
  var keyMapDictionary = getLowCalKeyMapDictionary();
  return (0, _helpers.getKeyFromValue)(keyMapDictionary, key);
};

var addKeyMapAndGetLowCalKey = function addKeyMapAndGetLowCalKey(key) {
  var existingKey = getLowCalKeyIfAlreadyExists(key);

  if (!(0, _helpers.isNullOrUndefined)(existingKey)) {
    return existingKey;
  }

  var nextKey = getNextKey();
  setLowCalKey(nextKey, key);
  return nextKey;
};

var convertKeysToLowCal = exports.convertKeysToLowCal = function convertKeysToLowCal(obj) {
  if (!(0, _helpers.isObject)(obj)) {
    return;
  }

  if ((0, _helpers.isArray)(obj)) {
    // eslint-disable-next-line no-use-before-define
    arrayConvertKeysToLowCal(obj);
  } else {
    // eslint-disable-next-line no-use-before-define
    objectConvertKeysToLowCal(obj);
  }
};

var arrayConvertKeysToLowCal = function arrayConvertKeysToLowCal(array) {
  for (var i = 0; i < array.length; i++) {
    convertKeysToLowCal(array[i]);
  }
};

var objectConvertKeysToLowCal = function objectConvertKeysToLowCal(obj) {
  for (var fullFatKey in obj) {
    if (!obj.hasOwnProperty(fullFatKey)) {
      continue;
    }

    var value = (0, _helpers.cloneValue)(obj[fullFatKey]);
    convertKeysToLowCal(value);
    var lowCalKey = addKeyMapAndGetLowCalKey(fullFatKey);

    delete obj[fullFatKey];
    obj[lowCalKey] = value;
  }
};

var getOriginalKey = function getOriginalKey(lowCalKey) {
  var keyMapDictionary = getLowCalKeyMapDictionary();
  return keyMapDictionary[lowCalKey] || lowCalKey;
};

var convertKeysFromLowCal = exports.convertKeysFromLowCal = function convertKeysFromLowCal(obj) {
  if (!(0, _helpers.isObject)(obj)) {
    return;
  }

  if ((0, _helpers.isArray)(obj)) {
    // eslint-disable-next-line no-use-before-define
    arrayConvertKeysFromLowCal(obj);
  } else {
    // eslint-disable-next-line no-use-before-define
    objectConvertKeysFromLowCal(obj);
  }
};

var arrayConvertKeysFromLowCal = function arrayConvertKeysFromLowCal(array) {
  for (var i = 0; i < array.length; i++) {
    convertKeysFromLowCal(array[i]);
  }
};

var objectConvertKeysFromLowCal = function objectConvertKeysFromLowCal(obj) {
  for (var lowCalKey in obj) {
    if (!obj.hasOwnProperty(lowCalKey)) {
      continue;
    }

    var value = (0, _helpers.cloneValue)(obj[lowCalKey]);
    convertKeysFromLowCal(value);
    var fullFatKey = getOriginalKey(lowCalKey);

    delete obj[lowCalKey];
    obj[fullFatKey] = value;
  }
};

/***/ })
/******/ ]);
});
//# sourceMappingURL=LowCalStorage.js.map