declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: number;
    DATABASE_URI: string;
    DATABASE: string;
    SECRET: string;
  }
}
