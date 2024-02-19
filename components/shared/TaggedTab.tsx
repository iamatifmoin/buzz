import { redirect } from "next/navigation";

import { fetchCommunityPosts } from "@/lib/actions/community.actions";
import { fetchTaggedThreads } from "@/lib/actions/user.actions";

import ThreadCard from "../cards/ThreadCard";
import { ObjectId } from "mongoose";

interface Result {
  name: string;
  image: string;
  id: string;
  threads: {
    _id: string;
    text: string;
    parentId: string | null;
    author: {
      name: string;
      image: string;
      id: string;
    };
    community: {
      id: string;
      name: string;
      image: string;
    } | null;
    createdAt: string;
    children: {
      author: {
        image: string;
      };
    }[];
    likedBy: [id: ObjectId];
    currentUserObjectId: ObjectId;
    imgSrc: string;
  }[];
}

interface Props {
  currentUserId: string;
  accountId: string;
  accountType: string;
  currentUserObjectId: ObjectId;
}

async function TaggedTab({
  currentUserId,
  currentUserObjectId,
  accountId,
  accountType,
}: Props) {
  let result: Result;

  if (accountType === "Community") {
    result = await fetchCommunityPosts(accountId);
  } else {
    result = await fetchTaggedThreads(accountId);
  }

  if (!result) {
    redirect("/");
  }

  return (
    <section className="mt-9 flex flex-col gap-10">
      {result && result.threads?.length > 0 ? (
        result.threads.map((thread) => (
          <ThreadCard
            key={thread._id}
            id={thread._id}
            currentUserId={currentUserId}
            currentUserObjectId={currentUserObjectId}
            parentId={thread.parentId}
            content={thread.text}
            author={
              accountType === "User"
                ? { name: result.name, image: result.image, id: result.id }
                : {
                    name: thread.author.name,
                    image: thread.author.image,
                    id: thread.author.id,
                  }
            }
            community={
              accountType === "Community"
                ? { name: result.name, id: result.id, image: result.image }
                : thread.community
            }
            createdAt={thread.createdAt}
            comments={thread.children}
            likedBy={thread.likedBy}
            imgSrc={thread.imgSrc}
          />
        ))
      ) : (
        <div>No Replies Found</div>
      )}
    </section>
  );
}

export default TaggedTab;
