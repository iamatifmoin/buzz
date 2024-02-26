"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { addCommunityRequest } from "@/lib/actions/community.actions";

export default function RequestModal({
  communityId,
  communityName,
  userEmail,
}: {
  communityId: string;
  communityName: string;
  userEmail: string;
}) {
  async function sendRequest() {
    const res = await addCommunityRequest(communityId, userEmail);
    if (res === true) toast.success("Request Sent!");
    else if (res === "already sent") toast.error("Request sent already!");
    else toast.error("Error Sending Request!");
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="user-card_btn">Join</Button>
      </DialogTrigger>
      <DialogContent className="bg-white lg:max-w-[650px] md:max-w-[620px] max-w-[400px] rounded-lg">
        <DialogHeader>
          <DialogTitle>
            Request to Join the <b>{communityName}</b> Community!
          </DialogTitle>
          {/* <DialogTitle>Email</DialogTitle> */}
          <DialogDescription>
            <div className="flex rounded-md border justify-between relative right-5 lg:p-5 lg:mt-5 md:p-4 md:mt-4 p-2 mt-2 sm:right-5 md:right-0">
              <span className="text-subtle-medium md:text-base-medium">
                {userEmail}
              </span>
            </div>
          </DialogDescription>
        </DialogHeader>
        <Button className="user-card_btn" onClick={() => sendRequest()}>
          Send Request
        </Button>
      </DialogContent>
    </Dialog>
  );
}
