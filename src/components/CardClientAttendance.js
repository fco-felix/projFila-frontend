import React from 'react';
import FlipMove from 'react-flip-move';
import * as formatter from '../helpers/formatNumber';
import { updateQueue } from '../api/apiService';

export default function CardClientAttendance({ queued, isLogged }) {
  return (
    <div>
      <FlipMove
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        {queued.map((queue) => {
          return (
            <div
              className="card-panel blue lighten-5"
              style={{
                minWidth: '250px',
                maxWidth: '250px',
                margin: '5px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              key={queue.id}
            >
              <span
                className="new badge blue"
                data-badge-caption="Em atendimento"
                style={{ fontWeight: 'bold', fontSize: '1rem' }}
              ></span>
              <span
                className="new badge amber darken-2"
                data-badge-caption={queue.attendant}
                style={{ marginTop: '3px', fontSize: '0.8rem' }}
              ></span>
              <div
                style={{
                  marginTop: '10px',
                  marginBottom: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <span style={{ fontWeight: 'bold' }}>
                  {formatter.formatWhatsAppNumber(queue.numberWhatsApp)}
                </span>
                <span style={{ fontWeight: 'bold' }}>
                  {queue.requestedService}
                </span>
                <span>{queue.process}</span>
                <span>{queue.name}</span>
                <span>{queue.adress}</span>
                <span>{formatter.formatCPF(queue.cpf)}</span>
              </div>
              <div>
                <a
                  className="btn-floating btn-small green lighten-2"
                  href={`https://wa.me/55${
                    queue.numberWhatsApp
                  }${formatter.formatMessageForWhatsApp(queue)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  disabled={!isLogged}
                >
                  <i className="material-icons">message</i>
                </a>
                <button
                  className="btn-floating btn-small green"
                  onClick={() => {
                    queue.status = 'Finalizado';
                    updateQueue(queue);
                  }}
                  disabled={!isLogged}
                >
                  <i className="material-icons">verified</i>
                </button>
                <button
                  className="btn-floating btn-small red lighten-2"
                  onClick={() => {
                    queue.status = 'Cancelado';
                    updateQueue(queue);
                  }}
                  disabled={!isLogged}
                >
                  <i className="material-icons">cancel</i>
                </button>
              </div>
            </div>
          );
        })}
      </FlipMove>
    </div>
  );
}
