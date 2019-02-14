import React, { Component } from 'react';
import Head from './Head.js';
import {Button, Message} from 'semantic-ui-react';
import Question from './Question';
import update from 'react-addons-update';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
var quizquestions=[];
const quizzed=[];
const styles={
    warned:{
      width:'80%',  
      margin: 'auto',
    },
    button1:{
        marginRight:'5%',
    },
    theButtons:{
        marginTop: '5%',
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
    },
};
const questions=[
    {
    id:1,
    question:"What's up?",
    option1:"Duh",
    option2:"Damn!",
    option3: "Nah!",
    option4: "Blah!",
    },
    {
     id:2,
     question:"Who is your girlfriend",
     option1:"Yash",
     option2:"Yashu",
     option3:"Yashwanthi",
     option4:"M Yashwanthi Sharath",
    },
    {
        id:3,
        question:"What is your girlfriend's boyfriend's name?",
        option1:"Sharath",
        option2:"Sharath Sriram",
        option3:"Baby",
        option4:"Darling",
    },
]
class Quiz extends Component{
    constructor(props){
        super(props);
        this.state={
            currentQn:1,
            mins: 5,
            secs: 0,
            warning: 0,
            final:0,
            visited: false,
            toured: false,
            selectedAns: [],
            tid:"",
            posted:false,
            questionSet:[
                {
                    id:1,
                    question:"What's up?",
                    option1:"Duh",
                    option2:"Damn!",
                    option3: "Nah!",
                    option4: "Blah!",
                    },
                    {
                     id:2,
                     question:"Who is your girlfriend",
                     option1:"Yash",
                     option2:"Yashu",
                     option3:"Yashwanthi",
                     option4:"M Yashwanthi Sharath",
                    },
                    {
                        id:3,
                        question:"What is your girlfriend's boyfriend's name?",
                        option1:"Sharath",
                        option2:"Sharath Sriram",
                        option3:"Baby",
                        option4:"Darling",
                    },
            ],
        }
        this.nextPage=this.nextPage.bind(this);
        this.prevPage=this.prevPage.bind(this);
        this.onSelect=this.onSelect.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        this.handleDismiss=this.handleDismiss.bind(this);
        this.handleFinal=this.handleFinal.bind(this);
    }
    tick(){
        if(this.state.visited==false){
        if(this.state.mins==4){
            this.setState({warning:this.state.warning+1,visited:true});
        }}
        if(this.state.toured==false){
        if(this.state.mins==0){
            this.setState({final:this.state.final+1,toured:true});
        }}
        if(this.state.secs==0){
            if(this.state.mins==0){
                this.onSubmit();
            }
            else{
                this.setState({mins:this.state.mins-1,secs:59});
            }
        }
        else {
            this.setState({secs:this.state.secs-1});
        }
    }
    componentDidMount(){ 
        this.interval=setInterval(()=>this.tick(),1000);
        axios.get("/api/questions")
        .then(res => {
           var quizquestions=res.data.questions;
           for (var key in quizquestions){
               quizzed.push(quizquestions[key]);
           }
           const squest=quizzed.map((quest)=>
         ({id: quest.id, selected:"",teamid:this.props.location.state.teamid})
        );
        this.setState({selectedAns:squest,questionSet:quizzed,tid:this.props.location.state.teamid});
        }
        )
    }
    componentWillUnmount(){
        clearInterval(this.interval);
    }
    onSubmit(){ 
        var random=this.state.selectedAns;
        var sendData={
            "selectedAns":this.state.selectedAns
        }
        axios.post("/api/score/",sendData)
        .then(res=>{
            this.setState({posted:true})
        })
    }
    nextPage(){
        this.setState({currentQn:this.state.currentQn+1});
    }
    prevPage(){
        this.setState({currentQn:this.state.currentQn-1});
    }
    onSelect(id,select){
       this.setState({
           selectedAns:update(this.state.selectedAns,{[id-1]:{selected:{$set: select}}})
       })
    }
    handleDismiss(){
        this.setState({warning:3});
    }
    handleFinal(){
        this.setState({final:3});
    }
    render(){
        if (this.state.posted){
            return <Redirect to={{
              pathname:"/result/",
              state:{teamid:this.state.tid}
            }}/>
          }
        var questSet=this.state.questionSet;
        var currentQuest=questSet[this.state.currentQn-1];
        if(this.state.warning==1){
            var warn=<Message style={styles.warned} onDismiss={this.handleDismiss} color="yellow" header="You have only 5 minutes to finish the quiz!" content=""/>;
        }
        if(this.state.final==1){
            var fin=<Message style={styles.warned} onDismiss={this.handleFinal} color="red" header="You have only 1 minute to finish the quiz!" content=""/>;
        }
        var selection=this.state.selectedAns[this.state.currentQn-1]?this.state.selectedAns[this.state.currentQn-1].selected:null;
        var renderQn=<Question id={currentQuest.id} selection={selection} onSel={this.onSelect} quest={currentQuest.question} option1={currentQuest.option1}
        option2={currentQuest.option2} option3={currentQuest.option3} option4={currentQuest.option4}/>;
        var totalqns=Object.keys(questSet).length;
        var mins= (this.state.mins>9?""+this.state.mins:"0"+this.state.mins);
        var secs= (this.state.secs>9?""+this.state.secs:"0"+this.state.secs);
        var renderQns="";
            if(this.state.currentQn === 1) {
             renderQns=(
                <div>
                {renderQn}
                <div style={styles.theButtons}>
                <Button style={styles.button1} primary disabled>Previous</Button>
                <Button style={styles.button2} primary onClick={this.nextPage}>Next</Button>
                </div>
                </div>
                );
            }
            else if(this.state.currentQn===totalqns){
                renderQns=(
                <div>
                {renderQn}
                <div style={styles.theButtons}>
                <Button style={styles.button1} primary onClick={this.prevPage}>Previous</Button>
                <Button style={styles.button2} primary onClick={this.onSubmit}>Submit</Button>
                </div>
                </div>
                );
            }
            else{
                renderQns=(
                <div> 
                {renderQn}
                <div style={styles.theButtons}>
                <Button style={styles.button1} primary onClick={this.prevPage}>Previous</Button>
                <Button style={styles.button2} primary onClick={this.nextPage}>Next</Button>
                </div>
                </div>
                );
            }
        return(
            <div>
            <Head/>
            {warn}
            {fin}
            <h5 style={{textAlign:'center'}}>Timer: {mins}:{secs}</h5>
            {renderQns}
            </div>
        );
    }
}

export default Quiz;