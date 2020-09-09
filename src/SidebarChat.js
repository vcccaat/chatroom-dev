import React, { useEffect, useState } from 'react';
import { Avatar } from '@material-ui/core';
import './SidebarChat.css';
import db from './firebase';
import { Link } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import AddBoxIcon from '@material-ui/icons/AddBox';
import ClearIcon from '@material-ui/icons/Clear';

function SidebarChat({ addNewChat, id, name }) {
	const [messages, setMessages] = useState('');
	const [lastMessageTime, setLastMessageTime] = useState('');
	const [{ user }, dispatch] = useStateValue();
	const [roomName, setRoomName] = useState('');

	const createChat = () => {
		const roomName = prompt('请输入房间名称');
		if (roomName) {
			db.collection('rooms').add({
				name: roomName,
			});
			setRoomName(roomName);
		}
	};

	useEffect(() => {
		if (id) {
			db.collection('rooms')
				.doc(id)
				.collection('message')
				.orderBy('time', 'desc')
				.onSnapshot((snapshot) =>
					setMessages(snapshot.docs.map((doc) => doc.data()))
				);
		}
	}, [id]);

	useEffect(() => {
		const today = new Date(messages[0]?.time?.toDate());
		const displayTime =
			today == 'Invalid Date'
				? ''
				: (today.getHours() < 10 ? '0' : '') +
				  today.getHours() +
				  ':' +
				  (today.getMinutes() < 10 ? '0' : '') +
				  today.getMinutes();

		setLastMessageTime(displayTime);
	}, [messages]);

	const deleteRoom = () => {};

	return !addNewChat ? (
		<Link to={`/rooms/${id}`}>
			<div className='sidebarChat'>
				<Avatar src={`https://avatars.dicebear.com/api/identicon/${id}.svg`} />
				<div className='sidebarChat__info'>
					<h2>{name}</h2>
					<div className='sidebarChat__messageInfo'>
						<div className='sidebarChat__message'>{messages[0]?.message}</div>
						<div className='sidebarChat__timestamp'>
							{lastMessageTime}
							<div onClick={deleteRoom}>
								<ClearIcon />
							</div>
						</div>
					</div>
				</div>
			</div>
		</Link>
	) : (
		<div onClick={createChat} className='sidebarChat'>
			<AddBoxIcon /> <p>创建新房间</p>
		</div>
	);
}

export default SidebarChat;
