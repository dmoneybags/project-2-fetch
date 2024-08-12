const express = require("express");
const router = express.Router();

const apiRoutes = require("./api");
router.use("/api", apiRoutes);

const htmlRoutes = require("./htmlRoutes.js");
router.use("/", htmlRoutes);

module.exports = router;