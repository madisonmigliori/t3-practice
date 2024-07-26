"use client";
import { PlusIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import TopicSelected from "~/app/settings/messages/[id]/page";

import AddTopic from "~/components/setting/messages/AddTopic";
import SearchTopics from "~/components/setting/messages/SearchTopics";
import TopicList from "~/components/setting/messages/TopicList";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";

export default function Message() {
  const search = useSearchParams();
  const searchQuery = search ? search.get("q") : null;
  console.log;

  const searching = api.message.searchTopic.useQuery({
    title: searchQuery ?? "",
  });

  const fido = searching.refetch.name;
  console.log("Bark", fido);

  const searchSize = searching.data?.length;

  return (
    <div>
      <TopicSelected
        params={{
          id: "",
        }}
      />
    </div>
  );
}
