const express = require('express');
const http = require('http');
const io = require('socket.io');
const formatSchemaToClient = require('./functions/formatschematoclient.js');
const defaultSchema = {title:'NodePower',pages:{'/':[{text:'Node Power'}]}};
const bodyParser = require('body-parser');
const path = require('path');

class NodePower {
  constructor(schema){
    this.schema = Object.assign({},defaultSchema,schema);
    this.clientSchema = formatSchemaToClient(this.schema);
    this.run = this.run.bind(this);
    this.app = express();
    this.http = http.Server(this.app);
    this.io = io(this.http);
    this.users = [];
    this.app.use(bodyParser.json());
    this.app.get('/schema',(req,res)=>{res.status(200);res.send(this.clientSchema)});
    this.app.disable('x-powered-by');
    // SETUP SOCKET IO CONNECTIONS
    this.io.on('connection', (socket)=>{
      console.log('socketconnection');
      this.users.push(socket);
      socket.on('disconnect', ()=>{
        var i = this.users.indexOf(socket);
        if (i < 0) return;
        this.users.splice(i, 1);
      });
    });
    // SETUP REST API
    var outputs = [];
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
      pageEntry[1].filter(element=>{return (Object.keys(element)[0] === 'output')}).forEach(outputElement=>{
        outputs.push([pageEntry[0],outputElement.output[0],outputElement.output[1]])
      });
      console.log('route','/api/pages'+pageEntry[0]);
      this.app.post('/api/pages'+pageEntry[0],(req,res)=>{
        if (req.query.field && req.query.type) {
          if (typeof req.query.field === 'string' && typeof req.query.type === 'string') {
            if (req.query.type === 'input') {
              if (req.query.value && typeof req.query.value === 'string') {
                if (inputs[req.query.field]) {
                  inputs[req.query.field](req.query.value);
                  res.status(200).send('successful');
                } else {
                  res.status(404).send('nonexistant input');
                }
              } else {
                res.status(400).send('malformed query');
              }
            } else if (req.query.type === 'button') {
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
            res.status(400).send('malformed query');
          }
        } else {
          res.status(400).send('missing query');
          return;
        }
      });
    });
    // Prepare Socket.io Outputs
    outputs.forEach(output=>{
      output[2]((message)=>{
        this.io.emit('output',{page:output[0],name:output[1],message});
      });
    });
    this.app.use(express.static('build'));
    this.app.get('*', function(req, res) {
      res.sendFile(path.join(__dirname + '/src/index.html'));
    });
  }

  run(port) {
    this.http.listen(port, function(){
      console.log('listening on',port);
    });
  }
}
module.exports = NodePower;
