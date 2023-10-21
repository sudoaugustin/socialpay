import AdminSession from '../models/AdminSession';
import Session from '../models/Session';
import { RequestHandler } from 'express';

export const protect: RequestHandler = async (req, res, next) => {
  const session = await Session.findById(req.headers.authorization);

  if (session) {
    req.uid = session.uid.toString();
    next();
  } else {
    res.status(401).end();
  }
};

export const adminProtect: RequestHandler = async (req, res, next) => {
  const session = await AdminSession.findById(req.headers.authorization);

  if (session) {
    req.uid = session.uid.toString();
    next();
  } else {
    res.status(401).end();
  }
};
