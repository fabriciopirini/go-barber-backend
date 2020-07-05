import { startOfHour } from 'date-fns'
import { getCustomRepository } from 'typeorm'

import Appointment from '../models/Appointment'
import AppointmentsRepository from '../repositories/AppointmentsRepository'

interface Request {
  provider_id: string
  date: Date
}

class CreateAppointmentService {
  public async execute({ provider_id, date }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository)

    const roundedDate = startOfHour(date)

    const isDateBooked = await appointmentsRepository.findByDate(roundedDate)

    if (isDateBooked) {
      throw Error('This date is already booked')
    }

    const appointment = appointmentsRepository.create({
      provider_id,
      date: roundedDate,
    })

    await appointmentsRepository.save(appointment)

    return appointment
  }
}

export default CreateAppointmentService
