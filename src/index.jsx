import React from 'react';
import ReactDOM from'react-dom';
import {Route,Router} from 'react-router';

import {createStore,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import io from 'socket.io-client';

import reducer from './reducer';
import remoteActionMiddleware from './remote_action_middleware';
import {VotingContainer} from './components/Voting.jsx';
import App from './components/App.jsx';
import {ResultsContainer} from './components/Results.jsx';
import {setState} from './action_creators';

require('./app.css');

const socket = io(`${location.protocol}//${location.hostname}:3100`);

const createStoreWithMiddleware = applyMiddleware(remoteActionMiddleware(socket))(createStore)

const store = createStoreWithMiddleware(reducer);


socket.on('state',state => {
	store.dispatch(setState(state));
});

const pair = ['Trainspotting','28 Days Later'];

const routes = <Route component={App}>
	<Route path="/" component={VotingContainer}/>
	<Route path="/results" component={ResultsContainer}/>
</Route>;

ReactDOM.render(<Provider store={store}>
	<Router>{routes}</Router>
</Provider>,
document.getElementById('app'));