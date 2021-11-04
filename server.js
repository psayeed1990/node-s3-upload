const express = require("express");
const { uploadImage } = require("./utils");
const app = express();

//body parser
app.use(express.urlencoded({ extended: true }));
//app.use(express.json({ limit: "50kb" }));

//set view
app.set("view engine", "ejs");

//
app.get("/", (req, res) => {
    return res.render("home");
});

app.post("/upload", uploadImage, (req, res) => {
    const key = req.file.key;
    const link = req.file.location;
    res.render("image", {
        key,
        link,
    });
});

//start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started @${PORT}`);
});
