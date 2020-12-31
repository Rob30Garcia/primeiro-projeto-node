import { v4 } from 'uuid';

class Appointement {
  id: string;

  provider: string;

  date: Date;

  constructor({provider, date}: Omit<Appointement, 'id'>) {
    this.id = v4();
    this.provider = provider;
    this.date = date;
  }
}

export default Appointement;
