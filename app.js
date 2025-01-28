import 'dotenv/config'
import express from "express"
import cors from "cors";
import db from "./db/index.js"
import { GET_ALL_EMPANADAS } from './queries/empanadas.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.listen(port, () => {
  console.log("Server Listening on PORT:", port);
});

app.get("/status", (request, response) => {
  const status = {
    "Status": "Running"
  }

  response.send(status)
});

app.get('/', async (req, res) => {
  try {
    const result = await db.query(GET_ALL_EMPANADAS);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});
