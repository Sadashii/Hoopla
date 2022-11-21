/**
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */
import slugify from "slugify";
import DB from "../../../middleware/database";
import Utils from "../../../middleware/utils";
import Block from "../../../models/block";
import Page from "../../../models/page";

export default async function pages (req, res) {
  await DB();
  if (!Utils.isUserLoggedIn(req, res)) {
    return;
  }
  if (req.method !== "POST") {
    return res.status(405).send();
  }
  
  switch (req.body.operation) {
    case "GET":
      let pages = [];
      if (req.body.workspace) {
        pages = await Page.find({
          workspace: req.body.workspace,
          topmost: true
        });
      }
      if (req.body.page) {
        pages = await Page.find({
          parent: req.body.page
        });
      }
      
      const page_data = {
        pages: pages,
        __v: Utils.createShaHash(pages.toString())
      };
      
      if (req.body.current_version === page_data.__v) {
        return res.status(304).send();
      }
      
      return res.status(200).json(page_data);
    case "CREATE":
      const page = new Page({
        name: "",
        slug: slugify(""),
        icon: null,
        topmost: !Boolean(req.body.parent),
        ...req.body
      });
      
      await page.save();
      
      return res.status(200).json(page.toJSON());
    case "UPDATE":
      await Page.findByIdAndUpdate(req.body._id, {
        $set: {
          ...req.body
        }
      });
      
      return res.status(200).send();
    case "DELETE":
      const findAndDeleteChildren = async (id, first = true) => {
        await Block.deleteMany({ page: id });
        let childrenPages = await Page.find({ parent: id });
        for (const childPage of childrenPages) {
          await findAndDeleteChildren(childPage._id, false);
        }
        if (first) {
          await Page.findByIdAndDelete(id);
        } else {
          await Page.deleteMany({ parent: id });
        }
      };
      
      await findAndDeleteChildren(req.body._id);
      
      return res.status(200).send();
  }
}