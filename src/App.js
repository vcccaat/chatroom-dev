import React, { useState } from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import Login from './Login';
import { useStateValue } from './StateProvider';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import firebase from 'firebase';

function App() {
	const [{ user }, dispatch] = useStateValue();
	const [logInSession, setLogInSession] = useState('');
	// const checkSession = () => {
	// 	firebase.auth().onAuthStateChanged((user) => {
	// 		if (user) {
	// 			setLogInSession(1);
	// 			console.log('===================keep login');
	// 		}
	// 	});
	// };
	// checkSession();
	return (
		<div className='app'>
			{!user ? (
				<Login />
			) : (
				<div className='app__body'>
					<Router>
						<Sidebar />
						<Switch>
							<Route path='/rooms/:roomId'>
								<Chat />
							</Route>

							<Route path='/'>
								<Chat />
							</Route>
						</Switch>
					</Router>
				</div>
			)}
		</div>
	);
}

export default App;
