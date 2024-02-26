import { currentUser } from "@clerk/nextjs";

import UserCard from "../cards/UserCard";

import { fetchCommunities } from "@/lib/actions/community.actions";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { ObjectId } from "mongoose";

async function RightSidebar() {
  const user = await currentUser();
  if (!user) return null;

  const loggedInUser = await fetchUser(user.id);

  const similarMinds = await fetchUsers({
    userId: user.id,
    pageSize: 3,
  });
  let counter = 0;

  const suggestedCommunities = await fetchCommunities({ pageSize: 3 });
  let idObject = {};
  suggestedCommunities.communities.map((community) => {
    let arr: ObjectId[] = [];
    community.members.map((member: any) => {
      arr.push(member._id);
    });
    idObject[counter] = arr;
    counter++;
  });

  return (
    <section className="custom-scrollbar rightsidebar">
      <div className="flex flex-1 flex-col justify-start">
        <h3 className="text-heading4-medium text-light-1">
          Suggested Communities
        </h3>

        <div className="mt-7 flex w-[350px] flex-col gap-9">
          {suggestedCommunities.communities.length > 0 ? (
            <>
              {suggestedCommunities.communities.map((community, index) => (
                <UserCard
                  key={community.id}
                  id={community.id}
                  userEmail={user.emailAddresses[0].emailAddress}
                  name={community.name}
                  username={community.username}
                  imgUrl={community.image}
                  personType="Community"
                  btnText={
                    idObject[index].toString().includes("" + loggedInUser._id)
                      ? "View"
                      : "Join"
                  }
                />
              ))}
            </>
          ) : (
            <p className="!text-base-regular text-light-3">
              No communities yet
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-start">
        <h3 className="text-heading4-medium text-light-1">Similar Minds</h3>
        <div className="mt-7 flex w-[350px] flex-col gap-10">
          {similarMinds.users.length > 0 ? (
            <>
              {similarMinds.users.map((person) => (
                <UserCard
                  key={person.id}
                  id={person.id}
                  userEmail={user.emailAddresses[0].emailAddress}
                  name={person.name}
                  username={person.username}
                  imgUrl={person.image}
                  personType="User"
                  btnText="View"
                />
              ))}
            </>
          ) : (
            <p className="!text-base-regular text-light-3">No users yet</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default RightSidebar;
