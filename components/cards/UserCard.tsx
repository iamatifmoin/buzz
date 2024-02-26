"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import { Button } from "../ui/button";
import RequestModal from "../shared/RequestModal";
import AllowAccess from "../shared/AllowAccess";

interface Props {
  id: string;
  userEmail: string;
  name: string;
  username: string;
  imgUrl: string;
  personType: string;
  btnText: string;
  isAdmin: boolean;
}

function UserCard({
  id,
  userEmail,
  name,
  username,
  imgUrl,
  personType,
  btnText,
  isAdmin,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const isCommunity = personType === "Community";
  const communityId = pathname.split("/").pop();

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
        <>
          <Button
            className="user-card_btn"
            onClick={() => {
              router.push(`/profile/${id}`);
            }}
          >
            {btnText}
          </Button>

          {isAdmin && <AllowAccess communityId={communityId} userId={id} />}
        </>
      )}
    </article>
  );
}

export default UserCard;
