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
const data = {
    _id: '',
    title: 'ToDo List - App',
    list: [],
}



async function run(req, res, next) {
    try {
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection("todo");

        const cursor = col.find({});
        const allRecords = await cursor.toArray();
        
        data.list = allRecords;
    } catch (err) {
        console.log(err.stack);
    }

    next();
}



app.use(express.static("public"));
app.use(parser);
app.use(run);

app.get("/", (req, res) => {

    res.render("index.ejs", { data: data });
});

app.post("/submit", async (req, res, next) => {
    try {
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection("todo");

        const newData = {
            name: req.body.name,
            todo: req.body.todo,
        }

        const myDoc = await col.insertOne(newData);
        
        data.list.push(newData);

        res.render("index.ejs", { data: data })
        next();
    } catch (err) {
        console.log(err.stack);
    }
});

app.delete("/delete", async (req, res, next) => {
    try {
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection("todo");

        console.log(req.body.id)
        // const filter = { _id: new ObjectID(itemId) };
    } catch(err) {
        console.log(err.stack);
    }
});

app.listen(port, () => {
    console.log(`Server is running at: ${port} port.`)
});