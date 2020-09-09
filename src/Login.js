import React, { useState } from 'react';
import './Login.css';
import { auth, provider } from './firebase';
import { actionTypes } from './reducer';
import { useStateValue } from './StateProvider';
import firebase from 'firebase';

function Login() {
	const [{}, dispatch] = useStateValue();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');

	const signIn = () => {
		firebase
			.auth()
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
		document.querySelector('.hideLogin').style.display = 'none';
		document.querySelector('.hideSignup').style.display = 'block';
	};

	const switchLogin = () => {
		document.querySelector('.hideLogin').style.display = 'block';
		document.querySelector('.hideSignup').style.display = 'none';
	};

	const signup = () => {
		firebase
			.auth()
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

	return (
		<div className='login'>
			<div className='hideLogin'>
				<div className='login__container'>
					<h2>一起来聊天吧</h2>
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
					<button onClick={signIn}>登录账号</button>
					<span onClick={switchSignup}> 注册账号 </span>
				</div>
			</div>
			<div className='hideSignup'>
				<div className='login__container'>
					<h2>注册用户</h2>
					<input
						onChange={(e) => setName(e.target.value)}
						id='name'
						type='text'
						placeholder='用户名'
					/>
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
					<button onClick={signup}>注册</button>
					<button onClick={switchLogin}>返回登录页面</button>
				</div>
			</div>
		</div>
	);
}

export default Login;
