import { Competence } from './models';

export const getStatus = async () => {
  const status = await Competence.findAll();
  return status;
};