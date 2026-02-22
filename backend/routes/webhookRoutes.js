const express = require("express");
const router = express.Router();

const { clerkWebhook } = require("../controllers/clerkWebhookController");


router.post("/clerk", clerkWebhook);

module.exports = router;