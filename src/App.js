import React, { useState } from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import Login from './Login';
import { useStateValue } from './StateProvider';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Switch as Toggle } from '@material-ui/core';
import { Grid, Paper } from '@material-ui/core';

function App() {
	const [{ user }] = useStateValue();
	const [darkmode, setDarkMode] = useState(true);

	const darkTheme = createMuiTheme({
		palette: {
			type: darkmode ? 'dark' : 'light',
			background: {
				paper: darkmode ? '#424242' : '#ededed',
			},
		},
	});

	return (
		<ThemeProvider theme={darkTheme}>
			<div className='app'>
				<span className='toggle'>
					Dark Mode
					<Toggle
						color='Primary'
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
