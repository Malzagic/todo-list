import express from "express";
import bodyParser from "body-parser";
import store from "store2";

const app = express();
const port = 8000;
const parser = bodyParser.urlencoded({extended: true});

app.use(express.static("public"));
app.use(parser);

app.get("/", (req, res) => {
    const arr = [];

    console.log(store.get("name"));

    const data = {
        title: 'ToDo List - App',
        list: arr,
    }

    res.render("index.ejs", {data: data});
});

app.listen(port, () => {
    console.log(`Server is running at: ${port} port.`)
});