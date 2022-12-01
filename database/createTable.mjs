import pkg from "pg";
const { Client } = pkg;

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "users",
  password: "1234",
  port: 5432,
});

client.connect();

const query = `CREATE TABLE IF NOT EXISTS "users" (
    "id" int,
    "first_name" varchar,
    "last_name" varchar,
    "email" varchar,
    "ip" varchar
        )`;

client.query(query, (err, results) => {
  if (err) {
    console.log("something went wrong" + err);
    return;
  }
  console.log("Table was created successfully");
  client.end();
});
