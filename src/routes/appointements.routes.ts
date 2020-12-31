import { request, response, Router } from 'express';
import { startOfHour, parseISO, isEqual } from "date-fns";

import AppointementRepository from '../repositories/appointementRepository';

const appointementsRouter = Router();

const appointementRepository = new AppointementRepository();


appointementsRouter.get('/', (request, response) => {
  const appointements = appointementRepository.all();

  return response.json(appointements);
});

appointementsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parseDate = startOfHour(parseISO(date));

  const findAppointementInSameDate = appointementRepository.findByDate(parseDate);

  if(findAppointementInSameDate) {
    return response.status(400).json({ message: "This appointement is already booked" });
  }

  const appointement = appointementRepository.create({
    provider,
    date: parseDate,
  });

  return response.json(appointement);

});

export default appointementsRouter;
