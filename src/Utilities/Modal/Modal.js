import React from 'react';
import './Modal.css';
import ReactDOM from 'react-dom';

function Modal({ title, content, visible, hide, confirm }) {
	return visible
		? ReactDOM.createPortal(
				<React.Fragment>
					<div className='modal'>
						<div className='modal-title'>{title}</div>
						<div className='modal-content'>{content}</div>
						<div className='modal-operator'>
							<button className='modal-operator-confirm' onClick={confirm}>
								确认
							</button>
							<button className='modal-operator-close' onClick={hide}>
								取消
							</button>
						</div>
					</div>
					<div className='mask'></div>
				</React.Fragment>,
				document.body
		  )
		: null;
}

export default Modal;
