/**
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */
import DB from "../../middleware/database";
import Utils from "../../middleware/utils";
import User from "../../models/user";

export default async function account (req, res) {
  await DB();
  if (Utils.isUserLoggedIn(req, res)) {
    switch (req.method) {
      case "GET":
        const user = await User.findById(req.user._id)
        res.status(200).send(user.toJSON())
    }

  }
}