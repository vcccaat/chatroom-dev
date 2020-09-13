import React, { useState } from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import Login from './Login';
import { useStateValue } from './StateProvider';
import { HashRouter, Switch, Route } from 'react-router-dom';
import firebase from 'firebase';

function App() {
	const [{ user }, dispatch] = useStateValue();

	return (
		<div className='app'>
			{!user ? (
				<Login />
			) : (
				<div className='app__body'>
					<HashRouter basename='/'>
						<Sidebar />
						<Switch>
							<Route path='/rooms/:roomId'>
								<Chat />
							</Route>

							<Route path='/'>
								<Chat />
							</Route>
						</Switch>
					</HashRouter>
				</div>
			)}
		</div>
	);
}

export default App;
