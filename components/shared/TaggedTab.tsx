"use client"
import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import { fetchTaggedThreads } from '@/lib/actions/user.actions';
import ThreadCard from '../cards/ThreadCard';
import { ObjectId } from 'mongoose';

interface Thread {
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
  likedBy: [id:ObjectId]; // Changed likedBy type to ObjectId[]
  currentUserObjectId: ObjectId;
  imgSrc: string;
}

interface Props {
  currentUserId: string;
  currentUserObjectId: ObjectId;
}

const TaggedTab = ({ currentUserId, currentUserObjectId }: Props) => {
  const [taggedThreads, setTaggedThreads] = useState<Thread[]>([]);

  useEffect(() => {
    const fetchTaggedThreadsData = async () => {
      try {
        const taggedThreads = await fetchTaggedThreads(currentUserId);
        setTaggedThreads(taggedThreads);
      } catch (error) {
        console.error('Error fetching tagged threads: ', error);
        redirect('/'); // Redirect to homepage or handle error appropriately
      }
    };

    fetchTaggedThreadsData();
  }, [currentUserId]);

  return (
    <section className="mt-9 flex flex-col gap-10">
      {taggedThreads.length > 0 ? (
        taggedThreads.map((thread) => (
          <ThreadCard
            key={thread._id}
            id={thread._id}
            currentUserId={currentUserId}
            currentUserObjectId={currentUserObjectId}
            parentId={thread.parentId}
            content={thread.text}
            author={{ name: thread.author.name, image: thread.author.image, id: thread.author.id }}
            community={thread.community}
            createdAt={thread.createdAt}
            comments={thread.children}
            likedBy={thread.likedBy} // No need to change here, assuming likedBy is already ObjectId[]
            imgSrc={thread.imgSrc}
          />
        ))
      ) : (
        <div>No Tagged Threads Found</div>
      )}
    </section>
  );
};

export default TaggedTab;
