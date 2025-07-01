import { useEffect, useState } from 'react';
import { getEventsRequest, getEventRequest, deleteEventRequest, updateEventRequest } from '../api/events';
import { getCsrfToken } from '../api/csrf';
import '../pages/styles.css';

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
    const csrfRes = await getCsrfToken();
    const config = { headers: { 'X-CSRF-Token': csrfRes.data.csrfToken } };
    await deleteEventRequest(id, config);
    getEvents();
  };

  const handleUpdate = async (event) => {
    const newTitle = window.prompt('Nuevo título:', event.title);
    if (newTitle === null) return;
    const newDescription = window.prompt('Nueva descripción:', event.description);
    if (newDescription === null) return;
    const newLocation = window.prompt('Nueva ubicación:', event.location || '');
    if (newLocation === null) return;
    const csrfRes = await getCsrfToken();
    const config = { headers: { 'X-CSRF-Token': csrfRes.data.csrfToken } };
    await updateEventRequest(event._id, {
      title: newTitle,
      description: newDescription,
      location: newLocation
    }, config);
    getEvents();
  };

  return (
    <div className="centered-container">
      <div className="card" style={{width:'100%',maxWidth:600}}>
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
        <div style={{ width: '100%' }}>
          {filteredEvents.map(event => (
            <div key={event._id} style={{
              background: '#fff',
              borderRadius: '8px',
              boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
              margin: '1rem 0',
              padding: '1.2rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '0.5rem'
            }}>
              <div style={{fontWeight:'bold', fontSize:'1.2rem'}}>{event.title}</div>
              <div style={{color:'#444'}}>{event.description}</div>
              <div style={{color:'#007bff', fontStyle:'italic'}}>{event.location}</div>
              {event.createdAt && (
                <div style={{color:'#888', fontSize:'0.95rem'}}>
                  Creado: {new Date(event.createdAt).toLocaleString()}
                </div>
              )}
              <div style={{marginTop:'0.5rem', display:'flex', gap:'0.5rem'}}>
                <button onClick={() => handleUpdate(event)} style={{background:'#ffc107', color:'#222'}}>Actualizar</button>
                <button onClick={() => handleDelete(event._id)} style={{background:'#dc3545'}}>Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EventPage;