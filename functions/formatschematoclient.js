module.exports = function(schema){
  var out = JSON.parse(JSON.stringify(schema));
  Object.entries(out.pages).forEach(page=>{
    out.pages[page[0]] = page[1].map(element=>{
      var elementOut = {};
      var value = Object.values(element)[0];
      elementOut[Object.keys(element)[0]] = typeof value === 'string' ? value : value[0];
      return elementOut;
    });
  });
  return out;
}
