/**
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */
import { Schema } from "mongoose";
import slugify from "slugify";
import DB from "../../../middleware/database";
import Utils from "../../../middleware/utils";
import Page from "../../../models/page";

export default async function pages (req, res) {
  await DB();
  if (Utils.isUserLoggedIn(req, res)) {
    switch (req.method) {
      case "POST":
        let pages = []
        if (req.body.workspace) {
          pages = await Page.find({
            workspace: req.body.workspace,
            topmost: true
          })
        }
        if (req.body.page) {
          pages = await Page.find({
            parent: req.body.page,
          })
        }
  
        const page_data = {
          pages: pages,
          __v: Utils.createShaHash(pages.toString())
        }
  
        if (req.body.current_version === page_data.__v) {
          return res.status(304).send()
        }
  
        res.status(200).json(page_data)
        break;
      case "PUT":
        const page = new Page({
          name: "Untitled",
          slug: slugify("Untitled"),
          icon: null,
          topmost: !Boolean(req.body.parent),
          parent: req.body.parent,
          workspace: req.body.workspace
        })
        
        await page.save()
        
        res.status(200).json(page.toJSON())
        break
      case "PATCH":
        await Page.findByIdAndUpdate(req.body._id, {
          $set: {
            ...req.body
          }
        })
        
        return res.status(200).send()
    }
  }
}