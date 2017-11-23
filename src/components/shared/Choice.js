import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import ContentClear from 'material-ui/svg-icons/content/clear';

const styles = {
  container: {position:'relative', paddingRight:'48px'},
  icon: {position:'absolute', right:0},
};

class Choice extends React.Component {

  constructor() {
    super();
    this.isChoiceDeletable = this.isChoiceDeletable.bind(this);
  }

  isChoiceDeletable() {
    const wait = this.props.wait;
    if(wait) return false;
    const choices = this.props.choices;
    if(choices.length > 2) return true;
    return false;
  }

  render() {
    const {value, index, wait, updateChoice, removeChoice} = this.props;
    return (
      <div key={index}>
        <div style={styles.container}>
          <TextField id={`TextField-${index}`}
                     value={value}
                     onChange={(e, newValue) => updateChoice(newValue, index)}
                     hintText={`Choice ${index+1}`}
                     fullWidth={true}
                     underlineShow={false}
                     disabled={wait}
          />
          <IconButton style={styles.icon} 
                      onClick={() => removeChoice(index)}
                      disabled={!this.isChoiceDeletable()}>
            <ContentClear />
          </IconButton>
        </div>
        <Divider />
      </div>
    );
  }
}

Choice.propTypes = {
  value: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired, 
  wait: PropTypes.bool.isRequired,
  choices: PropTypes.array.isRequired,
  updateChoice: PropTypes.func.isRequired,
  removeChoice: PropTypes.func.isRequired
};

export default Choice;
