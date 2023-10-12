export type {};

declare global {
  namespace Express {
    export interface Request {
      uid: string;
    }
  }
}
