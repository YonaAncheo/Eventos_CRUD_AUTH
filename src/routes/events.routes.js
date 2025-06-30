import { Router } from "express";
import {authRequired} from "../middlewares/validateToken.js";
import { getEvents, getEvent, createEvent, deleteEvent, updateEvent } from "../controllers/event.controller.js";
import { validateSchema } from "../middlewares/validator.middelware.js";
import { createEventSchema, updateEventSchema } from "../schemas/event.schema.js";

const router = Router();

router.get('/events', authRequired,getEvents);
router.get('/events/:id', getEvent);
router.post('/events', authRequired, validateSchema(createEventSchema), createEvent);
router.delete('/events/:id', authRequired, deleteEvent);
router.put('/events/:id', authRequired, validateSchema(updateEventSchema), updateEvent);


export default router;