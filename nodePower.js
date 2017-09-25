const express = require('express');

class nodePower(){
  constructor(schema){
    this.schema = schema;
    this.run = this.run.bind(this);
  }
  run(port) {
    let app = express();
    app.get('*', );
  }
}
