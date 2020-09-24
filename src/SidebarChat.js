import React, { useEffect, useState, useRef } from 'react';
import { Avatar } from '@material-ui/core';
import './SidebarChat.css';
import db from './firebase';
import { Link } from 'react-router-dom';
import AddBoxIcon from '@material-ui/icons/AddBox';
import ClearIcon from '@material-ui/icons/Clear';
import Button from '@material-ui/core/Button';
import Modal from './Modal';

function SidebarChat({ addNewChat, id, name }) {
	const [messages, setMessages] = useState('');
	const [lastMessageTime, setLastMessageTime] = useState('');
	const modalRef = useRef('');

	const createChat = () => {
		const roomName = prompt('请输入房间名称');
		if (roomName) {
			db.collection('rooms').add({
				name: roomName,
			});
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
		const lastMesgTime = new Date(messages[0]?.time?.toDate());
		const displayTime =
			// eslint-disable-next-line
			lastMesgTime == 'Invalid Date'
				? ''
				: (lastMesgTime.getHours() < 10 ? '0' : '') +
				  lastMesgTime.getHours() +
				  ':' +
				  (lastMesgTime.getMinutes() < 10 ? '0' : '') +
				  lastMesgTime.getMinutes();

		setLastMessageTime(displayTime);
	}, [messages]);

	const deleteRoom = () => {
		modalRef.current.style.display = 'block';
	};

	const confirmDelete = () => {
		// window.location.href = '/chatroom';
		db.collection('rooms')
			.doc(name)
			.delete()
			.then(() => {
				window.location.href = '/chatroom';
			});
		closeRoom();
	};

	const closeRoom = () => {
		modalRef.current.style.display = 'none';
	};

	return !addNewChat ? (
		<Link to={`/chatroom/${id}`}>
			<div className='sidebarChat'>
				<Avatar src={`https://avatars.dicebear.com/api/identicon/${id}.svg`} />
				<div className='sidebarChat__info'>
					<h2>{name}</h2>
					<div className='sidebarChat__messageInfo'>
						<div className='sidebarChat__message'>{messages[0]?.message}</div>
						<div className='sidebarChat__timestamp'>{lastMessageTime}</div>
						<div className='sidebarChat__delete' onClick={deleteRoom}>
							<ClearIcon />
							<Modal ref={modalRef}>
								<p>确认要删除 “{name}" 群聊吗？</p>
								<Button
									variant='outlined'
									color='primary'
									onClick={confirmDelete}
								>
									确认
								</Button>
								<Button variant='outlined' color='primary' onClick={closeRoom}>
									取消
								</Button>
							</Modal>
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
