import { Router } from "express";
import {authRequired} from "../middlewares/validateToken.js";
import { getEvents, getEvent, createEvent, deleteEvent, updateEvent } from "../controllers/event.controller.js";

const router = Router();

router.get('/events', authRequired,getEvents);
router.get('/events/:id', authRequired, getEvent);
router.post('/events', authRequired, createEvent);
router.delete('/events/:id', authRequired, deleteEvent);
router.put('/events/:id', authRequired, updateEvent);



export default router;