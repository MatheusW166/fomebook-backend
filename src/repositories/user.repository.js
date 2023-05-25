import db from "../db/db.connection.js";

async function create({ name, email, photo, bio, password }) {
  const { rows } = await db.query(
    `INSERT INTO users(name,email,photo,bio,password) 
    VALUES($1,$2,$3,$4,$5) 
    RETURNING id,name,email,photo,bio;`,
    [name, email, photo, bio, password]
  );
  return rows[0];
}

async function searchByEmail({ email }) {
  const { rows } = await db.query(
    `SELECT id,name,email,photo,bio,password FROM users WHERE email=$1;`,
    [email]
  );
  return rows[0];
}

const userRepository = { create, searchByEmail };

export default userRepository;
