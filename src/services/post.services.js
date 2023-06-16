import postRepository from "../repositories/post.repository.js";
import userRepository from "../repositories/user.repository.js";
import { mapPosts } from "../utils/posts.utils.js";
import ServiceError from "./service.error.js";

async function newPost({ photo, description, userId }) {
  try {
    return await postRepository.create({
      data: { photo, description, user: { connect: { id: userId } } },
    });
  } catch (err) {
    throw new ServiceError();
  }
}

async function searchByUserId({ userId, limit, offset }) {
  try {
    const user = await userRepository.findUnique({ where: { id: userId } });
    if (!user) throw new ServiceError(404, "user not found");

    const posts = await postRepository.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        photo: true,
        description: true,
        createdAt: true,
        userId: true,
        user: { select: { name: true, photo: true } },
        _count: { select: { likes: true } },
      },
      take: limit,
      skip: offset,
    });
    return mapPosts(posts);
  } catch (err) {
    if (err instanceof ServiceError) throw err;
    throw new ServiceError();
  }
}

const postServices = { newPost, searchByUserId };

export default postServices;
