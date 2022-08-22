/**
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */
import randomstring from "randomstring";
import DB from "../../../middleware/database";
import sendEmail from "../../../middleware/email";
import Utils from "../../../middleware/utils";
import User from "../../../models/user";

export default async function resendVerify (req, res) {
  await DB();
  
  if (req.method === "POST") {
    // Check if user exists
    let user = await User.findOne({"email.address": req.body.email});
    if (!user) {
      return res.status(400).json({
        error: "NO_ACCOUNT",
      });
    }
    
    const newPassword = randomstring.generate(8);
    user.services.password.bcrypt = await Utils.hashPassword(newPassword);
    await user.save();
    
    await sendEmail(
      "new-password",
      {
        name: `${user.firstName} ${user.lastName}`,
        password: newPassword,
        domain: process.env.WEBSITE_DOMAIN,
      },
      {
        to: req.body.email,
        subject: "Hoopla - your new password",
      },
    );
    
    res.status(200).send();
  }
  
  res.status(405).send();
}