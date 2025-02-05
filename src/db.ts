import pool from './config/dbsetup';

export const getPersons = async () => {
  const result = await pool.query('SELECT * FROM public.person');
  return result.rows;
};