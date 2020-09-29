import React, { useState, useEffect } from 'react';
import Queue from './Queue';
import Attendance from './Attendance';
import * as api from '../api/apiService';
import Spinner from './Spinner';
import Record from './Record';

export default function ServiceScreen() {
  const [filter, setFilter] = useState('');
  const [attendant, setAttendant] = useState();
  const [allQueued, setAllQueued] = useState([]);
  const [inQueue, setInQueue] = useState([]);
  const [filteredQueue, setFilteredQueue] = useState([]);
  const [attendanceQueue, setAttendanceQueue] = useState([]);
  const [nextQueuePosition, setNextQueuePosition] = useState(0);
  const [isCallClientDisabled, setIsCallClientDisabled] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const interval = setInterval(async () => {
      const getAllQueued = await api.getAllQueuedSorted();
      const getNextQueuePosition = await api.getNextQueuePosition();
      setAllQueued(getAllQueued);
      setNextQueuePosition(getNextQueuePosition);
      const getInQueue = allQueued.filter(
        (queued) => queued.status === 'Em fila'
      );
      setInQueue(getInQueue);
      var getAttendanceQueue = allQueued.filter(
        (queued) => queued.status === 'Em atendimento'
      );
      if (attendant) {
        getAttendanceQueue = getAttendanceQueue.filter(
          (queued) => queued.attendant === attendant
        );
      }
      setAttendanceQueue(getAttendanceQueue);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [allQueued, nextQueuePosition, attendant]);

  useEffect(() => {
    setIsCallClientDisabled(
      inQueue === undefined || inQueue.length <= 0 || attendant === undefined
    );
    setFilteredQueue(inQueue);
  }, [inQueue, attendant]);

  useEffect(() => {
    const filteredQueue = inQueue.filter((queued) =>
      queued.numberWhatsApp.includes(filter)
    );
    setFilteredQueue(filteredQueue);
  }, [inQueue, filter]);

  const handleFilter = (value) => {
    setFilter(value);
  };

  const handleCallClient = async () => {
    await api.advanceQueue({ attendant });
  };

  const handleSave = () => {};

  const handleAttendant = (value) => {
    setAttendant(value);
  };

  const handleAdvanceQueue = async (queued) => {
    await api.advanceQueueById(queued);
  };

  const handleRemoveQueue = async (queued) => {
    await api.removeQueuedById(queued);
  };

  return (
    <div className="row center">
      <div>
        <Record isVisible={true} />
        <Queue
          filteredQueue={filteredQueue}
          nextQueuePosition={nextQueuePosition}
          filter={filter}
          onFilter={handleFilter}
          onSave={handleSave}
          isUpdating={isUpdating}
          onAdvance={handleAdvanceQueue}
          onRemove={handleRemoveQueue}
        />
        <Attendance
          isCallClientDisabled={isCallClientDisabled}
          attendanceQueue={attendanceQueue}
          onCallClient={handleCallClient}
          onAttendant={handleAttendant}
        />
      </div>
    </div>
  );
}
