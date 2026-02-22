

const express = require("express");
const router = express.Router();
const { Webhook } = require("svix");
const User = require("../Models/ClerkUser");

/*
   POST /api/webhooks/clerk
*/
router.post(
  "/clerk",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    try {
      /* ================= SECRET CHECK ================= */

      const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

      if (!WEBHOOK_SECRET) {
        console.log("❌ Missing webhook secret");
        return res.status(500).json({
          success: false,
          message: "Webhook secret not configured",
        });
      }

      /* ================= HEADERS ================= */

      const svix_id = req.headers["svix-id"];
      const svix_timestamp = req.headers["svix-timestamp"];
      const svix_signature = req.headers["svix-signature"];

      if (!svix_id || !svix_timestamp || !svix_signature) {
        return res.status(400).json({
          success: false,
          message: "Missing Svix headers",
        });
      }

      /* ================= VERIFY WEBHOOK ================= */

      const payload = req.body.toString();

      const wh = new Webhook(WEBHOOK_SECRET);

      const event = await wh.verify(payload, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      });

      console.log("✅ Webhook verified:", event.type);

      /* ================= HANDLE EVENTS ================= */

      switch (event.type) {
        case "user.created": {
          const { id, email_addresses, first_name, last_name } =
            event.data;

          await User.findOneAndUpdate(
            { clerkId: id },
            {
              clerkId: id,
              name: `${first_name || ""} ${last_name || ""}`,
              email: email_addresses[0].email_address,
            },
            { upsert: true, new: true }
          );

          console.log("✅ User saved in MongoDB");
          break;
        }

        case "user.deleted": {
          const { id } = event.data;

          await User.findOneAndDelete({ clerkId: id });

          console.log("🗑 User deleted");
          break;
        }

        default:
          console.log("ℹ️ Event ignored:", event.type);
      }

      /* ================= SUCCESS RESPONSE ================= */

      return res.status(200).json({
        success: true,
        message: "Webhook processed",
      });

    } catch (error) {
      console.error("❌ Webhook Error:", error.message);

      return res.status(400).json({
        success: false,
        message: "Webhook verification failed",
      });
    }
  }
);

module.exports = router;