import { startOfHour } from 'date-fns';

import Appointement from '../model/Appointement';
import appointementRepository from '../repositories/appointementRepository';

interface Request  {
  provider: string;
  date: Date;
}

class CreateAppointementService {
  private appointementRepository: appointementRepository;

  constructor(appointementRepository: appointementRepository){
    this.appointementRepository = appointementRepository;
  }

  public execute({date, provider}: Request): Appointement {

    const appointementDate = startOfHour(date);

    const findAppointementInSameDate = this.appointementRepository.findByDate(appointementDate);

    if(findAppointementInSameDate) {
      throw Error('This appointement is already booked')
    }

    const appointement = this.appointementRepository.create({
      provider,
      date: appointementDate,
    });

    return appointement;

  }
}

export default CreateAppointementService;
