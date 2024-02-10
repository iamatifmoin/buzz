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
import { Textarea } from "@/components/ui/textarea";

import { ThreadValidation } from "@/lib/validations/thread";
import { createThread } from "@/lib/actions/thread.actions";
import { Input } from "../ui/input";
import { ChangeEvent, useState } from "react";
import { useUploadThing } from "@/lib/uploadthing";

interface Props {
  userId: string;
}

function PostThread({ userId }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const { organization } = useOrganization();
  const [files, setFiles] = useState<File[]>([]);
  const { startUpload } = useUploadThing("media");

  const form = useForm<z.infer<typeof ThreadValidation>>({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      thread: "",
      accountId: userId,
    },
  });

  const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
    const imgRes = await startUpload(files);

    await createThread({
      text: values.thread,
      author: userId,
      communityId: organization ? organization.id : null,
      path: pathname,
      imgSrc: imgRes && imgRes[0].fileUrl ? imgRes[0].fileUrl : "",
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
              <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                <Textarea rows={7} {...field} />
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
