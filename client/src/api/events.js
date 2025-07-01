import axios from './axios.js';

export const getEventsRequest = () => axios.get('/events');
export const getEventRequest = (id) => axios.get(`/events/${id}`);
export const createEventRequest = (event, config) => axios.post('/events', event, config);
export const updateEventRequest = (id, event, config) => axios.put(`/events/${id}`, event, config);
export const deleteEventRequest = (id, config) => axios.delete(`/events/${id}`, config);
