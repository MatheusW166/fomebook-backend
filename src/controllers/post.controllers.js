import postServices from "../services/post.services.js";

async function newPost(req, res) {
  const { userId } = req.session;
  try {
    const post = await postServices.newPost({ ...req.body, userId });
    res.status(201).send(post);
  } catch (err) {
    res.status(err.status).send(err.details);
  }
}

async function searchByUserId(req, res) {
  const { userId } = req.params;
  try {
    const posts = await postServices.searchByUserId({ userId });
    res.send(posts);
  } catch (err) {
    res.status(err.status).send(err.details);
  }
}

const postController = { newPost, searchByUserId };

export default postController;
