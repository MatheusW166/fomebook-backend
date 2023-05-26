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
    `SELECT id,
      photo,
      description,
      user_id AS "userId",
      created_at AS "createdAt" 
    FROM posts WHERE user_id=$1;`,
    [userId]
  );
  return rows;
}

const postRepository = { create, searchByUserId };

export default postRepository;
