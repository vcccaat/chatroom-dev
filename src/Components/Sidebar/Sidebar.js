import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import { Avatar, IconButton } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// import SearchOutlined from '@material-ui/icons/SearchOutlined';
import SidebarChat from './SidebarChat';
import { db } from '../../Utilities/Firebase/firebase';
import { useStateValue } from '../../Utilities/Redux/StateProvider';
import Loading from '../../Utilities/Loading/Loading';

function Sidebar() {
	const [rooms, setRooms] = useState([]);
	const [{ user }] = useStateValue();
	const [loading, setLoading] = useState('loading');

	useEffect(() => {
		const unsubscribe = db.collection('rooms').onSnapshot(
			(snapshot) => {
				setRooms(
					snapshot.docs.map((doc) => ({
						id: doc.id,
						data: doc.data(),
					}))
				);
				setLoading('success');
			},
			(error) => {
				console.error('Error loading chatting rooms ', error);
				setLoading('failed');
			}
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
				<Loading
					visible={loading}
					content={loading === 'loading' ? '加载中...' : '请检查网络'}
				/>
			</div>
		</div>
	);
}

export default Sidebar;
