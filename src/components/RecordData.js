import React, { useEffect, useState } from 'react';
import * as formatter from '../helpers/formatNumber.js';
import * as api from '../api/apiService.js';
import Spinner from './Spinner';

export default function RecordData({ onClose }) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [attendantFilter, setAttendantFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  useEffect(() => {
    const getData = async () => {
      const newData = await api.getAllData();
      setData(newData);
      setFilteredData(newData);
    };
    getData();
  }, []);

  useEffect(() => {}, [attendantFilter, statusFilter]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleChangeAttendantSelect = (event) => {
    setAttendantFilter(event.target.value);
  };

  const handleChangeStatusSelect = (event) => {
    setStatusFilter(event.target.value);
  };

  const handleModalClose = () => {
    onClose(null);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      onClose(null);
    }
  };

  const handleReport = () => {
    if (attendantFilter && attendantFilter !== 'nobody') {
      const filteredByAttendant = filteredData.filter(
        (queued) => queued.attendant === attendantFilter
      );
      setFilteredData(filteredByAttendant);
    } else {
      setFilteredData(data);
    }
    if (statusFilter && statusFilter !== 'none') {
      const filteredByStatus = filteredData.filter(
        (queued) => queued.status === statusFilter
      );
      setFilteredData(filteredByStatus);
    }
  };

  return (
    <div>
      {data.length <= 0 && <Spinner />}
      {data.length > 0 && (
        <div>
          <div
            style={{
              marginTop: '5px',
              marginBottom: '7px',
              maxHeight: '800px',
            }}
          >
            <div className="container">
              <span style={styles.title}>Relatório de atendimentos</span>
              <button
                className="waves-effect waves-lights btn red dark-4"
                onClick={handleModalClose}
                style={{
                  position: 'absolute',
                  top: '0px',
                  right: '0px',
                  margin: '3px',
                }}
              >
                X
              </button>
              <div>
                <div
                  style={{
                    marginTop: '5px',
                    marginBottom: '5px',
                  }}
                >
                  <select
                    className="s5 browser-default"
                    name="attendant"
                    value={attendantFilter}
                    onChange={handleChangeAttendantSelect}
                  >
                    <option value="nobody" defaultValue>
                      Atendente
                    </option>
                    <option value="Danilo">Danilo</option>
                    <option value="Evandro">Evandro</option>
                    <option value="Janaína">Janaína</option>
                    <option value="Matheus">Matheus</option>
                    <option value="Raffael">Raffaell</option>
                    <option value="Valdirene">Valdirene</option>
                  </select>
                </div>
                <div
                  style={{
                    marginTop: '5px',
                    marginBottom: '5px',
                  }}
                >
                  <select
                    className="s5 browser-default"
                    name="status"
                    value={statusFilter}
                    onChange={handleChangeStatusSelect}
                  >
                    <option value="none" defaultValue>
                      Status
                    </option>
                    <option value="Em fila">Em fila</option>
                    <option value="Em atendimento">Em atendimento</option>
                    <option value="Finalizado">Finalizado</option>
                    <option value="Cancelado">Cancelado</option>
                    <option value="Retirado da fila">Retirado da fila</option>
                  </select>
                </div>
                <button
                  className="btn waves-light waves-effect"
                  onClick={handleReport}
                >
                  Buscar
                  <i className="material-icons">search</i>
                </button>
              </div>
              {filteredData.length <= 0 && (
                <span>
                  Não obtivemos resultados! Experimente um filtro ou uma busca
                  diferente.
                </span>
              )}
              {filteredData.length > 0 && (
                <table style={styles.table} className="striped">
                  <thead>
                    <tr>
                      <th style={{ width: '20%' }}>Cliente</th>
                      <th style={{ width: '20%' }}>Serviço</th>
                      <th style={{ width: '20%' }}>Status</th>
                      <th style={{ width: '20%' }}>Atendente</th>
                      <th style={{ width: '20%' }}>Data</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map(
                      ({
                        id,
                        numberWhatsApp,
                        requestedService,
                        status,
                        attendant,
                        timestamp,
                      }) => {
                        return (
                          <tr key={id}>
                            <td>
                              {formatter.formatWhatsAppNumber(numberWhatsApp)}
                            </td>
                            <td>{requestedService}</td>
                            <td>{status}</td>
                            <td>{attendant}</td>
                            <td>{formatter.formatData(timestamp)}</td>
                          </tr>
                        );
                      }
                    )}
                    <tr>
                      <td>Total de atendimentos:</td>
                      <td>
                        {filteredData.reduce((cur, acc) => {
                          acc = 1;
                          return cur + acc;
                        }, 0)}
                      </td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '40px',
  },

  title: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
  },

  errorMessage: {
    color: 'red',
    fontWeight: 'bold',
  },
};
