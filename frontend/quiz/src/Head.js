import React, {Component} from 'react';
import {Segment, Header} from 'semantic-ui-react';

class Head extends Component{
    render(){
        return(
        <Segment raised>
        <Header as='h1' size='huge' color='grey' textAlign='center'>Sakshama '19 - Quiz</Header>
        </Segment>
        );
    }
}

export default Head;