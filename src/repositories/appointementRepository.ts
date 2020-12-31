import { isEqual } from 'date-fns'
import Appointement from '../model/Appointement';

interface createAppointementDTO {
  provider: string;
  date: Date;
}

class appointementRepository {
  private appointements: Appointement[];

  constructor() {
    this.appointements = [];
  }

  public create({ provider, date }: createAppointementDTO): Appointement {
    const appointement = new Appointement({provider, date});

    this.appointements.push(appointement);

    return appointement;
  }

  public findByDate(date: Date): Appointement | null {
    const findAppointementInSameDate =  this.appointements.find(appointement =>
      isEqual(date, appointement.date)
    );

    return findAppointementInSameDate || null;
  }

  public all(): Appointement[] {
    return this.appointements;
  }

}

export default appointementRepository;
