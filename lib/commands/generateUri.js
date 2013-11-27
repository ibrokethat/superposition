
moudle.exports = function generateUri (base, path, fileName, params) {

  params = params || '';

  return base + path + '/' + fileName + params;
}
