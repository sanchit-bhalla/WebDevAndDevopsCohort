import "dotenv/config";
import { Client } from "pg";

async function createUsersTable() {
  const client = new Client({ connectionString: process.env.CONNECTION_URL });
  try {
    await client.connect();
    const res = await client.query(`
            CREATE TABLE users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
        `);
    console.log("users TABLE created successfully 🎉");
  } catch (err) {
    // @ts-ignore
    console.log("ERROR: ", err?.message);
  } finally {
    await client.end();
  }
}

async function insertData(username: string, email: string, password: string) {
  const client = new Client({ connectionString: process.env.CONNECTION_URL });
  try {
    await client.connect();

    const res = await client.query(
      `
            INSERT INTO users (username, email, password)
            VALUES ($1, $2, $3)
        `,
      [username, email, password]
    );
    console.log("Record inserted successfully");
  } catch (err) {
    // @ts-ignore
    console.log("ERROR: ", err?.message);
  } finally {
    await client.end();
  }
}

// Fetch username from users table, given email as input
const fetchUser = async (email: string) => {
  const client = new Client({ connectionString: process.env.CONNECTION_URL });
  try {
    await client.connect();

    const query = `SELECT username FROM users where email=$1::text`;
    const res = await client.query(query, [email]);

    if (res.rows.length > 0) {
      return res.rows[0].username;
    } else {
      console.log("No user found with the given email.");
      return null; // Return null if no user was found
    }
  } catch (err) {
    // @ts-ignore
    console.log("ERROR: ", err?.message);
  } finally {
    await client.end();
  }
};

async function main() {
  await createUsersTable();

  await insertData("Tom", "tom@cn.com", "ThomasCat");
  await insertData("Jerry", "jerry@cn.com", "JerryMouse");

  console.log("Username :", await fetchUser("tom@cn.com"));
  console.log("Username :", await fetchUser("spike@cn.com"));
}

main();
