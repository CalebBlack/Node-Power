import React from 'react';
import {Link} from 'react-router-dom';
import request from './functions/request';

class Page extends React.Component {
  constructor(props){
    super(props);
    this.props = {};
  }
  componentDidMount(){
    if (!this.props.content) {
      throw new Error('no page content given');
    }
  }
  render(){
    return (
      <div id='page'>{this.props.content.map(element=>{return convertElement(element)})}</div>
    )
  }
}
function convertElement(element) {
  var type = Object.keys(element)[0];
  if (type === 'text') {
    return <p>{element[type]}</p>
  } else if (type ==='link') {
    return <Link to={element[type][1]}>{element[type][0]}</Link>
  } else if (type === 'input') {
    return <input onKeyPress={(event)=>{
      if (event.key === 'Enter') {
        let input = event.target.value || '';
        if (input.length > 0) {
          request('http://localhost:4000/api/pages'+window.location.pathname+"?type=input&field="+element[type]+"&value="+input,'post').then(xhr=>{
            console.log(xhr);
          }).catch(err=>{
            console.log(err);
          })
          event.target.value = '';
        }
      }
    }} id={element[type]}/>
  } else if (type === 'button') {
    return <button onClick={()=>{
          request('http://localhost:4000/api/pages'+window.location.pathname+"?type=button&field="+element[type],'post').then(xhr=>{
            console.log(xhr);
          }).catch(err=>{
            console.log(err);
          });
    }} id={element[type]}/>
  }
}
export default Page;
