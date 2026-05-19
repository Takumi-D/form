const express = require('express');
const cors = require('cors');
require('dotenv').config();
const formRouter = require('./routers/form');
const mainRouter = require('./routers/main');
const path = require("path");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.static(path.join(__dirname)))
app.use(express.json());
app.use(cors());


app.use(mainRouter);
app.use(formRouter);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});