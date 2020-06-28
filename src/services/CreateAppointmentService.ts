import { startOfHour } from 'date-fns';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  private appointmentsRepository: AppointmentsRepository;

  constructor(appointmentRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentRepository;
  }

  public execute({ provider, date }: Request): Appointment {
    const roundedDate = startOfHour(date);

    const isDateBooked = this.appointmentsRepository.findByDate(roundedDate);

    if (isDateBooked) {
      throw Error('This date is already booked');
    }

    const appointment = this.appointmentsRepository.create({
      provider,
      date: roundedDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
