import db from "../db/db.connection.js";

async function create({ followerId, followedId }) {
  const { rows } = await db.query(
    `INSERT INTO following(follower,followed) 
    VALUES($1,$2) 
    RETURNING id,
        follower AS "followerId", 
        followed AS "followedId";`,
    [followerId, followedId]
  );
  return rows[0];
}

async function deleteFollowing({ followerId, followedId }) {
  const { rowCount } = await db.query(
    `DELETE FROM following WHERE follower=$1 AND followed=$2;`,
    [followerId, followedId]
  );
  return rowCount;
}

async function searchFollowers({ userId }) {
  const { rows } = await db.query(
    `SELECT users.id,users.name,users.email,users.photo,users.bio 
    FROM (SELECT * FROM following WHERE followed=$1) AS followers 
    JOIN users ON followers.follower=users.id;`,
    [userId]
  );
  return rows;
}

async function searchFollowing({ userId }) {
  const { rows } = await db.query(
    `SELECT users.id,users.name,users.email,users.photo,users.bio 
      FROM (SELECT * FROM following WHERE follower=$1) AS follows 
      JOIN users ON follows.followed=users.id;`,
    [userId]
  );
  return rows;
}

const followingRepository = {
  create,
  deleteFollowing,
  searchFollowers,
  searchFollowing,
};

export default followingRepository;
