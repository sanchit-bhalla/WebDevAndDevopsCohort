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

async function createAddressesTable() {
  const client = new Client({ connectionString: process.env.CONNECTION_URL });
  try {
    await client.connect();
    await client.query(`
      CREATE TABLE addresses (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        city VARCHAR(100) NOT NULL,
        country VARCHAR(100) NOT NULL,
        street VARCHAR(255) NOT NULL,
        pincode VARCHAR(20),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);
    console.log("addresses table created successfully 🎉");
  } catch (err) {
    // @ts-ignore
    console.log(err?.message);
  } finally {
    await client.end();
  }
}

async function insertData(
  username: string,
  email: string,
  password: string,
  city: string,
  country: string,
  street: string,
  pincode: string
) {
  const client = new Client({ connectionString: process.env.CONNECTION_URL });
  try {
    await client.connect();

    // start Transaction
    await client.query("BEGIN");

    const userRes = await client.query(
      `
            INSERT INTO users (username, email, password)
            VALUES ($1, $2, $3)
            RETURNING id
        `,
      [username, email, password]
    );
    const userId = userRes.rows[0]?.id;
    console.log("USER inserted successfully, ", userId);

    // If some error occured while inserting address, we want to roll back entry from users tables as well
    await client.query(
      `
        INSERT INTO addresses (user_id, city, country, street, pincode)
        VALUES ($1, $2, $3, $4, $5)
      `,
      [userId, city, country, street, pincode]
    );
    console.log("address inserted successfully");

    // Commit Transaction
    await client.query("COMMIT");
  } catch (err) {
    // @ts-ignore
    console.log("ERROR: ", err?.message);
    console.log("ROLLING BACK..");

    await client.query("ROLLBACK"); // Roll back the transaction on error
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
  await createAddressesTable();

  await insertData(
    "Tom",
    "tom@cn.com",
    "ThomasCat",
    "Texas",
    "USA",
    "CN street",
    "1000100"
  );
  await insertData(
    "Jerry",
    "jerry@cn.com",
    "JerryMouse",
    "Texas",
    "USA",
    "CN street",
    "1000100"
  );
  await insertData(
    "johndoe",
    "john.doe@example.com",
    "securepassword123",
    "New York",
    "USA",
    "123 Broadway St",
    "10001"
  );

  console.log("Username :", await fetchUser("tom@cn.com"));
  console.log("Username :", await fetchUser("spike@cn.com"));
  console.log("Username :", await fetchUser("john.doe@example.com"));
}

main();
