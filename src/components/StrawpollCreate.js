import React from 'react';
import PropTypes from 'prop-types';
import base from '../base';
import Choice from './shared/Choice';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import {
  addChoice,
  updateChoice,
  removeChoice
} from './state-functions/StrawpollCreateState';

class StrawpollCreate extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.isFormSubmitable = this.isFormSubmitable.bind(this);
    this.state = {
      item: null,
      loading: true,
      id: Date.now(),
      wait: false,
      question: '',
      choices: [{value:'', votes:0}, {value:'', votes:0}]
    };
  }

  componentDidMount() {
    
  }
  
  updateQuestion(newValue) {
    this.setState({question: newValue});
  }

  addChoice() {
    const newChoice = {value:'', votes:0},
          choices = addChoice(this.state, newChoice);
    this.setState({choices});
  }

  updateChoice(newValue, index) {
    const choices = updateChoice(this.state, newValue, index);
    this.setState({choices});
  }

  removeChoice(index) {
    const choices = removeChoice(this.state, index);
    this.setState({choices});
  }

  submit(e) {
    e.preventDefault();
    const id = this.state.id,
          question = this.state.question,
          choices = [...this.state.choices];

    const newQuestion = {
      id, question, choices
    }

    base.post(`/question/${id}`, {
      data: newQuestion,
      context: this,
      then: () => {
        this.context.router.history.push(`/q/${id}`)
      }
    });
  }

  isFormSubmitable() {
    const wait = this.state.wait;
    if(wait) return false;
    const question = this.state.question,
          choices = [...this.state.choices],
          emptyChoices = choices.filter((choice) => choice.value.length===0);
    if(emptyChoices.length===0 && question.length) return true;
    return false;
  }

  render() {
    // console.warn(this.context.router.history.push('/show'));

    const wait = this.state.wait,
          question = this.state.question,
          choices = [...this.state.choices];
    return (
    	<Paper zDepth={1} className="paper">
    	  <h2>Create your Straw Poll</h2>
        <form onSubmit={(e) => this.submit(e)}>
          <TextField value={question} 
                     onChange={(e, newValue) => this.updateQuestion(newValue)}
                     hintText="Your question" 
                     fullWidth={true}
                     disabled={wait}
          />
          <br />
          {choices.map((choice, i) => <Choice key={i}
                                              value={choice.value}
                                              index={i} 
                                              wait={wait}
                                              choices={choices}
                                              updateChoice={(newValue, index) => this.updateChoice(newValue, index)}
                                              removeChoice={(index) => this.removeChoice(index)}
                                      /> )}
          <br />
          <RaisedButton
            label="Add choice"
            icon={<ContentAdd />}
            onClick={() => this.addChoice()}
            disabled={wait}
          />
          <RaisedButton label="Publish Straw Poll" 
                        type="submit"
                        style={{marginTop: '2rem'}}
                        primary={true}
                        fullWidth={true}
                        disabled={!this.isFormSubmitable()}
          />
        </form>
    	</Paper>
    )
  }
}

StrawpollCreate.contextTypes = {
  router: PropTypes.object
};

export default StrawpollCreate;
