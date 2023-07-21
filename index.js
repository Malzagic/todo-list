import express from "express";
import bodyParser from "body-parser";
import { MongoClient } from "mongodb";
import { ObjectId } from "mongodb";
import 'dotenv/config';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const port = 8000;
const parser = bodyParser.json();


const login = process.env.MONGODB_LOGIN;
const password = process.env.MONGODB_PASSWORD;

const url = `mongodb+srv://${login}:${password}@todolist.reaw3ux.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(url);
const dbName = "list";
<<<<<<< HEAD

const title = 'ToDo List - App';
let data = [];
=======
const data = {
    _id: '',
    title: 'ToDo List - App',
    list: [],
}
>>>>>>> 74043cc483d5927568df07025eedbba14787accc


async function updateList(req, res, next) {
    try {
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection("todo");

        const cursor = col.find({});
        const allRecords = await cursor.toArray();
        
        data = allRecords;
        next();
    } catch (err) {
        console.log(err.stack);
    }
}



app.use(express.static("public"));
app.use(parser);
app.use(updateList);

<<<<<<< HEAD
app.get("/", (req, res, next) => {
    res.render("index.ejs", {data: data, title: title});
    next();
});

=======
app.get("/", (req, res) => {

    res.render("index.ejs", { data: data });
});
>>>>>>> 74043cc483d5927568df07025eedbba14787accc

app.post("/submit", async (req, res, next) => {
    const { name, todo } = req.body;

    try {
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection("todo");

        let newData = {
            id: uuidv4(),
            name: name,
            todo: todo,
        }

        const myDoc = await col.insertOne(newData);

        data.push(newData);

        res.render("index.ejs", {data: data, title: title})
        next();
    } catch (err) {
        console.log(err.stack);
    }
});

app.delete("/delete", async (req, res, next) => {
<<<<<<< HEAD
    const { itemID, itemDataID } = req.body;

=======
>>>>>>> 74043cc483d5927568df07025eedbba14787accc
    try {
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection("todo");
<<<<<<< HEAD
        const objectID = new ObjectId(itemID);
        const filter = { _id: objectID };

        const toRemove = data.filter(item => item.id !== itemDataID);

        data = toRemove;

        const result = await col.findOneAndDelete(filter);

        res.render("index.ejs", {data: data, title: title});
        next();
    } catch(err) {
        console.log(err.stack);
    }

=======

        console.log(req.body.id)
        // const filter = { _id: new ObjectID(itemId) };
    } catch(err) {
        console.log(err.stack);
    }
>>>>>>> 74043cc483d5927568df07025eedbba14787accc
});

app.listen(port, () => {
    console.log(`Server is running at: ${port} port.`)
});