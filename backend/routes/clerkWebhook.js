const express = require("express");
const router = express.Router();
const { Webhook } = require("svix");

const ClerkUser = require("../Models/ClerkUser");

/* ================= CLERK WEBHOOK ================= */

router.post(
  "/clerk",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    try {
      const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

      if (!WEBHOOK_SECRET) {
        return res.status(500).json({
          success: false,
          message: "Webhook secret missing",
        });
      }

      const headers = req.headers;

      const svix_id = headers["svix-id"];
      const svix_timestamp = headers["svix-timestamp"];
      const svix_signature = headers["svix-signature"];

      if (!svix_id || !svix_timestamp || !svix_signature) {
        return res.status(400).json({
          success: false,
          message: "Missing Svix headers",
        });
      }

      const wh = new Webhook(WEBHOOK_SECRET);

      // Verify webhook
      const evt = wh.verify(req.body, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      });

      const eventType = evt.type;
      const data = evt.data;

      console.log("✅ Clerk Event:", eventType);

      /* ========= USER CREATED ========= */
      if (eventType === "user.created") {
        await ClerkUser.create({
          clerkId: data.id,
          email: data.email_addresses[0]?.email_address,
          name: `${data.first_name || ""} ${data.last_name || ""}`,
          imageUrl: data.image_url,
        });

        console.log("✅ User saved to MongoDB");
      }

      /* ========= USER DELETED ========= */
      if (eventType === "user.deleted") {
        await ClerkUser.findOneAndDelete({
          clerkId: data.id,
        });

        console.log("🗑 User removed");
      }

      res.status(200).json({ success: true });
    } catch (err) {
      console.error("Webhook Error:", err.message);
      res.status(400).json({ success: false });
    }
  }
);

module.exports = router;