/**
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */
import DB from "../../../middleware/database";
import Utils from "../../../middleware/utils";
import Block from "../../../models/block";

export default async function blocks (req, res) {
  await DB();
  if (!Utils.isUserLoggedIn(req, res)) {
    return;
  }
  if (req.method !== "POST") {
    return res.status(405).send();
  }
  
  switch (req.body.operation) {
    case "GET":
      const blocks = await Block.find({
        page: req.body.page
      });
      
      const block_data = {
        blocks: blocks,
        __v: Utils.createShaHash(blocks.toString())
      };
      
      if (req.body.current_version === block_data.__v) {
        return res.status(304).send();
      }
      
      res.status(200).json(block_data);
      break;
    case "DELETE":
      await Block.findByIdAndDelete(req.body._id);
      
      res.status(200).send();
      break;
    case "CREATE":
      const block = new Block({
        ...req.body
      });
      res.status(200).json(block.toJSON());
      await block.save();
      break;
    case "UPDATE":
      await Block.findByIdAndUpdate(req.body._id, {
        $set: {
          ...req.body
        }
      });
      
      res.status(200).send();
      break;
  }
}