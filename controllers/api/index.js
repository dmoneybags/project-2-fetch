const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes");
router.use("/auth", authRoutes);
const dbRoutes = require("./dbRoutes");
router.use("/db", dbRoutes);

module.exports = router;
