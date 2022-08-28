import { model, models, Schema } from "mongoose";

const block = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true,
  },
  type: Schema.Types.String,
  properties: Schema.Types.Mixed,
  content: [{type: Schema.Types.ObjectId, ref: "block"}],
  topmost: Schema.Types.Boolean,
  parent: {type: Schema.Types.ObjectId, ref: "block"},
  page: {type: Schema.Types.ObjectId, ref: 'page'}},
{
  timestamps: true
});

const Block = models.Block || model("Block", block);

export default Block;