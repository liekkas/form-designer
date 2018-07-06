import _getIterator from "babel-runtime/core-js/get-iterator";
/**
 * _.fromPairs([['a', 1], ['b', 2]]);
  // => { 'a': 1, 'b': 2 }
 */
export function fromPairs(pairs) {
  var result = {};
  if (pairs == null) {
    return result;
  }
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = _getIterator(pairs), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var pair = _step.value;

      result[pair[0]] = pair[1];
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return result;
}