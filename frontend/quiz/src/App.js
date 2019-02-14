import React, { Component } from 'react';
import './App.css';
import Head from './Head.js';
import {Link} from 'react-router-dom';
import './start.css';
import {Card, Icon, Button} from 'semantic-ui-react';

const styles={
  pos:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  cardwidth:{
    width:'400px',
  }
}

class App extends Component {
  render() {
    const tid=this.props.location.state.teamid;
    return (
      <div className="App">
        <Head/>
        <div className="pos">
        <div style={styles.empty}></div>
        <Card style={styles.cardwidth}>
          <Card.Content header="Instructions"/>
          <Card.Content description>
           <p>1. All the best</p><br/>
           <p>2. Best of luck!</p>
          </Card.Content>
          <Card.Content extra>
          <Link to={{pathname:'/quiz', state:{teamid:tid} }}>  <Button onClick={this.handleClick} animated secondary>
           <Button.Content visible>Start Quiz</Button.Content>
           <Button.Content hidden>
           <Icon name='arrow right' />
           </Button.Content>
           </Button>
           </Link>
          </Card.Content>
        </Card>
        </div>
      </div>
    );
  }
}

export default App;
