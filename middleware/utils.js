import bcrypt from "bcrypt";
import crypto from "crypto";

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
}

export default new Utils();