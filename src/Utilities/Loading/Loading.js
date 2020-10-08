import React from 'react';
import './Loading.css';
import ReactDOM from 'react-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

function Loading({ visible, content }) {
	const display = visible !== 'success' ? true : false;

	return display
		? ReactDOM.createPortal(
				<React.Fragment>
					<div className='loading__container'>
						<div className='loading__icon'>
							<CircularProgress />
						</div>
						<div className='loading__word'>{content}</div>
					</div>
					<div className='mask'></div>
				</React.Fragment>,
				document.body
		  )
		: null;
}

export default Loading;
