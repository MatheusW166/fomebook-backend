import userServices from "../services/user.services.js";

async function signUp(req, res) {
  try {
    const user = await userServices.signUp(req.body);
    res.status(201).send(user);
  } catch (err) {
    res.status(err.status).send(err.details);
  }
}

async function signIn(req, res) {
  try {
    const ip = req.headers["x-forwarded-for"] ?? req.ip;
    const user = await userServices.signIn({ ...req.body, ip });
    res.status(200).send(user);
  } catch (err) {
    res.status(err.status).send(err.details);
  }
}

const userControllers = { signUp, signIn };

export default userControllers;
