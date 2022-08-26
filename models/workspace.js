import { model, models, Schema } from "mongoose";

const workspace = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true,
  },
  name: Schema.Types.String,
  icon: Schema.Types.String,
  members: [
      {
        role: Schema.Types.String,
        addedAt: Schema.Types.Date,
        user: {
          type: Schema.Types.ObjectId,
          ref: "user"
        }
      }
    ],
}, {
  timestamps: true
});

const Workspace = models.Workspace || model("Workspace", workspace);

export default Workspace;