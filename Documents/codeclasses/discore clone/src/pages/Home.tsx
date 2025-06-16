import ChannelView from "@/components/ChannelView";
import { Sidebar } from "@/components/Sidebar";
import { useParams } from "react-router-dom";
import data from "../assets/data.js"; // Importación default simple
import type { Channel, DataStructure } from "../assets/data.d"; // Importación de tipos

// Type assertion para que TypeScript reconozca el tipo
const typedData = data as DataStructure;

// Gets channel description from discord-home server data
function getHomeChannelDescription(channelName: string): string | undefined {
  // Search in discord-home server
  const homeServer = typedData["discord-home"];
  if (!homeServer) return undefined;

  // Search in all categories
  for (const category of homeServer.categories) {
    const channel: Channel | undefined = category.channels.find((ch) => ch.label === channelName);
    if (channel && channel.description) {
      return channel.description;
    }
  }
  return undefined;
}

function Home() {
  const { channelName } = useParams();
  const channel = channelName || "welcome";
  const serverName = "Discord";

  // Get all messages for the channel in home context
  const homeData = typedData["discord-home"];
  let channelMessages: any[] = [];

  if (homeData) {
    for (const category of homeData.categories) {
      const foundChannel: Channel | undefined = category.channels.find(
        (ch) => ch.label === channel
      );
      if (foundChannel && foundChannel.messages) {
        channelMessages = foundChannel.messages;
        break;
      }
    }
  }

  const channelDescription = getHomeChannelDescription(channel);

  return (
    <>
      <Sidebar context="home" className="hidden md:block" />
      <main className="flex min-w-0 flex-1 flex-shrink flex-col bg-gray-700 text-white">
        <ChannelView
          channelName={channel}
          channelDescription={channelDescription}
          messages={channelMessages}
          serverName={serverName}
        />
      </main>
    </>
  );
}

export default Home;
