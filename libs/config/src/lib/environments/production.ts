import { AppConfig } from '../config.interface';

export const prodConfig: AppConfig = {
  env: 'production',

  api: {
    port: Number(process.env['API_PORT']) || 3000,
    baseUrl: process.env['API_URL'] || 'http://localhost:3000',
  },

  admin: {
    url: process.env['ADMIN_URL'] || 'http://localhost:4200',
  },
  student: {
    url: process.env['STUDENT_URL'] || 'http://localhost:4300',
  },
  teacher: {
    url: process.env['TEACHER_URL'] || 'http://localhost:4400',
  },

  database: {
    host: process.env['DB_HOST'] || 'localhost',
    port: Number(process.env['DB_PORT']) || 3306,
    username: process.env['DB_USERNAME'] || 'root',
    password: process.env['DB_PASSWORD'] || '',
    name: process.env['DB_NAME'] || 'codepath_dev',
  },

  redis: {
    host: process.env['REDIS_HOST'] || 'localhost',
    port: Number(process.env['REDIS_PORT']) || 6379,
    password: process.env['REDIS_PASSWORD'] || 'supersecret',
    db: Number(process.env['REDIS_DB']) || 0,
  },

  jwt: {
    access: {
      secret: process.env['JWT_ACCESS_SECRET'] || 'some-very-strong-access-secret',
      expiresIn: process.env['ACCESS_TOKEN_EXPIRES_IN'] || '15m'
    },
    refresh: {
      secret: process.env['JWT_REFRESH_SECRET'] || 'some-very-strong-refresh-secret',
      expiresIn: process.env['REFRESH_TOKEN_EXPIRES_IN'] || '7d'
    },
    tokenEncKey: process.env['TOKEN_ENC_KEY'] || 'BASE64_32_BYTES_KEY_HERE'
  },

  googleAuth: {
    clientId: process.env['GOOGLE_CLIENT_ID'] || '',
    clientSecret: process.env['GOOGLE_CLIENT_SECRET'] || '',
  },

  ai: {
    enabled: process.env['AI_ENABLED'] === 'true',
    provider: 'openai',
    apiKey: process.env['OPENAI_API_KEY'],
  },

};

