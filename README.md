## Node Power

Node.js library for fully automatically generating and connecting web interfaces using Express REST API, Socket.io and React.js with a simple schema setup.

Examples:

```
const NodePower = require('node-power');

const schema = {title:'Test Power',pages:{'/':[
  {text:'Node Power Test App'},
  {link:['Tommy','/tommy']},
  {input:['Name',(name)=>{console.log('name',name)}]}
],'/tommy':[
  {button:['name',()=>{console.log('button pressed')}]},
  {output:['age',(send)=>{
    setInterval(()=>{send('pingus')},1000);
  }]}
]}};

const app = new NodePower(schema);
app.run(4000);
```

# Incrementing Counter with Buttons

```
const NodePower = require('node-power');

var i = 0;
var output = null;
const schema = {title:'Test Power',pages:{
  '/':[
    {button:['name',()=>{if (output){i--;output(i)}}]},
    {button:['name2',()=>{if (output){i++;output(i)}}]},
    {output:['age',(send)=>{
      send(i);
      output = send;
    }]},
    {link:['Home','/']}
  ]
}};


const app = new NodePower(schema);
app.run(5000);
```
