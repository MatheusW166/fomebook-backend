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

async function searchUsers({ name }) {
  const nameSearchString = `%${name}%`;
  const { rows } = await db.query(
    `SELECT id,name,email,photo,bio FROM users 
    WHERE name ILIKE $1 
    ORDER BY name;`,
    [nameSearchString]
  );
  return rows;
}

async function searchById({ id }) {
  const { rows } = await db.query(
    `SELECT id,name,email,photo,bio FROM users 
    WHERE id=$1;`,
    [id]
  );
  return rows[0];
}

const userRepository = { create, searchByEmail, searchUsers, searchById };

export default userRepository;
