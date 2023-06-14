import postRepository from "../repositories/post.repository.js";
import userRepository from "../repositories/user.repository.js";
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

async function searchByUserId({ userId }) {
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
    });
    return posts.map((post) => {
      post.userName = post.user.name;
      post.userPhoto = post.user.photo;
      post.likesCount = post._count.likes;
      delete post._count;
      delete post.user;
      return post;
    });
  } catch (err) {
    if (err instanceof ServiceError) throw err;
    throw new ServiceError();
  }
}

const postServices = { newPost, searchByUserId };

export default postServices;
