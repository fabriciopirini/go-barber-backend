import { Router } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';

import Appointment from '../models/Appointment';

const routes = Router();

const appointments: Appointment[] = [];

routes.get('/', (request, response) => {
  return response.json(appointments);
});

routes.post('/', (request, response) => {
  const { provider, date } = request.body;

  const roundedDate = startOfHour(parseISO(date));

  const isDateBooked = appointments.find(appointment =>
    isEqual(roundedDate, appointment.date),
  );

  if (isDateBooked) {
    return response
      .status(400)
      .json({ message: 'This date is already booked' });
  }

  const appointment = new Appointment(provider, roundedDate);

  appointments.push(appointment);

  return response.json(appointment);
});

export default routes;
