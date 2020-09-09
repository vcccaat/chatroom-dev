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
	const [currentTime, setcurrentTime] = useState('');
	const [{ user }, dispatch] = useStateValue();

	useEffect(() => {
		const today = new Date();
		const time =
			(today.getHours() < 10 ? '0' : '') +
			today.getHours() +
			':' +
			(today.getMinutes() < 10 ? '0' : '') +
			today.getMinutes();
		setcurrentTime(time);
	});

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
		e.preventDefault();
		if (input.trim() !== '') {
			db.collection('rooms').doc(roomId).collection('message').add({
				message: input,
				name: user.displayName,
				time: firebase.firestore.FieldValue.serverTimestamp(),
			});
			setInput('');
		}
	};

	return (
		<div className='chat'>
			<div className='chat__header'>
				<Avatar
					src={`https://avatars.dicebear.com/api/identicon/${roomId}.svg`}
				/>
				<div className='chat__headerInfo'>
					<h3>{roomName}</h3>
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
								src={`https://avatars.dicebear.com/api/bottts/${
									message.name === user.displayName ? user.displayName : roomId
								}.svg`}
							/>
						</div>
						<p className='chat__message'>
							<span className='chat__name'>{message.name}</span>
							{message.message}
						</p>
					</div>
				))}
				<div className='chat__timestamp'>
					<p>{currentTime}</p>
				</div>
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
