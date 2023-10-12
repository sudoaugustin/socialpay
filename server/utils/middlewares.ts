import Session from '../models/Session';
import { RequestHandler } from 'express';

export const protect: RequestHandler = async (req, res, next) => {
  const token = req.headers.authorization;
  const session = await Session.findOne({ _id: token });

  if (session) {
    req.uid = session.uid.toString();
    next();
  } else {
    res.status(401).end();
  }
};
