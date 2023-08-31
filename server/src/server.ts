import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.send('hello')
})

app.listen(3001, () => {
    console.log("server running on port 3001");
})