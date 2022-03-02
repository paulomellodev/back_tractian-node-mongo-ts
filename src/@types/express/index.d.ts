declare namespace Express {
  export interface Request {
    user: {
      id: Types.ObjectId;
    };
    company: {
      id: Types.ObjectId;
    };
    pagination: {
      realPage: number;
      realTake: number;
    };
  }
}
