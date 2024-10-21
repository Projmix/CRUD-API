import { Request, Response, NextFunction } from 'express';

export const handleNotFound = (req: Request, res: Response) => {
  res.status(404).json({ message: 'Resource not found' });
};

export const handleError = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
};
