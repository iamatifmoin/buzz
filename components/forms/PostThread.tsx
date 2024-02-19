"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useOrganization } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { ThreadValidation } from "@/lib/validations/thread";
import { createThread } from "@/lib/actions/thread.actions";
import { Input } from "../ui/input";
import { ChangeEvent, useEffect, useState } from "react";
import { useUploadThing } from "@/lib/uploadthing";
import { Mention, MentionsInput } from "react-mentions";
import defaultStyle from "../../constants/defaultStyle";
import defaultMentionStyle from "../../constants/defaultMentionStyle";
import { fetchAllUsers, fetchUser } from "@/lib/actions/user.actions";
import { ObjectId } from "mongoose";

interface Props {
  userId: string;
}

function PostThread({ userId }: Props) {

  const onAdd = async (e: any) => {
    const userId = e; // Assuming e contains the user ID being tagged
    const user = users.find((user) => user.id === userId); // Find the user object based on the user ID
  
    if (user) {
      setTags((prevTags) => [...prevTags, user._id]); // Add the user's _id to the tags array
    }
  };

  const router = useRouter();
  const pathname = usePathname();

  const { organization } = useOrganization();
  const [files, setFiles] = useState<File[]>([]);
  const { startUpload } = useUploadThing("media");
  const [allUsersArray, setAllUsersArray] = useState<Object[]>([]);
  const [tags, setTags] = useState<ObjectId[]>([]);

  const form = useForm<z.infer<typeof ThreadValidation>>({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      thread: "",
      accountId: userId,
    },
  });

  const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
    const imgRes = await startUpload(files);
  
    const { thread } = values;
  
    
    // Extract user IDs and usernames from thread text using regular expression
    const pattern = /@\[([^\]]+)\]\(([^)]+)\)/g;
    let match;
    let textWithoutMentions = thread; // Initialize text without mentions with the original thread text
  
    while ((match = pattern.exec(thread)) !== null) {
     
      const username = match[1];

     // Replace mention with username
      textWithoutMentions = textWithoutMentions.replace(match[0],`@${username}`);
    }
  
    // Trim text without mentions to remove extra spaces
    textWithoutMentions = textWithoutMentions.trim();
  
    await createThread({
      text: textWithoutMentions,
      author: userId,
      communityId: organization ? organization.id : null,
      path: pathname,
      tags: tags ? tags : null,
      imgSrc: imgRes && imgRes[0]?.fileUrl ? imgRes[0].fileUrl : "",
    });
  
    router.push("/");
  };
  
  
  const handleImage = (
    e: ChangeEvent<HTMLInputElement>
    // fieldChange: (value: string) => void
  ) => {
    e.preventDefault();
    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFiles(Array.from(e.target.files));

      if (!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        // const imageDataUrl = event.target?.result?.toString() || "";
        event.target?.result?.toString() || "";
        // fieldChange(imageDataUrl);
      };

      fileReader.readAsDataURL(file);
    }
  };

  let users: Object[] = [];

    

  const fetchUsersQuery = (query: any, callback: any) => {
    if (!query) return;

    setTimeout(() => {
      const filteredUsers = users.filter((currentUser) =>
        currentUser.display.toLowerCase().includes(query)
      );
      callback(filteredUsers);
    }, 2000);
  };

  let allUsers: Object[] = [];

  useEffect(() => {
    async function fetchUsers() {
      allUsers = await fetchAllUsers();
      setAllUsersArray(allUsers);
    }
    fetchUsers();
  }, []);

  allUsersArray?.map((currentUser) =>
    users.push(
      new Object({
        _id: currentUser._id,
        id: currentUser.id,
        display: currentUser.username,
      })
    )
  );
  console.log(users);

  return (
    <Form {...form}>
      <form
        className="mt-10 flex flex-col justify-start gap-10"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="text-base-semibold text-light-2">
                Image (Optional)
              </FormLabel>
              <FormControl className="flex-1 text-base-semibold text-gray-200">
                <Input
                  type="file"
                  accept="image/*"
                  placeholder="Add profile photo"
                  className="account-form_image-input"
                  // onChange={(e) => handleImage(e, field.onChange)}
                  onChange={(e) => handleImage(e)}
                />
              </FormControl>
              <FormLabel className="text-base-semibold text-light-2">
                Text / Caption
              </FormLabel>
              <FormControl className="no-focus border border-dark-4 bg-dark-3 text-dark-1">
                <MentionsInput
                  // singleLine
                  // value={value}
                  // onChange={onChange}
                  placeholder={"Mention people using '@'"}
                  a11ySuggestionsListLabel={"Suggested mentions"}
                  style={defaultStyle}
                  {...field}
                >
                  <Mention
                    data={fetchUsersQuery}
                    onAdd={onAdd}
                    style={defaultMentionStyle}
                    appendSpaceOnAdd
                  />
                </MentionsInput>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="bg-primary-500">
          Post Buzz
        </Button>
      </form>
    </Form>
  );
}

export default PostThread;
