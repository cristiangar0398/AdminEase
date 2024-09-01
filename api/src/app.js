require('dotenv').config();
const express = require('express');


const singUP = require("./v1/routes/index");
const app = express();
const PORT =  process.env.PORT ||  5050 ;

app.use("/api/v1" , singUP);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});