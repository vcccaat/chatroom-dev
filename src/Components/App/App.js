import React, { useState } from 'react';
import './App.css';
import Sidebar from '../Sidebar/Sidebar';
import Chat from '../ChatPage/Chat';
import Login from '../LoginPage/Login';
import { useStateValue } from '../../Utilities/Redux/StateProvider';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Switch as Toggle, Grid, Paper } from '@material-ui/core';

function App() {
	const [{ user }] = useStateValue();
	const [darkmode, setDarkMode] = useState(true);

	const darkTheme = createMuiTheme({
		palette: {
			type: darkmode ? 'dark' : 'light',
			background: {
				paper: darkmode ? '#303030' : '#ededed',
			},
		},
	});

	return (
		<ThemeProvider theme={darkTheme}>
			<div className='app'>
				<span className='toggle'>
					Dark Mode
					<Toggle
						color='primary'
						checked={darkmode}
						onChange={() => setDarkMode(!darkmode)}
					/>
				</span>
				<Router>
					{!user ? (
						<Route path='/chatroom'>
							<Login />
						</Route>
					) : (
						<Paper>
							<Grid container direction='column'>
								<div className='app__body'>
									<Sidebar />
									<Switch>
										<Route path='/chatroom/:roomId'>
											<Chat />
										</Route>

										<Route path='/chatroom'>
											<Chat />
										</Route>
									</Switch>
								</div>
							</Grid>
						</Paper>
					)}
				</Router>
			</div>
		</ThemeProvider>
	);
}

export default App;
