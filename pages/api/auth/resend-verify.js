/**
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */
import randomstring from "randomstring";
import DB from "../../../middleware/database";
import sendEmail from "../../../middleware/email";
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
    
    const verificationToken = randomstring.generate(44);
    user.email.verificationCode = verificationToken;
    await user.save();
    
    await sendEmail(
      "verify",
      {
        name: `${req.body.firstName} ${req.body.lastName}`,
        url: `${process.env.WEBSITE_URL}/auth/verify?code=${verificationToken}`,
        domain: process.env.WEBSITE_DOMAIN,
      },
      {
        to: req.body.email,
        subject: "Hoopla - verify your email",
      },
    );
    
    res.status(200).send();
  }
  
  res.status(405).send();
}