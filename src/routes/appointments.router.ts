import { Router } from 'express';
import { uuid } from 'uuidv4';
import { startOfHour, parseISO, isEqual } from 'date-fns';

const routes = Router();

interface IAppointment {
  id: string;
  provider: string;
  date: Date;
}

const appointments: IAppointment[] = [];

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

  const appointment = {
    id: uuid(),
    provider,
    date: roundedDate,
  };

  appointments.push(appointment);

  return response.json(appointment);
});

export default routes;
