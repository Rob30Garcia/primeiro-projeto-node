import { Router } from 'express';
import { startOfHour, parseISO, isEqual } from "date-fns";
import Appointement from '../model/Appointement';

const appointementsRouter = Router();

const appointements: Appointement[] = [];

appointementsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parseDate = startOfHour(parseISO(date));

  const findAppointementInSameDate = appointements.find(appointement =>
    isEqual(parseDate, appointement.date)
  );

  if(findAppointementInSameDate) {
    return response.status(400).json({ message: "This appointement is already booked" });
  }

  const appointement = new Appointement(provider, parseDate);

  appointements.push(appointement);

  return response.json(appointement);

});

export default appointementsRouter;
