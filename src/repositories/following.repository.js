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
    `SELECT users.id, name,email,photo,bio, 
    COUNT(f1.followed) AS "followersCount", 
    COUNT(f2.follower) AS "followingCount"
    FROM (SELECT * FROM following WHERE followed=$1) AS follows 
    JOIN users ON follows.follower=users.id 
    LEFT JOIN following AS f1 ON f1.followed=users.id
    LEFT JOIN following AS f2 ON f2.follower=users.id
    GROUP BY users.id,name,email,photo,bio;`,
    [userId]
  );
  return rows;
}

async function searchFollowing({ userId }) {
  const { rows } = await db.query(
    `SELECT users.id, name,email,photo,bio, 
    COUNT(f1.followed) AS "followersCount", 
    COUNT(f2.follower) AS "followingCount"
    FROM (SELECT * FROM following WHERE follower=$1) AS follows 
    JOIN users ON follows.followed=users.id 
    LEFT JOIN following AS f1 ON f1.followed=users.id
    LEFT JOIN following AS f2 ON f2.follower=users.id
    GROUP BY users.id,name,email,photo,bio;`,
    [userId]
  );
  return rows;
}

async function isFollowing({ userId, followedId }) {
  const { rows } = await db.query(
    `SELECT COUNT(*) AS "isFollowing" FROM 
    following WHERE follower=$1 AND followed=$2;`,
    [userId, followedId]
  );
  return rows[0]?.isFollowing === "1";
}

const followingRepository = {
  create,
  deleteFollowing,
  searchFollowers,
  searchFollowing,
  isFollowing,
};

export default followingRepository;
