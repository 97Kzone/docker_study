const express = require("express");

const PORT = 8040;

//APP
const app = express();
app.get('/', (req, res) => {
    res.send("테스트2222")
});

app.listen(PORT);
console.log("Server is running");