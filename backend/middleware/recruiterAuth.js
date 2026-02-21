const jwt = require("jsonwebtoken");
const Recruiter = require("../Models/Recruiter");

const recruiterProtect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      req.recruiter = await Recruiter.findById(decoded.id)
        .select("-password");

      if (!req.recruiter) {
        return res.status(401).json({
          message: "Recruiter not found",
        });
      }

      next();
    } catch (error) {
      return res.status(401).json({
        message: "Not authorized, token failed",
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      message: "Not authorized, no token",
    });
  }
};

module.exports = { recruiterProtect };
