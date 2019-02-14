import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import './start.css';
import Head from './Head.js';
import {Card, Icon, Button, Input} from 'semantic-ui-react';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
class Start extends Component{
    constructor(props){
      super(props);
      this.state={
        par1:" ",
        par2:" ",
        tid:" ",
        success:0,
      };
      this.handleNext=this.handleNext.bind(this);
      this.handleP1=this.handleP1.bind(this);
      this.handleP2=this.handleP2.bind(this);
      this.handletid=this.handletid.bind(this);
    }
    handleNext(){
      const n1=this.state.par1;
      const n2=this.state.par2;
      const t1=this.state.tid;
      axios.post("/api/participant/",{
        participant:{
          teamid:t1,
          name1:n1,
          name2:n2,
          score:0
        }
      })
           .then(res=>{
             this.setState({success:1});
           })
           .catch(res=>{
             this.setState({success:2});
             console.log(res)
           })
    }
    handleP1=e=>{ 
      this.setState({par1:e.target.value});
    }
    handleP2=e=>{
      this.setState({par2:e.target.value});
    }
    handletid=e=>{
      this.setState({tid:e.target.value});
    }
    render(){
        if (this.state.success === 1){
          return <Redirect to={{
            pathname:"/intro",
            state:{teamid:this.state.tid}
          }}/>
        }
        if (this.state.success===2){
          return <Redirect to={{
            pathname:"/result",
            state:{teamid:this.state.tid}
          }}/>
        }
        return(
            <div>
                <Head/>
                <div className="pos">
        <div ></div>
        <Card fluid className="textA">
          <Card.Content header="Welcome to Sakshama Quiz"/>
          <Card.Content description>
          <label>Participant 1:</label><br/>
          <Input className="textBox" onChange={this.handleP1} placeholder="Name of Participant 1"/><br/><br/>
          <label>Participant 2:</label><br/>
          <Input className="textBox" onChange={this.handleP2} placeholder="Name of Participant 2"/><br/><br/>
          <label>Team ID:</label><br/>
          <Input className="textBox" onChange={this.handletid} placeholder="Team ID"/><br/><br/>
          </Card.Content>
          <Card.Content extra>
          <Button onClick={this.handleNext} animated secondary>
           <Button.Content visible>Next</Button.Content>
           <Button.Content hidden>
           <Icon name='arrow right' />
           </Button.Content>
           </Button>
          </Card.Content>
            </Card>
            </div>
            </div>
        )
    }
};

export default Start;