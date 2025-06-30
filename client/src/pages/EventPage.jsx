import { useEffect, useState } from 'react';
import { getEventsRequest, getEventRequest, deleteEventRequest, updateEventRequest } from '../api/events';

function EventPage() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    getEvents();
  }, []);

  const getEvents = async () => {
    const res = await getEventsRequest();
    setEvents(res.data);
    setFilteredEvents(res.data);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search) return setFilteredEvents(events);
    setFilteredEvents(
      events.filter(event => event.title.toLowerCase().includes(search.toLowerCase()))
    );
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm('¿Estás seguro de que deseas eliminar este evento?');
    if (!confirm) return;
    await deleteEventRequest(id);
    getEvents();
  };

  const handleUpdate = async (event) => {
    const newTitle = window.prompt('Nuevo título:', event.title);
    if (newTitle === null) return;
    const newDescription = window.prompt('Nueva descripción:', event.description);
    if (newDescription === null) return;
    const newLocation = window.prompt('Nueva ubicación:', event.location || '');
    if (newLocation === null) return;
    await updateEventRequest(event._id, {
      title: newTitle,
      description: newDescription,
      location: newLocation
    });
    getEvents();
  };

  return (
    <div>
      <h1>Eventos</h1>
      <form onSubmit={handleSearch} style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Buscar por título"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>
      <ul>
        {filteredEvents.map(event => (
          <li key={event._id}>
            <b>{event.title}</b> - {event.description} - <i>{event.location}</i>
            <button onClick={() => handleUpdate(event)} style={{marginLeft:10}}>Actualizar</button>
            <button onClick={() => handleDelete(event._id)} style={{marginLeft:10}}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventPage;