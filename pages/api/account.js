/**
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */
import DB from "../../middleware/database";
import Utils from "../../middleware/utils";
import User from "../../models/user";
import fs from "fs";

export default async function account (req, res) {
  await DB();
  if (!Utils.isUserLoggedIn(req, res)) {
    return
  }
  if (req.method !== 'POST') {
    return res.status(405).send()
  }
  
  const user = await User.findById(req.user._id)
  switch (req.body.operation) {
    case "GET":
      return res.status(200).send(user.toJSON())
    case "UPDATE":
      let exclude = ['email', 'services']
      for (const field of Object.entries(req.body)) {
        if (!exclude.includes(field[0])) {
          user[field[0]] = field[1]
          if (typeof field[1] === "object") {
            user.markModified(field[0])
          }
        }
      }
      
      await user.save()
      return res.status(200).send(user.toJSON())
    case "UPDATE_PASSWORD":
      user.services.password.bcrypt = await Utils.createHash(req.body.newPassword);
      await user.save();
      
      // TODO: Send mail saying password was changed,not you? log out of all devices rn
  
      return res.status(200).send(user.toJSON())
  }
}