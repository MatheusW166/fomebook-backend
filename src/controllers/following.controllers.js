import followingServices from "../services/following.services.js";

async function follow(req, res) {
  const session = req.session;
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

const followingControllers = { follow };

export default followingControllers;
