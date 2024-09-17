import jwt from "jsonwebtoken";

// Generate and return the token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export default generateToken;
