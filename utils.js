module.exports = {
  isFunction(possibleFunction) {
    if (typeof (possibleFunction) === typeof (Function)) {
      return true;
    }

    throw new Error('Callback should be a function');
  },
};
