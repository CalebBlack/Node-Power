module.exports = function(str) {
  var json;
  try {
    json = JSON.parse(str);
  } catch (error) {
    return null;
  }
  return json;
}
