import React, { useState } from 'react';
import RecordData from './RecordData';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function Record() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleClose = () => {
    setModalIsOpen(false);
  };

  const handleOpen = () => {
    setModalIsOpen(true);
  };

  return (
    <div>
      <div
        style={{
          position: 'absolute',
          top: '0px',
          right: '0px',
          margin: '3px',
        }}
      >
        <a
          className={`btn-floating btn waves-effect waves-light blue`}
          onClick={handleOpen}
          disabled={true}
        >
          <i className="material-icons">assessment</i>
        </a>
      </div>
      <div>
        <Modal
          isOpen={modalIsOpen}
          centered
          style={{
            overlay: {
              backgroundColor: 'rgba(0,0,0,0.6)',
              zIndex: 1000,
            },
            content: {
              width: '80%',
              height: '85%',
              margin: 'auto',
            },
          }}
        >
          <RecordData onClose={handleClose} />
        </Modal>
      </div>
    </div>
  );
}
