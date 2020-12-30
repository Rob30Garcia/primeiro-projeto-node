import { Router } from 'express';
import { v4 } from 'uuid';

const appointementsRouter = Router();

const appointements = [];

appointementsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const appointement = {
    id: v4(),
    provider,
    date
  }

  appointements.push(appointement);

  return response.json(appointement);

});

export default appointementsRouter;
