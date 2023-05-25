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

async function deleteFollowing({ id }) {
  const { rowCount } = await db.query(`DELETE FROM following WHERE id=$1;`, [
    id,
  ]);
  return rowCount;
}

async function searchFollowers({ userId }) {
  const { rows } = await db.query(
    `SELECT users.id,users.name,users.email,users.photo,users.bio 
    FROM (SELECT follower FROM following WHERE followed=$1) AS followers 
    JOIN users ON followers.follower=users.id;`,
    [userId]
  );
  return rows;
}

async function searchFollowing({ userId }) {
  const { rows } = await db.query(
    `SELECT users.id,users.name,users.email,users.photo,users.bio 
      FROM (SELECT follower FROM following WHERE follower=$1) AS follows 
      JOIN users ON follows.follower=users.id;`,
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
