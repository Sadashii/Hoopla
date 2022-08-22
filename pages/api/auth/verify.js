/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
import DB from "../../../middleware/database";
import User from "../../../models/user";

export default async function verify(req, res) {
  await DB();
  
  if (req.method === "POST") {
    // Check if code is valid
    if (!req.body.code) {
      return res.status(400).json({
        error: "INVALID_CODE",
      })
    }
    
    // Check if user exists
    let user = await User.findOne({ "email.verificationCode": req.body.code });
    if (!user) {
      return res.status(404).json({
        error: "NO_ACCOUNT",
      })
    }
    if (user.email.verified) {
      return res.status(404).json({
        error: "ACCOUNT_ALREADY_VERIFIED",
      })
    }
    
    // Verify user
    user.email.verified = true;
    await user.save();
    
    res.status(200).send();
  }
  
  res.status(405).send()
}