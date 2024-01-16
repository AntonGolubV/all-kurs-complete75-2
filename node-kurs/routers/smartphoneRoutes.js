const express = require("express");
const path = require("path");
const fs = require("fs");
const url = require("url");
const { dataSmartphone, templ, filterByParam, getDeviceBySubname } = require("../data/data");
const { createSort, pushNewObj, delObj } = require("../utils/sort");

let lastArrFromServer = [];
let favSmartArr = [];

const stTemplates = fs.readFileSync(path.join(__dirname, "../templates/smartBlock.html"), "utf-8");
const mainSend = fs.readFileSync(path.join(__dirname, "../templates/mainSend.html"), "utf-8");
const smBlForfav = fs.readFileSync(path.join(__dirname, "../templates/smartBlockForFav.html"), "utf-8");

const router = express.Router();
router.use(express.json());

router.get("/ByBrand", (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    let dataFromServer = JSON.parse(JSON.stringify(dataSmartphone(parsedUrl.query.brand))); 
    lastArrFromServer = dataFromServer;
    let sendDataToUser = mainSend.replace("{{content}}", dataFromServer.map((item) => templ(stTemplates, item)).join(""));
    res.status(200).send(sendDataToUser);
});

router.post("/ByParam", (req, res) => {
    let filterObj = filterByParam(req.body);
    lastArrFromServer = filterObj;
    let sendDataToUser = mainSend.replace("{{content}}", filterObj.map((item) => templ(stTemplates, item)).join(""));
    res.status(200).send(sendDataToUser);
});

router.get("/BySubname", (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    let dataFromServer = JSON.parse(JSON.stringify(getDeviceBySubname(parsedUrl.query.sub))); 
    lastArrFromServer = dataFromServer;
    let sendDataToUser = mainSend.replace("{{content}}", dataFromServer.map((item) => templ(stTemplates, item)).join(""));
    res.status(200).send(sendDataToUser);
});
router.get("/BySortPrice", (req, res) => {
    lastArrFromServer = createSort(lastArrFromServer);
    let sendDataToUser = mainSend.replace("{{content}}", lastArrFromServer.map((item) => templ(stTemplates, item)).join("")); 
    res.status(200).send(sendDataToUser);
});
router.get("/ById", (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    favSmartArr = pushNewObj(favSmartArr, parsedUrl.query.id, lastArrFromServer);
    res.status(200).json(lastArrFromServer);
});
router.get("/ByFav", (req, res) => {
    let sendDataToUser = mainSend.replace("{{content}}", favSmartArr.map((item) => templ(smBlForfav, item)).join(""));
    lastArrFromServer = favSmartArr;
    res.status(200).send(sendDataToUser);
});
router.delete("/deleteById", (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    favSmartArr = delObj(parsedUrl.query.id, favSmartArr);
});

module.exports = router;