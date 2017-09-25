import React from 'react';
import request from './functions/request';
import safeParse from './functions/safeparse';
import {Link} from 'react-router-dom';
import Page from './page';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }
  componentDidMount(){
    request('http://localhost:4000/schema').then(xhr=>{
      var response = safeParse(xhr.response);
      if (response) {
        document.title = response.title;
        this.setState(Object.assign({},this.state,{schema:response}));
      }
    }).catch(err=>{
      console.log(err);
    });
  }
  render(){
    if (this.state.schema) {
      if (this.state.schema.pages[window.location.pathname]) {
        var page = this.state.schema.pages[window.location.pathname];
        return <Page content={page}/>
      } else {
        return <p>page not found</p>
      }
      return(<div><p>test</p><Link to='/test'>ClickMe</Link></div>);
    } else {
      return (<p id='loading'>Loading Schema</p>);
    }
  }
}
export default App;
