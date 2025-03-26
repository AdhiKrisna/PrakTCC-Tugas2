// ingat untuk set up package.json dengan "type": "module" agar bisa menggunakan ES6 module
import express from "express"
import cors from "cors"
import NoteRoute from "./routes/NoteRoute.js"

const app = express();
app.use(cors())
app.use(express.json())
app.use(NoteRoute)

//
app.get("/", (req, res) => {
    res.send("Hello World")
})


app.listen(
    5000,
    ()=> console.log("Starting Notes App😂😊")
);
