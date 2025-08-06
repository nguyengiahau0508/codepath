import { AppConfig } from '../config.interface';

export const prodConfig: AppConfig = {
  env: 'production',

  api: {
    port: Number(process.env['API_PORT']) || 3000,
    baseUrl: process.env['API_URL'] || 'http://localhost:3000',
  },

  admin: {
    adminUrl: process.env['ADMIN_URL'] || 'http://localhost:4200',
  },
  student: {
    studentUrl: process.env['STUDENT_URL'] || 'http://localhost:4300',
  },
  teacher: {
    teacherUrl: process.env['TEACHER_URL'] || 'http://localhost:4400',
  },

  database: {
    host: process.env['DB_HOST'] || 'localhost',
    port: Number(process.env['DB_PORT']) || 3306,
    username: process.env['DB_USERNAME'] || 'root',
    password: process.env['DB_PASSWORD'] || '',
    name: process.env['DB_NAME'] || 'codepath_dev',
  },

  auth: {
    jwtSecret: process.env['JWT_SECRET'] || 'dev-secret',
    expiresIn: process.env['JWT_EXPIRES_IN'] || '1h',
  },

  ai: {
    enabled: process.env['AI_ENABLED'] === 'true',
    provider: 'openai',
    apiKey: process.env['OPENAI_API_KEY'],
  },

};

