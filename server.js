const next = require("next");
const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./backend/routers/userRouter");
const cardRouter = require("./backend/routers/cardRouter");
const dotenv = require("dotenv");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });

const handle = app.getRequestHandler();

const PORT = process.env.PORT || 3000;

dotenv.config();

app.prepare().then(() => {
    const server = express();
    server.use(express.json());
    server.use(express.urlencoded({ extended: true }));

    mongoose
        .connect(process.env.MONGO_DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        .then(() => console.log("mongo DB is connected!"));

    server.use("/api/users", userRouter);
    server.use("/api/cards", cardRouter)

    server.get("*", (req, res) => {
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        return handle(req, res);
    });

    server.listen(PORT, (err) => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${PORT}`);
    });
});
