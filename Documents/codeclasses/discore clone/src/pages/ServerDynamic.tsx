import { Sidebar } from "@/components/Sidebar";
import ChannelView from "@/components/ChannelView";
import { useParams } from "react-router-dom";
import data from "../assets/data.js";
import type { Channel, DataStructure } from "../assets/data.d";

// Type assertion para que TypeScript reconozca el tipo
const typedData = data as DataStructure;

// Mapeo de uniqueSlug a dataKey para acceder a data.js
const serverSlugMapping: Record<string, keyof DataStructure> = {
  "tailwind-css": "tailwind-css",
  "tailwind-css-2": "tailwind-css", // ← Duplicado usa mismos datos
  "champion-league": "champion-league",
  "champion-league-2": "champion-league", // ← Duplicado usa mismos datos
  "art-design": "art-design",
};

/**
 * Notes: Obtiene el dataKey del servidor basado en el uniqueSlug
 * Goal: Mapear uniqueSlug a nombres semánticos para acceder a los datos correctos
 */
function getServerDataKey(uniqueSlug?: string): keyof DataStructure {
  return uniqueSlug ? serverSlugMapping[uniqueSlug] || "tailwind-css" : "tailwind-css";
}

/**
 * Notes: Obtiene la descripción de un canal específico del servidor
 * Goal: Buscar la descripción en todas las categorías del servidor
 */
function getChannelDescription(uniqueSlug?: string, channelName?: string): string | undefined {
  if (!channelName || !uniqueSlug) return undefined;

  const dataKey = getServerDataKey(uniqueSlug);
  const serverData = typedData[dataKey];

  // Buscar el canal en todas las categorías
  for (const category of serverData.categories) {
    const channel = category.channels.find(
      (ch: Channel) => ch.label.toLowerCase().replace(/\s+/g, "-") === channelName.toLowerCase()
    );
    if (channel?.description) {
      return channel.description;
    }
  }

  return undefined;
}

/**
 * Notes: Obtiene los mensajes de un canal específico del servidor
 * Goal: Buscar los mensajes en todas las categorías del servidor
 */
function getChannelMessages(uniqueSlug?: string, channelName?: string): any[] {
  if (!channelName || !uniqueSlug) return [];

  const dataKey = getServerDataKey(uniqueSlug);
  const serverData = typedData[dataKey];

  // Buscar el canal en todas las categorías
  for (const category of serverData.categories) {
    const channel = category.channels.find(
      (ch: Channel) => ch.label.toLowerCase().replace(/\s+/g, "-") === channelName.toLowerCase()
    );
    if (channel?.messages) {
      return channel.messages;
    }
  }

  return [];
}

export default function ServerDynamic() {
  const { serverSlug, channelName } = useParams<{
    serverSlug: string; // uniqueSlug del servidor (ej: "tailwind-css", "art-design")
    channelName?: string; // Channel Name (opcional)
  }>();

  const currentChannel = channelName || "general";
  const channelDescription = getChannelDescription(serverSlug, currentChannel);
  const channelMessages = getChannelMessages(serverSlug, currentChannel);

  return (
    <>
      {/* Pasar contexto del servidor y agregar nuevo sidebar*/}
      <Sidebar context="server" serverSlug={serverSlug} />
      {/* Pasar el nombre del canal y el contexto del servidor */}
      <main className="flex min-w-0 flex-1 flex-shrink flex-col bg-gray-700 text-white">
        <ChannelView
          channelName={currentChannel}
          channelDescription={channelDescription}
          serverSlug={serverSlug}
          messages={channelMessages}
        />
      </main>
    </>
  );
}
