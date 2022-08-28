import { model, models, Schema } from "mongoose";

const page = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true,
  },
  name: Schema.Types.String,
  slug: Schema.Types.String,
  icon: Schema.Types.String,
  children: [{type: Schema.Types.ObjectId, ref: "Page"}],
  content: [{type: Schema.Types.ObjectId, ref: "Block"}],
  topmost: Schema.Types.Boolean,
  parent: {type: Schema.Types.ObjectId, ref: "Page"},
  workspace: {type: Schema.Types.ObjectId, ref: 'Workspace'}
}, {
  timestamps: true
});

const Page = models.Page || model("Page", page);

export default Page;