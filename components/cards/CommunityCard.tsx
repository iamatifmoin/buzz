import Image from "next/image";
import Link from "next/link";

import { Button } from "../ui/button";
import RequestModal from "../shared/RequestModal";

interface Props {
  id: string;
  name: string;
  userEmail: string;
  username: string;
  imgUrl: string;
  bio: string;
  members: {
    image: string;
  }[];
  btnText: string;
}

function CommunityCard({
  id,
  name,
  userEmail,
  username,
  imgUrl,
  bio,
  members,
  btnText,
}: Props) {
  return (
    <article className="community-card">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative h-12 w-12">
          <Image
            src={imgUrl}
            alt="community_logo"
            fill
            className="rounded-full object-cover"
          />
        </div>

        <div>
          <h4 className="text-base-semibold text-light-1">{name}</h4>
          <p className="text-small-medium text-gray-1">@{username}</p>
        </div>
      </div>

      <p className="mt-4 text-subtle-medium text-gray-1">{bio}</p>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        {btnText === "View" ? (
          <Link href={`/communities/${id}`}>
            <Button className="user-card_btn">{btnText}</Button>
          </Link>
        ) : (
          <RequestModal
            communityId={id}
            communityName={name}
            userEmail={userEmail}
          ></RequestModal>
        )}

        {members.length > 0 && (
          <div className="flex items-center">
            {members.map((member, index) => (
              <Image
                key={index}
                src={member.image}
                alt={`user_${index}`}
                width={28}
                height={28}
                className={`${
                  index !== 0 && "-ml-2"
                } rounded-full object-cover`}
              />
            ))}
            {members.length > 3 && (
              <p className="ml-1 text-subtle-medium text-gray-1">
                {members.length}+ Users
              </p>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

export default CommunityCard;
