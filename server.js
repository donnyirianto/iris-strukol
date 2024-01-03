import { logger } from './config/logger.js';
import { prosesCeck } from './controllers/prosesCheck.js';
//import { client } from './services/redis.js';
import { query } from './services/db.js';
import dayjs from 'dayjs';
import * as cron from 'node-cron';

let taskLoad = true

const unexpectedErrorHandler = (error) => {
    logger.error(error);
    logger.info('Service Stopped');
    process.exit(1); 
};
  
process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
    logger.info('SIGTERM received');
});

// Service Cron-job : Proses setiap 2 jam
logger.info(`Service Cek Struk Online- Running`);

cron.schedule('0 */2 * * *', async() => { 
//( async() => {   
     try {
        if (!taskLoad) {
            return;
        } 
        taskLoad = false
        
        logger.info(`[START] Proses Cek Struk Online:  ${dayjs().format("YYYY-MM-DD HH:mm:ss")}`) 
        
        await prosesCeck(query); 
        
        logger.info(`[FINISH] Proses Cek Struk Online:  ${dayjs().format("YYYY-MM-DD HH:mm:ss")}`) 

        taskLoad = true

    } catch (error) {
        logger.error(error);
        taskLoad =true
    } 
});
 