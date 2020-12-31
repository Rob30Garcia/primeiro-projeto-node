import { request, response, Router } from 'express';
import { startOfHour, parseISO, isEqual } from "date-fns";

import AppointementRepository from '../repositories/appointementRepository';
import CreateAppointementService from '../services/CreateAppointementService';

const appointementsRouter = Router();

const appointementRepository = new AppointementRepository();

appointementsRouter.get('/', (request, response) => {
  const appointements = appointementRepository.all();

  return response.json(appointements);
});

appointementsRouter.post('/', (request, response) => {
  try {
    const { provider, date } = request.body;

    const parseDate = parseISO(date);

    const createAppointement = new CreateAppointementService(appointementRepository);

    const appointement = createAppointement.execute({ provider, date: parseDate });

    return response.json(appointement);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }

});

export default appointementsRouter;
