

const { Webhook } = require("svix");
const ClerkUser = require("../Models/ClerkUser");

const clerkWebhook = async (req, res) => {
  try {

    /* ================= WEBHOOK SECRET ================= */
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
      throw new Error("CLERK_WEBHOOK_SECRET not found in env");
    }

    /* ================= HEADERS ================= */
    const svix_id = req.headers["svix-id"];
    const svix_timestamp = req.headers["svix-timestamp"];
    const svix_signature = req.headers["svix-signature"];

    if (!svix_id || !svix_timestamp || !svix_signature) {
      return res.status(400).json({
        success: false,
        message: "Missing svix headers"
      });
    }

    /* ================= VERIFY WEBHOOK ================= */
    const payload = req.body;

    const wh = new Webhook(WEBHOOK_SECRET);

    const evt = wh.verify(payload, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature
    });

    const eventType = evt.type;
    const data = evt.data;

    console.log("📩 Clerk Event:", eventType);

    /* ================= USER CREATED ================= */
    if (eventType === "user.created") {

      await ClerkUser.create({
        clerkId: data.id,
        email: data.email_addresses[0].email_address,
        name: `${data.first_name || ""} ${data.last_name || ""}`,
        imageUrl: data.image_url
      });

      console.log("✅ Clerk user saved in MongoDB");
    }

    /* ================= USER DELETED ================= */
    if (eventType === "user.deleted") {

      await ClerkUser.findOneAndDelete({
        clerkId: data.id
      });

      console.log("🗑 Clerk user deleted from MongoDB");
    }

    /* ================= RESPONSE ================= */
    res.status(200).json({
      success: true
    });

  } catch (error) {

    console.error("❌ Clerk Webhook Error:", error.message);

    res.status(400).json({
      success: false,
      error: error.message
    });

  }
};

module.exports = { clerkWebhook };