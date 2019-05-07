import logger from 'loggaroo';
import mongoose from 'mongoose';
import { db } from '../config/settings';

export default () => {
  try {
    mongoose
      .connect(db, { useNewUrlParser: true })
      .then(() => {
        return logger.info('MongoDB is connected to database', db);
      })
      .catch(error => {
        throw error;
      });
  } catch (e) {
    logger.error('Error connecting to ' + db);
    logger.error(e);
    throw e;
  }
};
