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

async function searchUsers(req, res) {
  const { name, limit, offset } = req.query;
  try {
    const users = await userServices.searchUsers({ name, limit, offset });
    res.status(200).send(users);
  } catch (err) {
    res.status(err.status).send(err.details);
  }
}

async function searchById(req, res) {
  const { id } = req.params;
  try {
    const users = await userServices.searchById({ id });
    res.status(200).send(users);
  } catch (err) {
    res.status(err.status).send(err.details);
  }
}

async function getLoggedUser(req, res) {
  const { userId } = req.session;
  try {
    const users = await userServices.searchById({ id: userId });
    res.status(200).send(users);
  } catch (err) {
    res.status(err.status).send(err.details);
  }
}

const userControllers = {
  signUp,
  signIn,
  searchUsers,
  searchById,
  getLoggedUser,
};

export default userControllers;
