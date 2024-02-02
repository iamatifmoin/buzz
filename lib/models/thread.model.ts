import mongoose from "mongoose";

const threadSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  community: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Community",
  },
  createdAt: {
    type: Date,
    default: () => {
      var currentTime = new Date();
      var currentOffset = currentTime.getTimezoneOffset();
      var ISTOffset = 330; // IST offset UTC +5:30
      var ISTTime = new Date(
        currentTime.getTime() + (ISTOffset + currentOffset) * 60000
      );
      return ISTTime;
    },
  },
  parentId: {
    type: String,
  },
  children: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thread",
    },
  ],
});

const Thread = mongoose.models.Thread || mongoose.model("Thread", threadSchema);

export default Thread;
