"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "../ui/button";
import RequestModal from "../shared/RequestModal";

interface Props {
  id: string;
  userEmail: string;
  name: string;
  username: string;
  imgUrl: string;
  personType: string;
  btnText: string;
}

function UserCard({
  id,
  userEmail,
  name,
  username,
  imgUrl,
  personType,
  btnText,
}: Props) {
  const router = useRouter();

  const isCommunity = personType === "Community";

  return (
    <article className="user-card">
      <div className="user-card_avatar">
        <div className="relative h-12 w-12">
          <Image
            src={imgUrl}
            alt="user_logo"
            fill
            className="rounded-full object-cover"
          />
        </div>

        <div className="flex-1 text-ellipsis">
          <h4 className="text-base-semibold text-light-1">{name}</h4>
          <p className="text-small-medium text-gray-1">@{username}</p>
        </div>
      </div>

      {isCommunity ? (
        btnText === "View" ? (
          <Button
            className="user-card_btn"
            onClick={() => {
              router.push(`/communities/${id}`);
            }}
          >
            {btnText}
          </Button>
        ) : (
          <RequestModal
            communityId={id}
            communityName={name}
            userEmail={userEmail}
          ></RequestModal>
        )
      ) : (
        <Button
          className="user-card_btn"
          onClick={() => {
            router.push(`/profile/${id}`);
          }}
        >
          {btnText}
        </Button>
      )}
    </article>
  );
}

export default UserCard;
