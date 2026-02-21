const { Webhook } = require("svix");
const ClerkUser = require("../Models/ClerkUser");

const clerkWebhook = async (req, res) => {
  try {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
      throw new Error("Webhook secret missing");
    }

    const payload = req.body;
    const headers = req.headers;

    const wh = new Webhook(WEBHOOK_SECRET);

    const evt = wh.verify(JSON.stringify(payload), {
      "svix-id": headers["svix-id"],
      "svix-timestamp": headers["svix-timestamp"],
      "svix-signature": headers["svix-signature"],
    });

    const eventType = evt.type;
    const data = evt.data;

    // ================= USER CREATED =================
    if (eventType === "user.created") {

      await ClerkUser.create({
        clerkId: data.id,
        email: data.email_addresses[0].email_address,
        name: `${data.first_name || ""} ${data.last_name || ""}`,
        imageUrl: data.image_url,
      });

      console.log("✅ Clerk user saved");
    }

    // ================= USER DELETED =================
    if (eventType === "user.deleted") {
      await ClerkUser.findOneAndDelete({
        clerkId: data.id,
      });

      console.log("🗑 User removed");
    }

    res.status(200).json({ success: true });

  } catch (error) {
    console.log("Webhook error:", error.message);
    res.status(400).json({ success: false });
  }
};

module.exports = { clerkWebhook };