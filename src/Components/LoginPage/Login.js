import React, { useState } from 'react';
import './Login.css';
import { actionTypes } from '../../Utilities/Redux/reducer';
import { useStateValue } from '../../Utilities/Redux/StateProvider';
import { auth } from '../../Utilities/Firebase/firebase';
import { Grid, Typography, Button, Paper } from '@material-ui/core';

function Login() {
	// eslint-disable-next-line
	const [{}, dispatch] = useStateValue();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const [loginVisible, setLoginVisible] = useState(true);

	const signIn = () => {
		auth
			.signInWithEmailAndPassword(email, password)
			.then((result) => {
				dispatch({
					type: actionTypes.SET_USER,
					user: result.user,
				});
			})
			.catch((error) => alert(error.message));
	};

	const switchSignup = () => {
		setLoginVisible(false);
	};

	const switchLogin = () => {
		setLoginVisible(true);
	};

	const signup = () => {
		auth
			.createUserWithEmailAndPassword(email, password)
			.then((result) => {
				return result.user.updateProfile({
					displayName: name,
				});
			})
			.then(alert('成功注册啦！'))
			.catch((error) => alert(error.message));

		switchLogin();
	};

	return loginVisible ? (
		<div className='login'>
			<Paper className='login__container'>
				<Grid container direction='column'>
					<Typography variant='h4'>一起来聊天吧</Typography>
					<input
						onChange={(e) => setEmail(e.target.value)}
						id='email'
						type='email'
						placeholder='邮箱'
					/>
					<input
						onChange={(e) => setPassword(e.target.value)}
						id='password'
						type='password'
						placeholder='密码'
					/>
					<Button className='signin__button' onClick={signIn}>
						登录账号
					</Button>
					<Button className='register__button' onClick={switchSignup}>
						注册账号
					</Button>
				</Grid>
			</Paper>
		</div>
	) : (
		<div className='login'>
			<Paper className='login__container'>
				<Grid container direction='column'>
					<Typography variant='h4'>注册用户</Typography>
					<input
						onChange={(e) => setName(e.target.value)}
						id='name'
						type='text'
						placeholder='用户名'
					/>
					<input
						onChange={(e) => setEmail(e.target.value)}
						id='email2'
						type='email'
						placeholder='邮箱'
					/>
					<input
						onChange={(e) => setPassword(e.target.value)}
						id='password2'
						type='password'
						placeholder='密码'
					/>
					<Button className='signin__button' onClick={signup}>
						注册
					</Button>
					<Button className='register__button' onClick={switchLogin}>
						返回登录页面
					</Button>
				</Grid>
			</Paper>
		</div>
	);
}

export default Login;
