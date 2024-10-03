import { Request } from 'express';

declare global {
  namespace Express {
    interface MulterFile {
      location: string;
    }

    interface Request {
      file: MulterFile;
      userId: string;
      role:string 
    }
  }
}
