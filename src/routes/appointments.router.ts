import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';

const appointmentRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentRouter.get('/', (request, response) => {
  const appointments = appointmentsRepository.all();

  return response.json(appointments);
});

appointmentRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const roundedDate = startOfHour(parseISO(date));

  const isDateBooked = appointmentsRepository.findByDate(roundedDate);

  if (isDateBooked) {
    return response
      .status(400)
      .json({ message: 'This date is already booked' });
  }

  const appointment = appointmentsRepository.create(provider, roundedDate);

  return response.json(appointment);
});

export default appointmentRouter;
