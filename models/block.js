import { model, models, Schema } from "mongoose";

const block = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true,
  },
  type: Schema.Types.String,
  properties: Schema.Types.Mixed,
  page: {type: Schema.Types.ObjectId, ref: 'page'},
  updatedBy: {type: Schema.Types.ObjectId, ref: 'user'},
  position: Schema.Types.Number,
  createdAt: Schema.Types.Date,
  updatedAt: Schema.Types.Date,
}, {
  timestamps: true
});

const Block = models.Block || model("Block", block);

export default Block;