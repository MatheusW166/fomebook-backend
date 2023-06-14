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
    const user = await userRepository.create({
      data: {
        name,
        email,
        photo,
        bio,
        password: passwordHashed,
      },
    });
    delete user.password;
    return user;
  } catch (err) {
    if (err.message?.includes("Unique constraint failed")) {
      throw new ServiceError(409, "this user already exists");
    }
    throw new ServiceError();
  }
}

async function signIn({ email, password, ip }) {
  try {
    const userFound = await userRepository.findUnique({ where: { email } });
    if (!userFound) {
      throw new ServiceError(404, "email not found");
    }

    if (!compareSync(password, userFound.password)) {
      throw new ServiceError(401, "incorrect password");
    }

    const session = await sessionRepository.create({
      data: {
        ip,
        user: { connect: { id: userFound.id } },
      },
    });
    const token = jwt.sign(session, process.env.JWT_KEY, {
      expiresIn: process.env.JWT_EXPIRES ?? "14d",
    });

    delete userFound.password;
    return { ...userFound, token };
  } catch (err) {
    if (err instanceof ServiceError) throw err;
    throw new ServiceError();
  }
}

async function searchUsers({ name }) {
  try {
    name = name?.trim();
    if (!name) {
      return [];
    }
    const users = await userRepository.findMany({
      where: { name: { contains: name, mode: "insensitive" } },
      orderBy: { name: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        photo: true,
        bio: true,
        createdAt: true,
        _count: { select: { followers: true, following: true } },
      },
    });
    return users.map((user) => {
      user.followersCount = user._count.followers;
      user.followingCount = user._count.following;
      delete user._count;
      return user;
    });
  } catch (err) {
    throw new ServiceError();
  }
}

async function searchById({ id }) {
  try {
    const user = await userRepository.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        photo: true,
        bio: true,
        createdAt: true,
        _count: { select: { followers: true, following: true } },
      },
    });
    if (!user) {
      throw new ServiceError(404, "not found");
    }
    user.followersCount = user._count.followers;
    user.followingCount = user._count.following;
    delete user._count;
    return user;
  } catch (err) {
    if (err instanceof ServiceError) throw err;
    throw new ServiceError();
  }
}

const userServices = { signUp, signIn, searchUsers, searchById };

export default userServices;
