import React, { useState } from 'react';
import CardClientAttendance from './CardClientAttendance';

export default function Attendance({
  attendanceQueue,
  onCallClient,
  isCallClientDisabled,
  onAttendant,
}) {
  const [isSaveAttendantDisabled, setIsSaveAttendantDisabled] = useState(false);
  const [attendantSend, setAttendantSend] = useState('nobody');

  const handleClickCallClient = () => {
    onCallClient();
  };

  const handleChangeSelect = (event) => {
    setAttendantSend(event.target.value);
  };

  const handleSaveAttendant = (event) => {
    event.preventDefault();
    if (attendantSend === 'nobody') {
      alert('Escolha um atendente!');
      return null;
    }
    onAttendant(attendantSend);
    setIsSaveAttendantDisabled(true);
  };

  return (
    <div>
      <div className="center col s12 m6" style={{ marginTop: '10px' }}>
        <div className="row">
          <div className="col s12">
            <div
              className="container"
              style={{
                display: 'flex',
                flexDirection: 'flex-row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <form onSubmit={handleSaveAttendant}>
                <label htmlFor="attendant">Quem está atendendo?</label>
                <select
                  disabled={isSaveAttendantDisabled}
                  className="s10 browser-default"
                  name="attendant"
                  value={attendantSend}
                  onChange={handleChangeSelect}
                >
                  <option value="nobody" defaultValue>
                    Quem está atendendo?
                  </option>
                  <option value="Danilo">Danilo</option>
                  <option value="Evandro">Evandro</option>
                  <option value="Janaína">Janaína</option>
                  <option value="Matheus">Matheus</option>
                  <option value="Raffael">Raffaell</option>
                  <option value="Valdirene">Valdirene</option>
                </select>
                <button
                  className="waves-effect waves-light btn light-blue"
                  style={{ fontWeight: 'bold', margin: '10px' }}
                  disabled={isSaveAttendantDisabled}
                >
                  <i className="material-icons">save</i>
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="row">
          <button
            className="waves-effect waves-light btn light-blue"
            style={{ fontWeight: 'bold' }}
            onClick={handleClickCallClient}
            disabled={isCallClientDisabled}
          >
            <i className="material-icons right">hearing</i>Chamar cliente
          </button>
          {attendanceQueue && (
            <span
              className="waves-effect waves-light btn amber darken-2"
              style={{
                margin: '10px',
                fontWeight: 'bold',
                cursor: 'default',
              }}
            >
              Clientes em atendimento: {attendanceQueue.length}
            </span>
          )}
        </div>
        {attendanceQueue && (
          <CardClientAttendance
            queued={attendanceQueue}
            isLogged={isSaveAttendantDisabled}
          />
        )}
      </div>
    </div>
  );
}
