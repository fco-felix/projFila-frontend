import React, { useState } from 'react';
import RecordData from './RecordData';

export default function Record() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [icon, setIcon] = useState('assessment');
  const [colorButton, setColorButton] = useState('blue');

  const handleClickReportButton = () => {
    if (!modalIsOpen) {
      setIcon('close');
      setColorButton('red');
      setModalIsOpen(true);
    } else {
      setIcon('assessment');
      setColorButton('blue');
      setModalIsOpen(false);
    }
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
          className={`btn-floating waves-effect waves-light ${colorButton}`}
          onClick={handleClickReportButton}
          disabled={true}
        >
          <i className="material-icons">{icon}</i>
        </a>
      </div>
      <div>{modalIsOpen && <RecordData />}</div>
    </div>
  );
}
