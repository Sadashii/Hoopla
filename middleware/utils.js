import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";

class Utils {
  createShaHash (password) {
    return crypto.createHash("sha256").update(password).digest("hex");
  }
  
  createHash (password) {
    return bcrypt.hash(this.createShaHash(password), 10);
  }
  
  compareHash (password, hash) {
    return bcrypt.compare(this.createShaHash(password), hash);
  }
  
  isUserLoggedIn (req, res) {
    let token = req.headers.authorization;
    if (!token) {
      res.status(403).send();
      return false;
    }
    token = token.split("Bearer ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    req.user = decoded.user;
    
    return true;
  }
}

export default new Utils();