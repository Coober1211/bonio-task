import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
// import { ConnectedRouter } from 'react-router-redux';
import ClassGrid from './components/ClassGrid';
import ClassPage from './components/ClassPage';
import NotFound from './components/NotFound';

import { Provider } from 'react-redux';
import store, { history } from './store';

class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<BrowserRouter>
					<Switch>
						<Route exact path="/" component={ClassGrid} />
						<Route path="/class/:classId" component={ClassPage} />
						<Route component={NotFound} />
					</Switch>
				</BrowserRouter>
			</Provider>
		);
	}
}

export default App;
