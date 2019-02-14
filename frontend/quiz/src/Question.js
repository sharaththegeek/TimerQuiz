import React, { Component } from 'react';
import Head from './Head.js';
import {Container,Card, Radio, Form} from 'semantic-ui-react';

const styles={
    question:{
        padding:'25px',
    },
    options:{
        padding:'15px',
        width: '100%',
    },
};
class Question extends Component{
    constructor(props){
        super(props);
        this.state={
            id: props.id,
            value: props.selection,
        };
        this.handleChange=this.handleChange.bind(this);
    }
    handleChange = (e, { value }) => {
        const {onSel} = this.props;
        var select=value;
        onSel(this.props.id,select);
        this.setState({ value }); 
    }
    render(){
        const option1=this.props.option1;
        const option2=this.props.option2;
        const option3=this.props.option3;
        const option4=this.props.option4;
        return(
            <div>
            <Container>
                <Card.Group>
                    <Card fluid style={styles.question}>{this.props.id} {this.props.quest}</Card>           
                    <Card fluid style={styles.options}><Radio label={option1} value={option1} checked={this.props.selection === option1 } onChange={this.handleChange}/></Card>
                    <Card fluid style={styles.options}><Radio label={option2} value={option2} checked={this.props.selection === option2 } onChange={this.handleChange}/></Card>
                    <Card fluid style={styles.options}><Radio label={option3} value={option3} checked={this.props.selection === option3 } onChange={this.handleChange}/></Card>
                    <Card fluid style={styles.options}><Radio label={option4} value={option4} checked={this.props.selection === option4 } onChange={this.handleChange}/></Card>
                </Card.Group>
            </Container>
            </div>
        );
    }
};

export default Question;