export interface AppConfig {
  env: 'development' | 'production';

  api: {
    port: number;
    baseUrl: string;
  };

  admin: {
    url: string;
  };

  student: {
    url: string;
  };

  teacher: {
    url: string;
  };

  database: {
    host: string;
    port: number;
    username: string;
    password: string;
    name: string;
  };

  redis: {
    host: string;
    port: number,
    password: string,
    db: number
  };

  jwt: {
    access: {
      secret: string,
      expiresIn: string
    },
    refresh: {
      secret: string,
      expiresIn: string
    },
    tokenEncKey: string
  };

  googleAuth: {
    clientId: string;
    clientSecret: string;
  }

  ai: {
    enabled: boolean;
    provider: 'openai' | 'local' | 'custom';
    apiKey?: string;
  };
}

