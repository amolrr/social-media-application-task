const express = require("express");
const router = express.Router();

// import controller
const { getAllData, createUser } = require('../controllers/auth');


//map controllers to the request
router.post('/createUser', createUser);
router.get("/allData",getAllData);

module.exports = router;



