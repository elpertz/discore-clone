import ChannelView from "@/components/ChannelView";
import { Sidebar } from "@/components/Sidebar";
import { useParams } from "react-router-dom";
import data from "@/assets/data.json";

// Notes: Función para obtener la descripción de un canal en el contexto home
// Goal: Buscar la descripción del canal en los datos del servidor por defecto (discord-home)
function getHomeChannelDescription(channelName?: string): string | undefined {
  if (!channelName) return undefined;

  // En el home, siempre usamos discord-home como servidor base
  const serverData = data["discord-home"];

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

function Home() {
  // Si la URL es: /help
  const { channelName } = useParams<{ channelName?: string }>();
  // channelName = "help"

  // PASO 1C: Usar valor por defecto si no hay canal en URL
  const currentChannel = channelName || "general";
  const channelDescription = getHomeChannelDescription(currentChannel);

  return (
    <>
      <Sidebar context="home" />
      <main className="flex min-w-0 flex-1 flex-shrink flex-col bg-gray-700 text-white">
        <ChannelView channelName={currentChannel} channelDescription={channelDescription} />
      </main>
    </>
  );
}

export default Home;
