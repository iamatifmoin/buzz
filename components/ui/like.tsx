"use client";

import { likeThread } from "@/lib/actions/thread.actions";
import { Heart } from "lucide-react";
import { ObjectId } from "mongoose";
import * as React from "react";
import toast from "react-hot-toast";

export interface LikeProps {
  likedBy: [id: ObjectId];
  currentUserObjectId: ObjectId;
  currentThreadObjectId: string;
}

const Like = ({
  likedBy,
  currentUserObjectId,
  currentThreadObjectId,
}: LikeProps) => {
  const likeCurrentThread = async () => {
    let status = await likeThread({
      currentUserObjectId: JSON.parse(JSON.stringify(currentUserObjectId)),
      threadId: JSON.parse(JSON.stringify(currentThreadObjectId)),
      // path: pathname,
    });
    if (status == "like added") {
      console.log("here");
      toast.success("Like Added");
    } else {
      toast.success("Like Removed");
    }
  };
  return (
    <div onClick={likeCurrentThread}>
      {likedBy.length > 0 ? (
        likedBy.map((user: object) =>
          user === currentUserObjectId ? (
            <Heart
              width={24}
              height={24}
              style={{ color: "red", fill: "red" }}
            />
          ) : (
            <Heart width={22} height={22} style={{ color: "gray" }} />
          )
        )
      ) : (
        <Heart width={22} height={22} style={{ color: "gray" }} />
      )}
    </div>
  );
};

export default Like;
