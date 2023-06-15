import followingRepository from "../repositories/following.repository.js";
import userRepository, { userArgs } from "../repositories/user.repository.js";
import ServiceError from "./service.error.js";
import { mapUserFollows } from "../utils/following.utils.js";

async function follow({ followerId, followedId }) {
  try {
    return await followingRepository.create({
      data: {
        followerId,
        followedId,
      },
    });
  } catch (err) {
    if (err.message?.includes("Unique constraint failed")) {
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
    const deleted = await followingRepository.delete({
      where: { followerId_followedId: { followerId, followedId } },
    });
    return deleted;
  } catch (err) {
    if (err.message?.includes("does not exist")) {
      throw new ServiceError(404, "record does not exist");
    }
    throw new ServiceError();
  }
}

async function searchFollowing({ userId }) {
  try {
    const userFollows = await userRepository.findUnique({
      where: { id: userId },
      select: {
        followers: { select: { userFollower: { select: userArgs.select } } },
        following: { select: { userFollowed: { select: userArgs.select } } },
      },
    });

    if (!userFollows) {
      throw new ServiceError(404, "user not found");
    }

    return {
      followers: mapUserFollows("userFollower", userFollows.followers),
      following: mapUserFollows("userFollowed", userFollows.following),
    };
  } catch (err) {
    if (err instanceof ServiceError) throw err;
    throw new ServiceError();
  }
}

async function isFollowing({ userId, followedId }) {
  try {
    const result = await followingRepository.findUnique({
      where: {
        followerId_followedId: {
          followerId: userId,
          followedId: followedId,
        },
      },
    });
    return result !== null;
  } catch (err) {
    throw new ServiceError();
  }
}

const followingServices = { follow, unFollow, searchFollowing, isFollowing };

export default followingServices;
