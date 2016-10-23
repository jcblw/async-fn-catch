
module.exports = function asyncFnCatch (asyncFn, errorHandler) {
  return function asyncFnCatchHandler () {
    var args = Array.prototype.slice.call(arguments, 0)
    var ret = asyncFn.apply(null, args) // should be returning a promise
    if (ret && typeof ret.catch === 'function') {
      ret.catch(errorHandler)
    }
    return ret
  }
}
