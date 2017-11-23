import React from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';

class Header extends React.Component {
  constructor() {
    super();
    this.onTitleTouch = this.onTitleTouch.bind(this);
  }

  onTitleTouch() {
    this.context.router.push('/');
  }

  render() {
    return (
      <AppBar
        title="Straw Poll"
        showMenuIconButton={false}
        onTitleTouchTap={this.onTitleTouch}
        style={{cursor: 'pointer'}}
      />
    )
  }
}

Header.propTypes = {
  router: PropTypes.object
}

export default Header;
