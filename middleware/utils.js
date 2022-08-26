import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";

class Utils {
  hashPasswordPrivate (password) {
    return crypto.createHash("sha256").update(password).digest("hex");
  }
  
  hashPassword (password) {
    return bcrypt.hash(this.hashPasswordPrivate(password), 10);
  }
  
  comparePassword (password, hash) {
    return bcrypt.compare(this.hashPasswordPrivate(password), hash);
  }
  
  isUserLoggedIn (req, res) {
    let token = req.headers.authorization
    if (!token) {
      res.status(403).send()
      return false
    }
    token = token.split("Bearer ")[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
  
    req.user = decoded.user
    
    return true
  }
}

export default new Utils();