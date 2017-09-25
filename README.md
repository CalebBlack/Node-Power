# Node Power

Node.js library for fully automatically generating and connecting web interfaces using Express REST API, Socket.io and React.js with a simple schema setup.

# Examples


## Example multiple page app

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

## Incrementing Counter with Buttons

```
const NodePower = require('node-power');

var i = 0;
var output = null;
const schema = {title:'Test Power',pages:{
  '/':[
    {button:['subtract',()=>{if (output){i--;output(i)}}]},
    {button:['add',()=>{if (output){i++;output(i)}}]},
    {output:['counter',(send)=>{
      send(i);
      output = send;
    }]},
    {link:['Home','/']}
  ]
}};


const app = new NodePower(schema);
app.run(5000);
```
# API

The rest endpoints can be found at /api/pages/{pagepath}
Input Query Format (POST): ?type=input&field={name}&value={value}
Button Query Format (POST): ?type=button&field={name}
