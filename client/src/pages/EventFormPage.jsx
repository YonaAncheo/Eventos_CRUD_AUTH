import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { createEventRequest, updateEventRequest, getEventRequest } from '../api/events';

function EventFormPage() {
  const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();
  const params = useParams();

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
    if (params.id) {
      await updateEventRequest(params.id, data);
    } else {
      await createEventRequest(data);
    }
    navigate('/events');
  });

  return (
    <div>
      <h1>{params.id ? 'Editar Evento' : 'Crear Evento'}</h1>
      <form onSubmit={onSubmit}>
        <input {...register('title', { required: true })} placeholder="Título" />
        <textarea {...register('description', { required: true })} placeholder="Descripción" />
        <input {...register('location', { required: true })} placeholder="Ubicación" />
        <button type="submit">{params.id ? 'Actualizar' : 'Crear'}</button>
      </form>
    </div>
  );
}

export default EventFormPage;