import React, { Component } from 'react';
import Head from './Head.js';
import './start.css';
import {Table} from 'semantic-ui-react';
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

class Leaderboard extends Component{
    constructor(props){
        super(props);
        this.state={
            leaders:[
                {
                    "teamid":" ",
                    "name1":" ",
                    "name2":" ",
                    "score":" ",
                }
            ],
        }
    }
    componentDidMount(){
        axios.get('/api/participant')
        .then(res=>{
            this.setState({leaders:res.data.participant});
        })
    }
    render(){
        var renderLeaders=this.state.leaders.map((leader)=>
        {return (
            <Table.Row>
                <Table.Cell>{leader.teamid}
                </Table.Cell>
                <Table.Cell>{leader.name1}</Table.Cell>
                <Table.Cell>{leader.name2}</Table.Cell>
                <Table.Cell>{leader.score}</Table.Cell>
            </Table.Row>)
        }
            );
        return(
          <div>
            <Head/>
           <Table>
               <Table.Header>
               <Table.Row>
                   <Table.HeaderCell>Team ID</Table.HeaderCell>
                   <Table.HeaderCell>Participant 1</Table.HeaderCell>
                   <Table.HeaderCell>Participant 2</Table.HeaderCell>
                   <Table.HeaderCell>Score</Table.HeaderCell>
               </Table.Row>
               </Table.Header>
               <Table.Body>
               {renderLeaders}
               </Table.Body>
           </Table>
           </div>
        )
    }
};
export default Leaderboard;