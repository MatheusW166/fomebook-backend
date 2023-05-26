import followingRepository from "../repositories/following.repository.js";
import ServiceError from "./service.error.js";

async function follow({ followerId, followedId }) {
  try {
    return await followingRepository.create({
      followerId,
      followedId,
    });
  } catch (err) {
    if (err.message?.includes("duplicate")) {
      throw new ServiceError(409, "you already follow this user");
    }
    if (err.message?.includes("following_check")) {
      throw new ServiceError(409, "you can't follow yourself");
    }
    throw new ServiceError();
  }
}

async function unFollow({ followerId, followedId }) {
  try {
    const count = await followingRepository.deleteFollowing({
      followerId,
      followedId,
    });
    if (count === 0) {
      throw new ServiceError(404, "not found");
    }
    return count;
  } catch (err) {
    if (err instanceof ServiceError) throw err;
    throw new ServiceError();
  }
}

async function searchFollowing({ userId }) {
  try {
    const followers = await followingRepository.searchFollowers({ userId });
    const following = await followingRepository.searchFollowing({ userId });
    return {
      followers,
      following,
    };
  } catch (err) {
    throw new ServiceError();
  }
}

const followingServices = { follow, unFollow, searchFollowing };

export default followingServices;
