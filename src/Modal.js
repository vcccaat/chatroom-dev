import React, { useState, forwardRef, useImperativeHandle } from 'react';
import db from './firebase';

function Modal(props, ref) {
	// const [display, setDisplay] = useState(false);

	// useImperativeHandle(ref, () => {
	// 	return {
	// 		openModal: () => open(),
	// 		closeModal: () => close(),
	// 	};
	// });

	// const open = () => {
	// 	setDisplay(true);
	// 	// document.querySelector('.modal').style.display = 'block';
	// };

	// const close = () => {
	// 	setDisplay(false);
	// 	// document.querySelector('.modal').style.display = 'none';
	// };

	// if (display) {
	return (
		<div className='modal__Container'>
			<div className='modal'>{props.children}</div>
		</div>
	);
	// }

	// return null;
}

const forwardModal = forwardRef(Modal);
export default forwardModal;
