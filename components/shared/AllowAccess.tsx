"use client";

import {
  acceptCommunityRequest,
  rejectCommunityRequest,
} from "@/lib/actions/community.actions";
import { Check, X } from "lucide-react";
import toast from "react-hot-toast";

interface Props {
  communityId: string;
  userId: string;
  loggedInUserId: string;
}

function AllowAccess({ communityId, userId, loggedInUserId }: Props) {
  const rejectRequest = async function () {
    const calling = await rejectCommunityRequest(communityId, userId);
    if (calling === true) toast.success("Request Rejected!");
    else toast.error("Failed to Reject Request!");
  };

  const acceptRequest = async function () {
    const calling = await acceptCommunityRequest(
      communityId,
      userId,
      loggedInUserId
    );

    if (calling === true) toast.success("Invitation Sent!");
    else toast.error("Failed to Send Invitation!");
  };
  return (
    <>
      <Check color="green" className="cursor-pointer" onClick={acceptRequest} />
      <X color="red" className="cursor-pointer" onClick={rejectRequest} />
    </>
  );
}

export default AllowAccess;
