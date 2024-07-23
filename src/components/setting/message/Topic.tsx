import { PlusIcon } from "lucide-react";
import React from "react";
import Search from "~/components/misc/Search";
import Messages from "~/components/setting/message/Messages";
import TopicMessage from "~/components/setting/message/TopicMessage";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { api } from "~/trpc/react";

// IMPORT Components: Topic Message: which is a form for the post
// Have a scroll area with all the Messages that are included
// Have

export default function Topic() {
  const users = api.user.createdByMessage.useQuery();

  return (
    <div>
      <div className="m-5">
        <div>
          <h1 className="text-2xl font-semibold">General</h1>
        </div>
        <div>
          <div className="mb-2 mt-5 grid grid-flow-row items-center">
            <div className="grid w-full gap-2">
              <TopicMessage />
            </div>
            {/* TODO: This is not pulling users with messages  */}
            {users.data?.map((user) => <Messages key={user.id} user={user} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
