import React, { useEffect, useState } from 'react';
import { Avatar } from '@material-ui/core';
import './SidebarChat.css';
import { db } from '../../Utilities/Firebase/firebase';
import { Link, useHistory } from 'react-router-dom';
import AddBoxIcon from '@material-ui/icons/AddBox';
import ClearIcon from '@material-ui/icons/Clear';
import Modal from '../../Utilities/Modal/Modal';
import useModal from '../../Utilities/Modal/useModal';

function SidebarChat({ addNewChat, id, name }) {
	const [messages, setMessages] = useState('');
	const [lastMessageTime, setLastMessageTime] = useState('');
	const { isShowing, toggle } = useModal();
	let history = useHistory();

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
				.onSnapshot(
					(snapshot) => setMessages(snapshot.docs.map((doc) => doc.data())),
					(error) => {
						console.error('Error getting message of the room: ', id, error);
					}
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

	const confirmDelete = (event) => {
		event.preventDefault();
		history.push('/chatroom');
		db.collection('rooms')
			.doc(id)
			.delete()
			.then(() => {
				console.log('Document successfully deleted!');
				alert('成功删除！');
				window.location.reload(false);
			})
			.catch((error) => {
				console.error('Error removing document: ', error);
			});
	};

	return !addNewChat ? (
		<Link to={`/chatroom/${id}`}>
			<div className='sidebarChat'>
				<Avatar src={`https://avatars.dicebear.com/api/identicon/${id}.svg`} />
				<div className='sidebarChat__room'>
					<div className='sidebarChat__roomName'>{name}</div>
					<div className='sidebarChat__messageInfo'>
						<div className='sidebarChat__lastMessage'>
							{messages[0]?.message}
						</div>
						<div className='sidebarChat__timestamp'>{lastMessageTime}</div>
						<div className='sidebarChat__delete' onClick={toggle}>
							<ClearIcon />
							<Modal
								visible={isShowing}
								hide={toggle}
								title='注意'
								roomName={name}
								content={`确认要删除 ${name} 群聊吗？`}
								confirm={confirmDelete}
							/>
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
