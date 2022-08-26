/**
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */
import jwt from "jsonwebtoken";
import DB from "../../../middleware/database";
import Utils from "../../../middleware/utils";
import User from "../../../models/user";
import Workspace from "../../../models/workspace";

export default async function login (req, res) {
  await DB();
  
  if (req.method === "POST") {
    // Check if user exists
    let user = await User.findOne({"email.address": req.body.email});
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
    
    // Login user
    const body = {
      _id: user._id,
      email: user.email.address,
    };
    const token = jwt.sign({user: body}, process.env.JWT_SECRET);
    
    if (!user.meta.firstLogin) {
      user.meta.firstLogin = new Date()
      const default_workspace = new Workspace({
        _id: user._id,
        name: `My Hoopla`,
        icon: `${process.env.WEBSITE_URL}/logo.png`,
        members: [
          {
            role: "OWNER",
            addedAt: new Date(),
            user: user._id
          }
        ]
      })
      await default_workspace.save()
    }
    
    res.status(200).json({token});
  }
  
  res.status(405).send();
}