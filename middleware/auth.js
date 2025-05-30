// middleware/auth.js
module.exports = (req, res, next) => {
  // TEMP: Simulate logged in user
  req.user = { id: "6656c0f1f1f39cd2be9f7c85" }; // Replace with real session or token data
  next();
};
