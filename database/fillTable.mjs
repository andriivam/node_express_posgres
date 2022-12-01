import { users } from "../users.mjs";
import pg from "pg";

const client = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "users",
  password: "1234",
  port: 5432,
});

client.connect()
.then(() => {
  client.query("DELETE FROM users")
for(let user of users) {
    client.query(("insert into users (first_name, last_name, email, ip) VALUES ($1, $2, $3, $4)"),
      [user.firstName, user.lastName, user.email, user.ip]);
  };
})

.then(() => client.query("select * from users order by id "))
.then((results) => {console.table(results.rows)})
.catch((err) => {console.log('Something wrong' + err)})
.finally(() => client.end());
