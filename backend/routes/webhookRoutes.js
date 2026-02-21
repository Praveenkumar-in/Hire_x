const express = require("express");
const router = express.Router();

const { clerkWebhook } = require("../controllers/clerkWebhookController");

router.post("/clerk", express.raw({ type: "application/json" }), clerkWebhook);

module.exports = router;