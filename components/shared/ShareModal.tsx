"use client";
import React from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Copy } from "lucide-react";
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappIcon,
  WhatsappShareButton,
  LineShareButton,
  LinkedinIcon,
  EmailShareButton,
  EmailIcon,
} from "next-share";
import toast from "react-hot-toast";

export default function ShareModal({ url }: { url: string }) {
  const copyUrl = async () => {
    navigator.clipboard.writeText(url);
    toast.success("Copied!");
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Image
          src="/assets/share.svg"
          alt="share"
          width={24}
          height={24}
          className="cursor-pointer object-contain"
        />
      </DialogTrigger>
      <DialogContent className="bg-white lg:max-w-[650px] md:max-w-[620px] max-w-[480px] rounded-lg">
        <DialogHeader>
          <DialogTitle>Share Post</DialogTitle>
          <DialogDescription>
            <div className="flex rounded-md border justify-between lg:p-5 lg:mt-5 md:p-4 md:mt-4 p-2 mt-2">
              <span className="text-small-regular md:text-base-medium">
                {url}
              </span>
              <Copy onClick={copyUrl} className="cursor-pointer" />
            </div>
            <div className="flex items-center space-x-5 mt-5">
              <FacebookShareButton
                url={url}
                quote={"Threads Post."}
                hashtag={"#threads"}
              >
                <FacebookIcon size={32} round />
              </FacebookShareButton>
              <WhatsappShareButton url={url}>
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>
              <LineShareButton url={url}>
                <LinkedinIcon size={32} round />
              </LineShareButton>
              <EmailShareButton url={url}>
                <EmailIcon size={32} round />
              </EmailShareButton>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
