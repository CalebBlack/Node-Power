## Node Power

Node.js library for creating interfaces using websockets and React.js


Example Setup:

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
