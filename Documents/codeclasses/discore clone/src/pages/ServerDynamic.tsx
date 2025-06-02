import { Sidebar } from "@/components/Sidebar";
import ChannelView from "@/components/ChannelView";
import { useParams } from "react-router-dom";
import data from "@/assets/data.json";

// Mapeo de uniqueSlug a dataKey para acceder a data.json
const serverSlugMapping: Record<string, keyof typeof data> = {
  "tailwind-css": "tailwind-css",
  "tailwind-css-2": "tailwind-css", // ← Duplicado usa mismos datos
  "champion-league": "champion-league",
  "champion-league-2": "champion-league", // ← Duplicado usa mismos datos
  "art-design": "art-design",
};

function getServerDataKey(uniqueSlug?: string): keyof typeof data {
  return uniqueSlug ? serverSlugMapping[uniqueSlug] || "tailwind-css" : "tailwind-css";
}

function getChannelDescription(uniqueSlug?: string, channelName?: string): string | undefined {
  if (!channelName || !uniqueSlug) return undefined;

  const dataKey = getServerDataKey(uniqueSlug);
  const serverData = data[dataKey];

  // Buscar el canal en todas las categorías
  for (const category of serverData.categories) {
    const channel = category.channels.find(
      (ch) => ch.label.toLowerCase().replace(/\s+/g, "-") === channelName.toLowerCase()
    );
    if (channel?.description) {
      return channel.description;
    }
  }

  return undefined;
}

function ServerDynamic() {
  const { serverSlug, channelName } = useParams<{
    serverSlug: string; // uniqueSlug del servidor (ej: "tailwind-css", "art-design")
    channelName?: string; // Channel Name (opcional)
  }>();

  const currentChannel = channelName || "general";
  const channelDescription = getChannelDescription(serverSlug, currentChannel);

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
        />
      </main>
    </>
  );
}

export default ServerDynamic;
