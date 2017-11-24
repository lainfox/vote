import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import base from '../base';
import Header from './shared/Header';
import StrawpollCreate from './StrawpollCreate';
import StrawpollShow from './StrawpollShow';
import StrawpollVote from './StrawpollVote';
import NotFound from './NotFound';

class App extends React.Component {
	render() {
		return (
		  <Router>
		  	<main>
				  <Header />
				  <Switch>
						<Route path="/" exact component={StrawpollCreate} />
						<Route path="/q/:id" exact component={StrawpollVote} />
						<Route path="/q/:id/re" component={StrawpollShow} />
			  		<Route component={NotFound} />
			  	</Switch>
		  	</main>
		  </Router>
		)
	}
}

export default App;
