# `low-cal-storage`

#### **`NB:`** **This package is a work in progress.**

`low-cal-storage` is a lightweight wrapper around `window.localStorage` that slims down your data for storage and fattens it up again on retrieval.

## Do I need `low-cal-storage`?
For most use-cases plain old `localStorage` is good enough - but if you want to store a significant amount of similarly shaped data (i.e. large arrays of objects of the same type) with `localStorage`, you may find that you reach the browser limit quite fast. `low-cal-storage` replaces long object keys with shorter ones for storage purposes, and maps them back on retrieval.

## Installation

#### With `npm`:
`npm install low-cal-storage --save`

#### With `yarn`:
`yarn add low-cal-storage --save`

## Usage
```
import lowCal from 'low-cal-storage';

const myObject = { hello: 'world' };

// Store the object in "low-cal-storage" - note that we do not need to stringify first
lowCal.setItem('my object', myObject);

// Retrieve the object from "low-cal-storage" - note that we do not need to parse the result
const retrievedObject = lowCal.getItem('my object');

// Clear "low-cal-storage" out
lowCal.clear();
```
