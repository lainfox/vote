import React from 'react';
import PropTypes from 'prop-types';
import base from '../base';

import Paper from 'material-ui/Paper';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

let ready = false;

const styles = {
  vote: {
    marginTop: '2rem',
  },
  radioButton: {
    marginBottom: '1rem',
  },
};

class StrawpollVote extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.updateUserChoice = this.updateUserChoice.bind(this);
    this.isFormSubmitable = this.isFormSubmitable.bind(this);
    this.submit = this.submit.bind(this);

    this.state = {
      wait: true,
      previousVotes: [],
      id: null,
      question: '',
      choices: [],
      userChoice: -1
    }
  }


  componentDidMount() {
    const id = this.props.match.params.id;

    base.fetch(`/question/${id}`, {
      context: this,
      asArray: false,
      then(data) {
        this.buildQuestion(id, data);
      }
    });
  }

  buildQuestion(id, data) {
    const previousVotes = this.didVote(id);

    if(Object.keys(data).length) {
      const wait = false;
      const id = data.id;
      const question = data.question;
      const choices = [...data.choices];
      ready = true;
      this.setState({wait, previousVotes, id, question, choices});
    }else {
      this.context.router.push('/');
    }
  }

  didVote(id) {
    let previousVotes = JSON.parse(localStorage.getItem('previousVotes'));

    // 투표했으면 결과로? 없어도 될 거 같긴 함.
    if(!Array.isArray(previousVotes)) previousVotes = [];
    else if(previousVotes.indexOf(id)>-1) {
      const path = `/show/${id}`;
      return this.context.router.push(path);
    }

    return previousVotes;
  }

  updateUserChoice(value) {
    this.setState({userChoice: value});
  }

  submit(e) {
    e.preventDefault();
    this.setState({wait: true});

    const id = this.state.id,
          choices = this.state.choices;
    const history = this.context.router.history;
    choices[this.state.userChoice].votes++;

    base.update(`/question/${id}`, {
      data: {choices: choices},
      then: err => {
        if (!err) {
          this.context.router.history.push(`/q/${id}/re`)
        }
      }
    });

    // base.isUserSignedIn()
    //     .then(isSigned => {
    //       if(isSigned) return Promise.resolve(true);
    //       return base.signInAnonymously();
    //     })
    //     .then(base.update(id, {choices: choices}))
    //     .then(() => {
    //       const previousVotes = [...this.state.previousVotes],
    //             path = `/show/${id}`;
    //       previousVotes.push(id);
    //       localStorage.setItem('previousVotes', JSON.stringify(previousVotes));
    //       this.context.router.push(path);
    //     })
    //     .catch(err => console.error(err));
  }

  isFormSubmitable() {
    const wait = this.state.wait;
    if(wait) return false;
    const userChoice = this.state.userChoice;
    if(userChoice >= 0) return true;
    return false;
  }

  render() {
    if(!ready) return (
      <Paper style={{textAlign: 'center'}} zDepth={1} className="paper"> 
        <CircularProgress />
      </Paper>
    );
    const {question, choices} = this.state;
    return(
    	<Paper zDepth={1} className="paper">
    	  <h2>{`${question}`}</h2>
        <form onSubmit={(e) => this.submit(e)}>
          <RadioButtonGroup name="userChoice"
                            onChange={(e, value) => this.updateUserChoice(value)}>
            {choices.map((choice, i) => <RadioButton
                                          key={i}
                                          value={i}
                                          label={choice.value}
                                          style={styles.radioButton}
                                        /> )}
          </RadioButtonGroup>
          <RaisedButton label="Confirm Vote" 
                        type="submit"
                        style={styles.vote}
                        primary={true}
                        fullWidth={true}
                        disabled={!this.isFormSubmitable()}
          />
        </form>
    	</Paper>
    );
  }
}

StrawpollVote.contextTypes = {
  router: PropTypes.object
};

export default StrawpollVote;
