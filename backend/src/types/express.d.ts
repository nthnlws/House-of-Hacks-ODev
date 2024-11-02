import { Request } from "express";

declare module "express-serve-static-core" {
  interface Request<T = any> {
    validatedData?: T;
  }
}
