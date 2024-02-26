"use client";

import { rejectCommunityRequest } from "@/lib/actions/community.actions";
import { Check, X } from "lucide-react";
import toast from "react-hot-toast";

interface Props {
  communityId: string;
  userId: string;
}

function AllowAccess({ communityId, userId }: Props) {
  const rejectRequest = async function () {
    const calling = await rejectCommunityRequest(communityId, userId);
    if (calling === true) toast.success("Request Rejected!");
    else toast.error("Failed to Reject Request!");
  };
  return (
    <>
      <Check color="green" className="cursor-pointer" />
      <X color="red" className="cursor-pointer" onClick={rejectRequest} />
    </>
  );
}

export default AllowAccess;
