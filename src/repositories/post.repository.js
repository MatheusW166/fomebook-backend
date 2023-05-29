import db from "../db/db.connection.js";

async function create({ photo, description, userId }) {
  const { rows } = await db.query(
    `INSERT INTO posts(photo,description,user_id) VALUES($1,$2,$3) 
    RETURNING 
        id,
        photo,
        description,
        user_id AS "userId",
        created_at AS "createdAt";`,
    [photo, description, userId]
  );
  return rows[0];
}

async function searchByUserId({ userId }) {
  const { rows } = await db.query(
    `SELECT 
    posts.id,
    posts.photo,
    description,
    posts.user_id AS "userId",
    posts.created_at AS "createdAt",
    users.name AS "userName",
    users.photo AS "userPhoto",
    COUNT(l.post_id) AS "likesCount"
    FROM posts 
    FULL JOIN likes l ON posts.id=l.post_id
    JOIN users ON posts.user_id=users.id
    WHERE posts.user_id=$1
    GROUP BY 
      posts.id,
      posts.photo,
      description,
      posts.user_id,
      posts.created_at,
      users.name,
      users.photo,
      l.post_id
    ORDER BY posts.created_at DESC;
    `,
    [userId]
  );

  return rows;
}

const postRepository = { create, searchByUserId };

export default postRepository;
