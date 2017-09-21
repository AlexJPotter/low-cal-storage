/* globals beforeEach, expect */

import { expect } from 'chai';
import mockLocalStorage from 'mock-local-storage'; // eslint-disable-line
import LowCalStorage from '../src/index.js';

global.window = {};
window.localStorage = global.localStorage;
const localStorage = window.localStorage;

// These tests are a work in progress
describe('LowCalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });
  it('can set and get an item', () => {
    const myString = 'Alex';
    const myInteger = 44;
    const myDecimal = 4.4;
    const myBool = true;
    const myArray = [1, true, 'Alex', -4.4, { hello: 'world' }];
    const myObject = {
      age: 24,
      isDeveloper: true,
      name: 'Alex',
      nestedObject: {
        packages: ['low-cal-storage'],
        version: {
          number: 1,
        },
      },
    };

    LowCalStorage.setItem('my string', myString);
    LowCalStorage.setItem('my integer', myInteger);
    LowCalStorage.setItem('my decimal', myDecimal);
    LowCalStorage.setItem('my boolean', myBool);
    LowCalStorage.setItem('my array', myArray);
    LowCalStorage.setItem('my object', myObject);

    expect(LowCalStorage.getItem('my string')).to.equal(myString);
    expect(LowCalStorage.getItem('my integer')).to.equal(myInteger);
    expect(LowCalStorage.getItem('my decimal')).to.equal(myDecimal);
    expect(LowCalStorage.getItem('my boolean')).to.equal(myBool);
    expect(LowCalStorage.getItem('my array')).to.deep.equal(myArray);
    expect(LowCalStorage.getItem('my object')).to.deep.equal(myObject);
  });
  describe('setItem', () => {
    describe('when passed a string key', () => {
      const key = 'string key';
      describe('and a string value', () => {
        it('stores the JSON.stringified value in localStorage', () => {
          const value = 'some string';
          LowCalStorage.setItem(key, value);
          expect(localStorage.getItem(key)).to.equal(JSON.stringify(value));
        });
      });
      describe('and a number value', () => {
        it('stores the JSON.stringified value in localStorage', () => {
          const value = 44;
          LowCalStorage.setItem(key, value);
          expect(localStorage.getItem(key)).to.equal(JSON.stringify(value));
        });
      });
      describe('and a boolean value', () => {
        it('stores the JSON.stringified value in localStorage', () => {
          const value = true;
          LowCalStorage.setItem(key, value);
          expect(localStorage.getItem(key)).to.equal(JSON.stringify(value));
        });
      });
      describe('and a null value', () => {
        it('stores the JSON.stringified value in localStorage', () => {
          const value = null;
          LowCalStorage.setItem(key, value);
          expect(localStorage.getItem(key)).to.equal(JSON.stringify(value));
        });
      });
      describe('and an undefined value', () => {
        it('throws a TypeError', () => {
          const value = undefined;
          expect(() => LowCalStorage.setItem(key, value)).to.throw(TypeError);
        });
      });
      describe('and an object value', () => {
        let objectValue;
        beforeEach(() => {
          objectValue = {
            booleanThing: true,
            nullThing: null,
            numberThing: 44,
            objectThing: {
              booly: true,
              nully: null,
              numbery: 'number',
              stringy: 'string',
            },
            otherBooleanThing: false,
            stringThing: 'string thing',
          };
        });
        it('does not mutate the original object', () => {
          const objectStringified = JSON.stringify(objectValue);
          LowCalStorage.setItem(key, objectValue);
          expect(JSON.stringify(objectValue)).to.equal(objectStringified);
        });
        it('adds the keys to the lowCalKeys dictionary', () => {
          LowCalStorage.setItem(key, objectValue);
          const lowCalKeysDictionary = JSON.parse(
            localStorage.getItem('lowCalKeys')
          );
          const fullFatKeys = Object.keys(lowCalKeysDictionary)
            .map(key => lowCalKeysDictionary[key]);
          const topLevelKeys = Object.keys(objectValue);
          const secondLevelKeys = Object.keys(objectValue.objectThing);
          for (const key of topLevelKeys) {
            expect(fullFatKeys).to.contain(key);
          }
          for (const key of secondLevelKeys) {
            expect(fullFatKeys).to.contain(key);
          }
        });
      });
    });
  });
});
