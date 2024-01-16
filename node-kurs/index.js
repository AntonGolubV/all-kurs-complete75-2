const express = require("express");
const path = require("path");
const getSmartRoutes = require("./routers/smartphoneRoutes");
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use("/get/Smartphone", getSmartRoutes);

app.listen(port);
