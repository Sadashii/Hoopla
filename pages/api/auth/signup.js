/**
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */
import randomstring from "randomstring";
import DB from "../../../middleware/database";
import sendEmail from "../../../middleware/email";
import Utils from "../../../middleware/utils";
import User from "../../../models/user";

export default async function signup (req, res) {
  await DB();
  
  if (req.method === "POST") {
    // add 1000ms delay to allow user to think that we're doing something
    // serious
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Check if user already exists
    
    let user = await User.findOne({ "email.address": req.body.email });
    if (user) {
      return res.status(400).json({
        error: "An account with this email already exists"
      });
    }
    
    const verificationToken = randomstring.generate(44);
    
    user = new User({
      username: req.body.username,
      createdAt: new Date(),
      email: {
        address: req.body.email,
        verified: false,
        verificationCode: verificationToken
      },
      services: {
        password: {
          bcrypt: await Utils.createHash(req.body.password),
          lastChanged: new Date()
        }
      },
      meta: {
        marketing: req.body.marketingConsent
      }
    });
    await user.save();
    
    await sendEmail(
      "verify",
      {
        name: `${req.body.username}`,
        url: `${process.env.WEBSITE_URL}/auth/verify?code=${verificationToken}`,
        domain: process.env.WEBSITE_DOMAIN
      },
      {
        to: req.body.email,
        subject: "Hoopla - verify your email"
      }
    );
    
    res.status(200).send("We've sent you an email with the verification link");
  }
  
  res.status(405).send();
}