import React from 'react';

class Output extends React.Component {
  constructor(props){
    super(props);
    this.state = {}
  }
  componentDidMount(){
    console.log('OUTPUT PROPS',this.props);
    this.props.socket.on('output', (data)=>{
      if (typeof data === 'object' && data.page === this.props.page && data.name === this.props.name) {
        this.setState({value:data.message});
      }
    });
  }
  render(){
    return (
      <div className='output'>
        <h1>{this.props.name}</h1>
        <p>{this.state.value || ''}</p>
      </div>
    );
  }
}

export default Output;
