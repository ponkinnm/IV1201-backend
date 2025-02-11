import { Competence } from './model';

export const getStatus = async () => {
  const status = await Competence.findAll();
  return status;
};