import dotenv from 'dotenv';
import Joi from 'joi';
import { URL } from 'url';
import { fileURLToPath } from 'url';
import { dirname } from 'path'; 
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: new URL('../.env', import.meta.url).pathname });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    MYSQL_HOST: Joi.string().required().description('Database MySQL HOST'),
    MYSQL_DB: Joi.string().required().description('Database MySQL DB'),
    MYSQL_USER: Joi.string().required().description('Database MySQL USERNAME'),
    MYSQL_PASS: Joi.string().required().description('Database MySQL PASSWORD'),
    MYSQL_PORT: Joi.number().required().description('Database MySQL PORT'),
    MYSQL_PORT_DML: Joi.number().required().description('Database MySQL PORT DML'),
    MYSQL_POOLING_LIMIT: Joi.number().required().description('Database MySQL POOLING LIMIT'),
    REDIS_HOST: Joi.string().required().description('REDIS HOST'),
    REDIS_PASS: Joi.string().required().description('REDIS PASS'),
    REDIS_PORT: Joi.number().required().description('REDIS PORT'),
    PROSES: Joi.number().default(50),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  proses: envVars.PROSES, 
  db: {
    host: envVars.MYSQL_HOST,
    user: envVars.MYSQL_USER,
    password: envVars.MYSQL_PASS,
    database: envVars.MYSQL_DB,
    port: envVars.MYSQL_PORT,
    connectionLimit: envVars.MYSQL_POOLING_LIMIT,
    waitForConnections: true,
    queueLimit: 0,
    enableKeepAlive: true,
    dateStrings: true,
    multipleStatements: true,  
    keepAliveInitialDelay:true
  },
  dbdml: {
    host: envVars.MYSQL_HOST,
    user: envVars.MYSQL_USER,
    password: envVars.MYSQL_PASS,
    database: envVars.MYSQL_DB,
    port: envVars.MYSQL_PORT_DML,
    connectionLimit: envVars.MYSQL_POOLING_LIMIT,
    waitForConnections: true,
    queueLimit: 0,
    enableKeepAlive: true,
    dateStrings: true,
    multipleStatements: true,  
    keepAliveInitialDelay:true
  },
  redis: {
    host: envVars.REDIS_HOST,
    port: envVars.REDIS_PORT,
    pass: envVars.REDIS_PASS
  }
};
