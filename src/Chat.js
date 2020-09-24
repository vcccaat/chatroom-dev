import React, { useEffect, useState } from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import { useParams } from 'react-router-dom';
import './Chat.css';
import db from './firebase';
import firebase from 'firebase';
import { useStateValue } from './StateProvider';

export default function Chat() {
	const [input, setInput] = useState('');
	const { roomId } = useParams();
	const [roomName, setRoomName] = useState('');
	const [messages, setMessages] = useState([]);
	const [lastTime, setLastTime] = useState('');
	const [{ user }] = useStateValue();

	useEffect(() => {
		const lastMesgTime = new Date(
			messages[messages.length - 1]?.time?.toDate()
		);
		const displayTime =
			// eslint-disable-next-line
			lastMesgTime == 'Invalid Date'
				? ''
				: lastMesgTime.getMonth() +
				  '月' +
				  lastMesgTime.getDate() +
				  '日     ' +
				  (lastMesgTime.getHours() < 10 ? '0' : '') +
				  lastMesgTime.getHours() +
				  ':' +
				  (lastMesgTime.getMinutes() < 10 ? '0' : '') +
				  lastMesgTime.getMinutes();
		setLastTime(displayTime);
	}, [messages]);

	useEffect(() => {
		if (roomId) {
			db.collection('rooms')
				.doc(roomId)
				.onSnapshot((snapshot) => {
					setRoomName(snapshot.data().name);
				});
			db.collection('rooms')
				.doc(roomId)
				.collection('message')
				.orderBy('time', 'asc')
				.onSnapshot((snapshot) =>
					setMessages(snapshot.docs.map((doc) => doc.data()))
				);
		}
	}, [roomId]);

	const sendMessage = (e) => {
		if (roomId) {
			e.preventDefault();
			if (input.trim() !== '') {
				db.collection('rooms').doc(roomId).collection('message').add({
					message: input,
					name: user.displayName,
					time: firebase.firestore.FieldValue.serverTimestamp(),
				});
				setInput('');
			}
		}
	};

	const messageSendTime = (t) => {
		const time = new Date(t.toDate());
		const displayTime =
			(time.getHours() < 10 ? '0' : '') +
			time.getHours() +
			':' +
			(time.getMinutes() < 10 ? '0' : '') +
			time.getMinutes();
		return displayTime;
	};

	return (
		<div className='chat'>
			<div className='chat__header'>
				<Avatar
					src={`https://avatars.dicebear.com/api/identicon/${roomId}.svg`}
				/>
				<div className='chat__headerInfo'>
					<h3>{roomName}</h3>
					<div className='chat__timestamp'>
						<p>最近一次聊天 {lastTime}</p>
					</div>
				</div>
				<div className='chat__headerRight'>
					<IconButton>
						<MoreHorizIcon />
					</IconButton>
				</div>
			</div>
			<div className='chat__body'>
				{messages.map((message, index) => (
					<div
						key={index}
						className={`chat__info ${
							message.name === user.displayName && 'chat__receiver'
						}`}
					>
						<div
							className={`${
								message.name === user.displayName && 'chat__receiverIcon'
							}`}
						>
							<Avatar
								src={`https://avatars.dicebear.com/api/bottts/${message.name}.svg`}
							/>
						</div>
						<p className='chat__message'>
							<p className='chat__name'>{message.name}</p>
							<p className='chat__time'>
								{message.name === user.displayName
									? ''
									: messageSendTime(message.time)}
							</p>
							{message.message}
						</p>
					</div>
				))}
			</div>
			<div className='chat__footer'>
				<div className='chat__footerWrap'>
					<InsertEmoticonIcon />
					<form>
						<input
							value={input}
							onChange={(e) => {
								setInput(e.target.value);
							}}
							maxLength='200'
							type='text'
						/>
						<button onClick={sendMessage} type='submit'></button>
					</form>
					<MicIcon />
				</div>
			</div>
		</div>
	);
}
