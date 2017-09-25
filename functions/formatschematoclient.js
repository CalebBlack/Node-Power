module.exports = function(schema){
  var out = JSON.parse(JSON.stringify(schema));
  Object.entries(out.pages).forEach(page=>{
    out.pages[page[0]] = page[1].map(element=>{
      var elementOut = {};
      var value = Object.values(element)[0];
      var type = Object.keys(element)[0];
      elementOut[type] = typeof value === 'string' ? value : type === 'link' ? value.slice(0,2): value[0];
      return elementOut;
    });
  });
  return out;
}
