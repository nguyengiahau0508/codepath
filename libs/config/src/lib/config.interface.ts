export interface AppConfig {
  env: 'development' | 'production';

  api: {
    port: number;
    baseUrl: string;
  };

  admin: {
    adminUrl: string;
  };

  student: {
    studentUrl: string;
  };

  teacher: {
    teacherUrl: string;
  };

  database: {
    host: string;
    port: number;
    username: string;
    password: string;
    name: string;
  };

  auth: {
    jwtSecret: string;
    expiresIn: string;
  };

  ai: {
    enabled: boolean;
    provider: 'openai' | 'local' | 'custom';
    apiKey?: string;
  };
}

