import db from "../db/db.client.js";

const userRepository = db.users;

export const userArgs = {
  select: {
    id: true,
    name: true,
    email: true,
    photo: true,
    bio: true,
    createdAt: true,
    _count: { select: { followers: true, following: true } },
  },
};

export default userRepository;
