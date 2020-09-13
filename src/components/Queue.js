import React, { useState } from 'react';
import MyForm from './FormikForm';
import CardClientQueued from './CardClientQueued';
import Spinner from './Spinner';

export default function Queue({
  filteredQueue,
  nextQueuePosition,
  onFilter,
  onSave,
}) {
  const [isClientFormOpen, setIsClientFormOpen] = useState(false);
  const [button, setButtonState] = useState({
    color: 'light-blue',
    label: 'Incluir cliente',
    icon: 'account_box',
  });

  const handleFilter = (event) => {
    const value = event.target.value;
    onFilter(value);
  };

  const handleClickClient = () => {
    if (isClientFormOpen) {
      let buttonOpen = {
        color: 'light-blue',
        label: 'Incluir cliente',
        icon: 'account_box',
      };
      setButtonState(buttonOpen);
      setIsClientFormOpen(false);
    } else {
      let buttonClose = {
        color: 'red',
        label: 'Cancelar',
        icon: 'cancel',
      };
      setButtonState(buttonClose);
      setIsClientFormOpen(true);
    }
  };

  const handleClickSave = () => {
    let buttonOpen = {
      color: 'light-blue',
      label: 'Incluir cliente',
      icon: 'account_box',
    };
    setButtonState(buttonOpen);
    setIsClientFormOpen(false);
    onSave();
  };

  return (
    <div
      className="center col s12 m6"
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      <div className="row">
        <form className="col s12">
          <div className="row">
            <div className="input-field">
              <i className="material-icons prefix">phone</i>
              <input
                placeholder="Pesquisar pelo Whatsapp"
                id="filter"
                type="text"
                onChange={handleFilter}
              />
            </div>
          </div>
        </form>
      </div>

      <div className="row">
        <a
          className={`waves-effect waves-light btn ${button.color}`}
          style={{ fontWeight: 'bold' }}
          onClick={handleClickClient}
        >
          <i className="material-icons right">{button.icon}</i>
          {button.label}
        </a>
        <span
          className="waves-effect waves-light btn amber darken-2"
          style={{
            margin: '10px',
            fontWeight: 'bold',
            cursor: 'default',
          }}
        >
          Próxima posição da fila: {nextQueuePosition}
        </span>
      </div>

      {isClientFormOpen && <MyForm onSave={handleClickSave} />}
      {filteredQueue === undefined && <Spinner></Spinner>}
      {filteredQueue.length === 0 && (
        <h6 style={{ fontWeight: 'bold' }}>Não existem clientes na fila.</h6>
      )}
      {filteredQueue.length > 0 && <CardClientQueued queued={filteredQueue} />}
    </div>
  );
}
