import express from "express";
import bodyParser from "body-parser";

import { MongoClient } from "mongodb";
import 'dotenv/config';


const app = express();
const port = 8000;
const parser = bodyParser.urlencoded({ extended: true });


const login = process.env.MONGODB_LOGIN;
const password = process.env.MONGODB_PASSWORD;

const url = `mongodb+srv://${login}:${password}@todolist.reaw3ux.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(url);
const dbName = "list";


// async function run(req, res, next) {
//     try {
//         await client.connect();
//         console.log("Successfully connected to Atlas");
//     } catch (err) {
//         console.log(err.stack);
//     }
//     finally {
//         await client.close();
//     }

//     next();
// }



app.use(express.static("public"));
app.use(parser);

// app.use(run);

app.get("/", async (req, res) => {
    const data = {
        title: 'ToDo List - App',
        list: [],
    }

    try {
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection("todo");

        const myDoc = await col.findOne();
        data.list.push(myDoc);
    } catch (err) {
        console.log(err.stack);
    }

    res.render("index.ejs", { data: data });
});

app.post("/submit", (req, res) => {

});

app.listen(port, () => {
    console.log(`Server is running at: ${port} port.`)
});