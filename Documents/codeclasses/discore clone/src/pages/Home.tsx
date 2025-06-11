import ChannelView from "@/components/ChannelView";
import { Sidebar } from "@/components/Sidebar";
import { useParams } from "react-router-dom";
// Importación default simple
import data from "../assets/data.js";
import type { Channel, DataStructure } from "../assets/data.d";

// Type assertion para que TypeScript reconozca el tipo
const typedData = data as DataStructure;

// Notes: Función para obtener la descripción de un canal en el contexto home
// Goal: Buscar la descripción del canal en los datos del servidor por defecto (discord-home)
function getHomeChannelDescription(channelName: string): string | undefined {
  // Buscar en "discord-home"
  const homeServer = typedData["discord-home"];
  if (!homeServer) return undefined;

  // Buscar en todas las categorías
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

  // Obtener todos los mensajes del canal para el contexto home
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
      <Sidebar context="home" />
      <main className="flex min-w-0 flex-1 flex-shrink flex-col bg-gray-700 text-white">
        <ChannelView
          channelName={channel}
          channelDescription={channelDescription}
          messages={channelMessages}
        />
      </main>
    </>
  );
}

export default Home;
