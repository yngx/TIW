'use strict';

function useIterator(fn, input) {
  const it = fn;
  let result = it.next();
  while(!result.done){
    console.log(result.value);
    result = it.next();
  }
}

// Create a simple iterator
// An object is an iterator when it implements a next() method with the following semantics: value and done
// number iterator
function makeRangeIterator( start = 0, end = Infinity, step = 1){
  let nextVal = start;
  let iterationCount = 0;

  const rangeIterator = {
    next: function() {
      let result;
      if(nextVal < end){
        result = { value: nextVal, done: false };
        nextVal += step;
        iterationCount++;
        return result;
      }
      return { value: iterationCount, done: true }
    }
  }

  return rangeIterator;
}

// Create an iterator via a Generator function
// Generator functions help us avoid maintaining the internal state of the iterator
function* makeRangeIterator2( start = 0, end = 10, step = 1){
  let iterationCount = 0;
  for(let i = start; i < end; i++){
    iterationCount++;
    yield i;
  }
  return iterationCount;
}

let runRangeIterator = true;
if(runRangeIterator){
  console.log('using hand written iterator');
  useIterator(makeRangeIterator(1, 10, 1));

  console.log('using generator function to generate an iterator');
  useIterator(makeRangeIterator2(1, 10, 1));
}


// Create an iterator for a string
function* makeStringIterator(stringInput) {
  let length = stringInput.length;
  let count = 0;
  for(let i = 0; i < length; i++){
    yield stringInput[i];
    count++;
  }
  return count;
}

let runStringIterator = true;
if(runStringIterator){
  useIterator(makeStringIterator('Hello'));

  //In order to be iterable, an object must implement the @@iterator method. 
  //This simply means that the object (or one of the objects up its prototype chain)
  // must have a property with a Symbol.iterator key.

  // to be iterator, an object must implement a symbol.iterator method
  // String, Array, TypedArray, Map and Set are all built-in iterables, 
  // because their prototype objects all have a Symbol.iterator method.

  //Iterables which can iterate only once (such as Generators) 
  // customarily return this from their @@iterator method, whereas 
  // iterables which can be iterated many times must return a new 
  // iterator on each invocation of @@iterator.
}


