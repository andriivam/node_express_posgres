import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import { getAllUsers, getOneUser, createUser, changeUser, deleteUser } from "./routes/controllers/user_cont.mjs"

const PORT = 3000;
const app = express();

app.use(bodyParser.json());


//connecting to our database
export const client = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "users",
  password: "1234",
  port: 5432,
});
client.connect();


// const router = express.Router();
// writing GET request
    app.get("/users", getAllUsers);

// getting one user
    app.get("/users/:id", getOneUser);

// writing a POST request
    app.post("/users", createUser);

// writing a PUT request
    app.put("/users/:id", changeUser);

// creating DELETE request
app.delete("/users/:id" , deleteUser)


app.listen(PORT, () => console.log(`Server started: localhost:${PORT}/`));