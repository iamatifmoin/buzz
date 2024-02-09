"use client";

import { useEffect, useState } from "react"; // Import useEffect and useState hooks

import { likeThread } from "@/lib/actions/thread.actions";
import { Heart } from "lucide-react";
import { ObjectId } from "mongoose";
import toast from "react-hot-toast";

export interface LikeProps {
  likedBy: ObjectId[];
  currentUserObjectId: ObjectId;
  currentThreadObjectId: string;
}

const Like = ({
  likedBy,
  currentUserObjectId,
  currentThreadObjectId,
}: LikeProps) => {
  const [likeCount, setLikeCount] = useState(likedBy?.length); // State to track like count
  const [isLiked, setIsLiked] = useState(
    likedBy?.includes(currentUserObjectId)
  ); // State to track like status

  useEffect(() => {
    setLikeCount(likedBy?.length); // Update like count when likedBy prop changes
    setIsLiked(likedBy?.includes(currentUserObjectId)); // Update like status when likedBy prop changes
  }, [likedBy, currentUserObjectId]);

  const likeCurrentThread = async () => {
    try {
      // Send the request to the server
      let status = await likeThread({
        currentUserObjectId: JSON.parse(JSON.stringify(currentUserObjectId)),
        threadId: currentThreadObjectId,
      });

      // Fetch the latest like count from the server
      // Note: This assumes that the server returns the updated like count in the response
      // You may need to modify this logic based on your backend implementation
      if (status === "like added") {
        setLikeCount((prevCount) => prevCount + 1);
        setIsLiked(true);
      } else {
        setLikeCount((prevCount) => prevCount - 1);
        setIsLiked(false);
      }
    } catch (error) {
      console.error("Error while liking thread:", error);
      toast.error("Error while liking thread");
    }
  };

  return (
    <div onClick={likeCurrentThread} className="flex items-center">
      {isLiked ? (
        <Heart width={24} height={24} style={{ color: "red", fill: "red" }} />
      ) : (
        <Heart width={22} height={22} style={{ color: "gray" }} />
      )}
      <span className="ml-[10px] text-light-1">
        {likeCount}
        {likeCount == 1 ? " like" : " likes"}
      </span>
    </div>
  );
};

export default Like;
