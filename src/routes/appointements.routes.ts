import { Router } from 'express';
import { v4 } from 'uuid';
import { startOfHour, parseISO, isEqual } from "date-fns";

const appointementsRouter = Router();

interface Appointement {
  id: string,
  provider: string,
  date: Date,
}

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

  const appointement = {
    id: v4(),
    provider,
    date: parseDate,
  }

  appointements.push(appointement);

  return response.json(appointement);

});

export default appointementsRouter;
