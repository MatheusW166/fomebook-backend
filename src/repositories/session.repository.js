import db from "../db/db.connection.js";

async function create({ userId, ip }) {
  const { rows } = await db.query(
    `INSERT INTO sessions(user_id,ip) 
    VALUES($1,$2) 
    RETURNING id, user_id AS "userId";`,
    [userId, ip]
  );
  return rows[0];
}

const sessionRepository = { create };

export default sessionRepository;
