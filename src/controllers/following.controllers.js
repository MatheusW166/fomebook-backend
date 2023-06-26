import followingServices from "../services/following.services.js";

async function follow(req, res) {
  const { session } = req;
  const { followedId } = req.params;
  try {
    const following = await followingServices.follow({
      followerId: session.userId,
      followedId,
    });
    res.send(following);
  } catch (err) {
    res.status(err.status).send(err.details);
  }
}

async function searchFollowingById(req, res) {
  const { userId } = req.params;
  try {
    const following = await followingServices.searchFollowing({ userId });
    res.send(following);
  } catch (err) {
    res.status(err.status).send(err.details);
  }
}

async function unFollow(req, res) {
  const { session } = req;
  const { followedId } = req.params;
  try {
    await followingServices.unFollow({
      followerId: session.userId,
      followedId,
    });
    res.sendStatus(204);
  } catch (err) {
    res.status(err.status).send(err.details);
  }
}

async function isFollowing(req, res) {
  const { userId } = req.session;
  const { followedId } = req.params;
  try {
    const result = await followingServices.isFollowing({
      userId,
      followedId,
    });
    res.send(result);
  } catch (err) {
    res.status(err.status).send(err.details);
  }
}

const followingControllers = {
  follow,
  unFollow,
  searchFollowingById,
  isFollowing,
};

export default followingControllers;
