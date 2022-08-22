/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
import DB from "../../../middleware/database";
import Utils from "../../../middleware/utils";
import User from "../../../models/user";

export default async function login(req, res) {
  await DB();
  
  if (req.method === "POST") {
    // Check if user exists
    let user = await User.findOne({ "email.address": req.body.email });
    if (!user) {
      return res.status(400).json({
        error: "NO_ACCOUNT",
      });
    }
    
    // Check if password is correct
    if (!await Utils.comparePassword(req.body.password, user.services.password.bcrypt)) {
      return res.status(400).json({
        error: "INVALID_PASSWORD",
      });
    }
    
    // Check if user is verified
    if (!user.email.verified) {
      return res.status(400).json({
        error: "NOT_VERIFIED",
      });
    }
    
    
    res.status(200).json(user.toJSON());
  }
  
  res.status(405).send()
}