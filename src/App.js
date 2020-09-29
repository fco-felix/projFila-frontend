import React from 'react';
import ServiceScreen from './components/ServiceScreen';
import Record from './components/Record';

export default function App() {
  return (
    <>
      {false && (
        <div>
          <h3>
            Mudei o acesso à fila (de novo rs). Entre em{' '}
            <a href={'http://192.168.1.200:3000'}>http://192.168.1.200:3000</a>
          </h3>
        </div>
      )}
      {true && (
        <div>
          <Record />
          <ServiceScreen />
        </div>
      )}
    </>
  );
}
