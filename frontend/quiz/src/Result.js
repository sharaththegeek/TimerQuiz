import React, { Component } from 'react';
import Head from './Head.js';
import './start.css';
import {Card,Button,Icon} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const styles={
    pos:{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    cardwidth:{
      width:'400px',
      alignItems:'center',
    }
  }
class Result extends Component{
    constructor(props){
        super(props);
        this.state={
            name1:" ",
            name2:" ",
            teamid:" ",
            score:" ",
        }
    }
    componentDidMount(){
        var td=this.props.location.state.teamid;
        axios.get("/api/user/"+td+"/")
        .then(res=>{
            this.setState({name1:res.data.yourscore.name1,name2:res.data.yourscore.name2,teamid:res.data.yourscore.teamid,score:res.data.yourscore.score});
        })
    }
    render(){
        return(
            <div>
                <Head/>
                <div className="pos">
        <div style={styles.empty}></div>
        <Card style={styles.cardwidth}>
          <Card.Content header>
          <h4>Thanks for participating!</h4>
          </Card.Content>
          <Card.Content description>
           <h2>Team ID: {this.state.teamid}</h2>
           <h2>Participant 1: {this.state.name1}</h2>
           <h2>Participant 2: {this.state.name2}</h2>
          </Card.Content>
          <Card.Content extra>
          <h2>Score: {this.state.score}</h2>
          <Link to={{pathname:'/'}}>  <Button onClick={this.handleClick} animated primary>
           <Button.Content visible>Exit</Button.Content>
           <Button.Content hidden>
           <Icon name='arrow right' />
           </Button.Content>
           </Button>
           </Link>
          </Card.Content>
        </Card>
        </div>
      </div>
        )
    }
};

export default Result;