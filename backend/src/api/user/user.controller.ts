import { RequestHandler } from "express";

export const checkUser: RequestHandler = async (req, res) => {
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
};


export const getProfile:RequestHandler = async (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
};
