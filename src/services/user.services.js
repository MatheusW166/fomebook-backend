import userRepository from "../repositories/user.repository.js";
import { hashSync, compareSync } from "bcrypt";
import ServiceError from "./service.error.js";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import sessionRepository from "../repositories/session.repository.js";
config();

async function signUp({ name, email, photo, bio, password }) {
  try {
    const passwordHashed = hashSync(password, 10);
    return await userRepository.create({
      name,
      email,
      photo,
      bio,
      password: passwordHashed,
    });
  } catch (err) {
    if (err.message?.includes("duplicate")) {
      throw new ServiceError(409, "this user already exists");
    }
    throw new ServiceError();
  }
}

async function signIn({ email, password, ip }) {
  try {
    const userFound = await userRepository.searchByEmail({ email });
    if (!userFound) {
      throw new ServiceError(404, "email not found");
    }

    if (!compareSync(password, userFound.password)) {
      throw new ServiceError(401, "incorrect password");
    }

    const session = await sessionRepository.create({
      userId: userFound.id,
      ip,
    });
    const token = jwt.sign(session, process.env.JWT_KEY, {
      expiresIn: process.env.JWT_EXPIRES,
    });

    delete userFound.password;
    return { ...userFound, token };
  } catch (err) {
    if (err instanceof ServiceError) throw err;
    throw new ServiceError();
  }
}

const userServices = { signUp, signIn };

export default userServices;
