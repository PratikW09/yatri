const { verifyToken } = require('../utils/jwt_utils');

// Middleware to validate JWT and authorize roles
const authorizeRole = (roles = []) => {
  return (req, res, next) => {
   
    let token = req.cookies.jwt_token  // Retrieve token from cookies

    
    if (!token && req.headers.authorization) {
      const authHeader = req.headers.authorization;
      if (authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1]; // Extract token after "Bearer"
      }
    }
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }


    if (roles.length && !roles.includes(decoded.role)) {
      return res.status(403).json({ message: "Access denied: Insufficient permissions" });
    }

    req.user = decoded; // Attach user details to request object
    next(); // Proceed to the next middleware or route
  };
};

module.exports = { authorizeRole };
