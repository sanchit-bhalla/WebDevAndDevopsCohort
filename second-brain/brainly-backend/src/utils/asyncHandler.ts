import { NextFunction, Request, RequestHandler, Response } from "express";

export const asyncHandler = (
  requestHandler: (req: Request, res: Response, next: NextFunction) => any
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

// export const asyncHandler =
//   (fn) =>
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       await fn(req, res, next);
//     } catch (err: any) {
//       res.status(err?.code || 500).json({
//         success: false,
//         message: err.message,
//       });
//     }
//   };
