declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: number;
    DATABASE_URL: string;
    DATABASE: string;
    SECRET: string;
  }
}
