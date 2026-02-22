
const { Webhook } = require("svix");
const ClerkUser = require("../Models/ClerkUser");

const clerkWebhook = async (req, res) => {
  try {
      console.log("clerk works start",res)
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
console.log(CLERK_WEBHOOK_SECRET)
    if (!WEBHOOK_SECRET) {
      throw new Error("Missing Clerk Webhook Secret");
    }

    const headers = req.headers;

    const svix_id = headers["svix-id"];
    const svix_timestamp = headers["svix-timestamp"];
    const svix_signature = headers["svix-signature"];

    if (!svix_id || !svix_timestamp || !svix_signature) {
      return res.status(400).json({
        success: false,
        message: "Missing svix headers"
      });
    }

    const payload = req.body; // raw buffer

    const wh = new Webhook(WEBHOOK_SECRET);

    const evt = wh.verify(payload.toString(), {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });

    const { type, data } = evt;

    console.log("Clerk event:", type);

    // USER CREATED
    if (type === "user.created") {

      await ClerkUser.create({
        clerkId: data.id,
        email: data.email_addresses[0].email_address,
        name: `${data.first_name || ""} ${data.last_name || ""}`,
        imageUrl: data.image_url,
      });

      console.log("User saved in MongoDB");
    }

    // USER DELETED
    if (type === "user.deleted") {

      await ClerkUser.findOneAndDelete({
        clerkId: data.id,
      });

      console.log("User removed from DB");
    }

    return res.status(200).json({ success: true });

  } catch (error) {

    console.log("Webhook error:", error.message);

    return res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

module.exports = { clerkWebhook };