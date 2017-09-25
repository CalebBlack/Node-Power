const express = require('express');
const defaultSchema = {title:'NodePower',pages:{'/':[{text:'Node Power'}]}};
const bodyParser = require('body-parser');

class NodePower {
  constructor(schema){
    this.schema = schema;
    this.run = this.run.bind(this);
    this.app = express();
    this.app.use(bodyParser.json());
    this.app.get('/schema',(req,res)=>{res.status(200);res.send(this.schema)});
    this.app.disable('x-powered-by');
    Object.entries(this.schema.pages).forEach(pageEntry=>{
      var inputs = {};
      var buttons = {};
      pageEntry[1].filter((element)=>{
        return (Object.keys(element)[0] === 'input');
      }).forEach(inputElement=>{inputs[inputElement.input[0]] = inputElement.input[1]});
      pageEntry[1].filter((element)=>{
        return (Object.keys(element)[0] === 'button');
      }).forEach(buttonElement=>{
        buttons[buttonElement.button[0]] = buttonElement.button[1];
      });
      this.app.post('/api/pages'+pageEntry[0]+'/input',(req,res)=>{
        if (req.query.field && req.query.value) {
          if (typeof req.query.field === 'string' && typeof req.query.value === 'string') {
            if (inputs[req.query.field]) {
              inputs[req.query.field](req.query.value);
              res.status(200).send('successful');
            } else {
              res.status(404).send('nonexistant input');
            }
          } else {
            res.status(400).send('malformed query');
          }
        } else {
          res.status(400).send('missing query');
          return;
        }
      });
      this.app.post('/api/pages'+pageEntry[0]+'/button',(req,res)=>{
        if (req.query.field) {
          if (typeof req.query.field === 'string') {
            if (buttons[req.query.field]) {
              buttons[req.query.field]();
              res.status(200).send('successful');
            } else {
              res.status(404).send('nonexistant button');
            }
          } else {
            res.status(400).send('malformed query');
          }
        } else {
          res.status(400).send('missing query');
        }
      });
    });
  }
  run(port) {
    return this.app.listen(port);
  }
}
module.exports = NodePower;
