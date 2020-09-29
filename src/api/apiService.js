import axios from 'axios';

const API_URl = 'https://projfila-backend.herokuapp.com/queue/';

const SERVICES_TYPE = [
  {
    id: 1,
    serviceType: 'Extrato de débito',
    maxWaitInMinutes: 10,
  },
  {
    id: 2,
    serviceType: '2ª via',
    maxWaitInMinutes: 10,
  },
  {
    id: 3,
    serviceType: 'Parcelamento',
    maxWaitInMinutes: 30,
  },
  {
    id: 4,
    serviceType: 'Transferência de titular',
    maxWaitInMinutes: 45,
  },
  {
    id: 5,
    serviceType: 'Ligação nova',
    maxWaitInMinutes: 60,
  },
  {
    id: 6,
    serviceType: 'Religação',
    maxWaitInMinutes: 15,
  },
  {
    id: 7,
    serviceType: 'Corte a pedido',
    maxWaitInMinutes: 30,
  },
  {
    id: 8,
    serviceType: 'Tarifa social',
    maxWaitInMinutes: 60,
  },
  {
    id: 9,
    serviceType: 'Refaturamento',
    maxWaitInMinutes: 30,
  },
  {
    id: 10,
    serviceType: 'Esgotamento de fossa',
    maxWaitInMinutes: 60,
  },
  {
    id: 11,
    serviceType: 'Serviços de manutenção',
    maxWaitInMinutes: 15,
  },
  {
    id: 12,
    serviceType: 'Falar com um atendente',
    maxWaitInMinutes: 60,
  },
  {
    id: 13,
    serviceType: 'Informação',
    maxWaitInMinutes: 10,
  },
  {
    id: 14,
    serviceType: 'Outros',
    maxWaitInMinutes: 30,
  },
];

async function getAllData() {
  const res = await axios.get(API_URl);
  const queue = res.data.queue.sort((a, b) => a.timestamp - b.timestamp);
  return queue;
}

async function getAllQueuedSorted() {
  const res = await axios.get(`${API_URl}/last5days`);
  const queue = res.data.queue.sort(
    (a, b) => a.queuePosition - b.queuePosition
  );
  return queue;
}

async function getNextQueuePosition() {
  const res = await axios.get(API_URl);
  return res.data.nextQueuePosition;
}

async function advanceQueue(attendant) {
  const res = await axios.patch(API_URl, attendant);
  return res;
}

async function advanceQueueById(queued) {
  const res = await axios.patch(`${API_URl}/${queued.id}`);
  return res;
}

async function removeQueuedById(queued) {
  const res = await axios.put(`${API_URl}/${queued.id}`);
  return res;
}

async function getQueueUpdated() {
  const res2 = await axios.get(API_URl);
  const queueUpdated = res2.data.queue.filter(
    (queued) => queued.status === 'Em fila'
  );
  return queueUpdated;
}

async function getAttendanceQueue() {
  const res = await axios.get(API_URl);
  const attendanceQueue = res.data.queue.filter(
    (queued) => queued.status === 'Em atendimento'
  );
  return attendanceQueue;
}

async function getAttendanceQueueByAttendant(attendant) {
  const res = await axios.get(API_URl);
  const attendanceQueue = res.data.queue.filter(
    (queued) =>
      queued.status === 'Em atendimento' && queued.attendant === attendant
  );
  return attendanceQueue;
}

async function insertQueue(queue) {
  const response = await axios.post(API_URl, queue);
  return response.data.id;
}

async function updateQueue(queue) {
  const response = await axios.put(API_URl, queue);
  return response.data;
}

async function deleteGrade(queue) {
  const response = await axios.delete(`${API_URl}/${queue.id}`);
  return response.data;
}

function getServicesTypes() {
  return SERVICES_TYPE;
}

export {
  getAllData,
  getAllQueuedSorted,
  getNextQueuePosition,
  getServicesTypes,
  getQueueUpdated,
  getAttendanceQueue,
  getAttendanceQueueByAttendant,
  insertQueue,
  updateQueue,
  deleteGrade,
  advanceQueue,
  removeQueuedById,
  advanceQueueById,
};
