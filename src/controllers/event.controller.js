import Event from '../models/event.model.js';

export const getEvents = async (req, res) => {
  try {
    const events = await Event.find({
      user: req.user.id
    }).populate('user');
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error consultando eventos', error: error.message });
  }
}

export const getEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Event.findById(id);
    if (!event) return res.status(404).json({message: 'Evento no encontrado'});
    res.json(event);
  } catch (error) {
    res.status(500).json({message: 'Error consultando evento', error: error.message});
  }
}

export const createEvent = async (req, res) => {
  const {title, description, date, location} = req.body;

  const newEvent = new Event({
    title,
    description,
    date,
    location,
    user: req.user.id
  });

  try {
    const savedEvent = await newEvent.save();
    
    res.json(savedEvent);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear evento', error: error.message})
  }
}

export const deleteEvent = async (req, res) => {
  const { id } = req.params

  try {
    const deletedEvent = await Event.findByIdAndDelete(id);
    if (!deletedEvent) return res.status(404).json({ message: 'Evento no encontrado' });
    res.status(204).json({ message: 'Evento eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error eliminando evento', error: error.message });
  }
}

export const updateEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedEvent = await Event.findByIdAndUpdate(id, req.body, {new: true});

    if (!updatedEvent) return res.status(404).json({ message: 'Evento no encontrado' });
    
    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: 'Error actualizando evento', error: error.message });
  }
}