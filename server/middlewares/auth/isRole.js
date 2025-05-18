//Role Guard

//higer order function HOF
module.exports = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "You don't have permission to access this endpoint" });
    }
    next();
  };
};
