import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import { Avatar, IconButton } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// import SearchOutlined from '@material-ui/icons/SearchOutlined';
import SidebarChat from './SidebarChat';
import db from './firebase';
import { useStateValue } from './StateProvider';

function Sidebar() {
	const [rooms, setRooms] = useState([]);
	const [{ user }, dispatch] = useStateValue();

	useEffect(() => {
		const unsubscribe = db.collection('rooms').onSnapshot((snapshot) =>
			setRooms(
				snapshot.docs.map((doc) => ({
					id: doc.id,
					data: doc.data(),
				}))
			)
		);
		return () => {
			unsubscribe();
		};
	}, []);

	const exitAccount = () => {
		localStorage.clear();
		window.location.reload();
	};

	return (
		<div className='sidebar'>
			<div className='sidebar__header'>
				<Avatar
					src={`https://avatars.dicebear.com/api/bottts/${user.displayName}.svg`}
				/>
				<h2>{user.displayName}</h2>
				<div className='sidebar__headerRight' onClick={exitAccount}>
					<IconButton>
						<ExitToAppIcon />
					</IconButton>
				</div>
			</div>
			{/* <div className='sidebar__search'>
				<div className='sidebar__searchContainer'>
					<SearchOutlined />
					<input placeholder='搜索聊天房间' type='text' />
				</div>
			</div> */}
			<div className='sidebar__chats'>
				<SidebarChat addNewChat />
				{rooms.map((room) => (
					<SidebarChat key={room.id} id={room.id} name={room.data.name} />
				))}
			</div>
		</div>
	);
}

export default Sidebar;
