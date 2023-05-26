import postRepository from "../repositories/post.repository.js";
import ServiceError from "./service.error.js";

async function newPost({ photo, description, userId }) {
  try {
    return await postRepository.create({ photo, description, userId });
  } catch (err) {
    throw new ServiceError();
  }
}

async function searchByUserId({ userId }) {
  try {
    return await postRepository.searchByUserId({ userId });
  } catch (err) {
    throw new ServiceError();
  }
}

const postServices = { newPost, searchByUserId };

export default postServices;
