/**
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */
import DB from "../../../middleware/database";
import Utils from "../../../middleware/utils";
import Workspace from "../../../models/workspace";

export default async function workspace (req, res) {
  await DB();
  if (Utils.isUserLoggedIn(req, res)) {
    switch (req.method) {
      case "POST":
        let workspace = await Workspace.findById(req.body.workspace)
        
        if (!workspace) {
          return res.status(404).send()
        }
  
  
        if (!workspace.members.find(member => member.user.toString() === req.user._id)) {
          return res.status(403).send()
        }
  
        if (req.body.current_version === workspace.__v) {
          return res.status(304).send()
        }
  
        
        // TODO: Populate the members data?
        //
        //await workspace.populate({
        //  path: "members.user",
        //  model: "User"
        //})

        res.status(200).send(workspace.toJSON())
    }
  }
}