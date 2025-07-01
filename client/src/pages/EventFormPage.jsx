import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { createEventRequest, updateEventRequest, getEventRequest } from '../api/events';
import { getCsrfToken } from '../api/csrf';
import '../pages/styles.css';

function EventFormPage() {
  const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();
  const params = useParams();
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (params.id) {
      getEventRequest(params.id).then(res => {
        setValue('title', res.data.title);
        setValue('description', res.data.description);
        setValue('location', res.data.location);
      });
    }
  }, [params.id, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    setErrorMsg('');
    try {
      const csrfRes = await getCsrfToken();
      const config = { headers: { 'X-CSRF-Token': csrfRes.data.csrfToken } };
      if (params.id) {
        await updateEventRequest(params.id, data, config);
      } else {
        await createEventRequest(data, config);
      }
      navigate('/events');
    } catch (error) {
      const msg = error.response?.data?.message || 'Error al crear/actualizar el evento';
      setErrorMsg(msg);
    }
  });

  return (
    <div className="centered-container">
      <div className="card">
        <h1>{params.id ? 'Editar Evento' : 'Crear Evento'}</h1>
        {errorMsg && <div style={{color:'red', marginBottom:10}}>{errorMsg}</div>}
        <form onSubmit={onSubmit}>
          <input {...register('title', { required: true })} placeholder="Título" />
          <textarea {...register('description', { required: true })} placeholder="Descripción" />
          <input {...register('location', { required: true })} placeholder="Ubicación" />
          <button type="submit">{params.id ? 'Actualizar' : 'Crear'}</button>
        </form>
      </div>
    </div>
  );
}

export default EventFormPage;