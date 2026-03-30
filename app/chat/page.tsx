import type { Metadata } from "next";

import { NinaLiveChat } from "@/components/chat/nina-live-chat";

export const metadata: Metadata = {
  title: "Nina · Live chat · AntAlpha MCP",
  description:
    "Streamed chat with Nina; shows which Skills (tools) were used and MCP install snippets.",
};

export default function ChatPage() {
  return <NinaLiveChat />;
}
