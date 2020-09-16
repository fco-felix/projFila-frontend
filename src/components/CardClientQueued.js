import React from 'react';
import FlipMove from 'react-flip-move';
import * as formatter from '../helpers/formatNumber';

export default function CardClientQueued({
  queued,
  onClickAdvance,
  onClickRemove,
}) {
  const handleClickAdvance = (queued) => {
    onClickAdvance(queued);
  };

  const handleClickRemove = (queued) => {
    onClickRemove(queued);
  };

  return (
    <div style={{ maxHeight: '650px', overflow: 'auto' }}>
      <FlipMove
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        {queued.map((queued) => {
          return (
            <div
              className="card-panel light-blue lighten-5"
              style={{
                minWidth: '200px',
                maxWidth: '250px',
                margin: '5px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              key={queued.id}
            >
              <span
                className="new badge light-blue"
                data-badge-caption="º"
                style={{ fontWeight: 'bold', fontSize: '1rem' }}
              >
                {queued.queuePosition}
              </span>
              <div
                style={{
                  marginTop: '10px',
                  marginBottom: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <span style={{ fontWeight: 'bold' }}>
                  {formatter.formatWhatsAppNumber(queued.numberWhatsApp)}
                </span>
                <span style={{ fontWeight: 'bold' }}>
                  {queued.requestedService}
                </span>
                <span>{queued.process}</span>
                <span>{queued.name}</span>
                <span>{queued.adress}</span>
                <span>{formatter.formatCPF(queued.cpf)}</span>
              </div>
              <div>
                <button
                  className="btn-floating btn-small orange lighten-2"
                  disabled={queued.queuePosition === 1}
                  onClick={() => {
                    handleClickAdvance(queued);
                  }}
                >
                  <i className="material-icons">call_split</i>
                </button>
                <button
                  className="btn-floating btn-small red lighten-2"
                  onClick={() => {
                    handleClickRemove(queued);
                  }}
                >
                  <i className="material-icons">delete</i>
                </button>
                <a
                  className="btn-floating btn-small green lighten-2"
                  href={`https://wa.me/55${queued.numberWhatsApp}${positionMessage}${queued.queuePosition}º`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="material-icons">phone</i>
                </a>
              </div>
            </div>
          );
        })}
      </FlipMove>
    </div>
  );
}

const positionMessage = '?text=Sua%20posição%20na%20fila%20é%20a%20';
