import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import path from "path";
if (process.env.NODE_ENV !== "production") {
    //We don't need dotenv when in production
    dotenv.config();
}

const app = express();
// middleware for parsing bodies from URL
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));
//with the credentials config above for cors:
//we don't need
// "Access-Control-Allow-Origin": "*",
//in now.json headers
//https://stackoverflow.com/questions/19743396/cors-cannot-use-wildcard-in-access-control-allow-origin-when-credentials-flag-i

console.log("NODE ENV", process.env.NODE_ENV);
//Serve react app in express server
//https://www.youtube.com/watch?v=QBXWZPy1Zfs&t=294s&ab_channel=FullstackDevelopment

app.use("/api/test", (req, res) => {
    res.send("hi");
});

//All other roues will be handled by
// app.use(express.static(path.join(__dirname, "build")));
// app.get("*", function (req, res) {
//     res.sendFile(path.join(__dirname, "build", "index.html"));
// });
// const root = require("path").join(__dirname, "build");
// app.use(express.static(root));
// app.get("*", (req, res) => {
//     res.sendFile("index.html", { root });
// });

const port = 5000;
//app.use(errorHandler);

app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});
