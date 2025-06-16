import { MessageWithAvatar, MessageSimple } from "./ui/messagesend";
import { Button } from "./ui/button";
import * as Icons from "./icons-d/icons";
import { Input } from "./ui/input";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose } from "./ui/drawer";
import data from "../assets/data.js";
import type { DataStructure } from "../assets/data.d";
import { ChevronDownIcon } from "lucide-react";

interface Message {
  id: number;
  user: string;
  avatarUrl: string;
  date: string;
  text: string;
}

interface ChannelViewProps {
  channelName: string;
  channelDescription?: string;
  serverSlug?: string;
  serverName?: string;
  messages?: Message[];
}

export default function ChannelView({
  channelName,
  channelDescription,
  serverSlug, // Server slug for context
  serverName,
  messages = [],
}: ChannelViewProps) {
  // Determines if message should show avatar (different user or time gap)
  const shouldShowAvatar = (currentMessage: Message, previousMessage?: Message): boolean => {
    // Always show avatar for first message
    if (!previousMessage) return true;

    // Show avatar if different user
    if (currentMessage.user !== previousMessage.user) return true;

    // Future: Add time-based logic (7+ minutes apart)
    // const timeDiff = new Date(currentMessage.date).getTime() - new Date(previousMessage.date).getTime();
    // if (timeDiff > 7 * 60 * 1000) return true;

    return false;
  };

  return (
    <>
      <ChannelHeader
        channelName={channelName}
        channelDescription={channelDescription}
        serverSlug={serverSlug}
        serverName={serverName}
      />

      {/* Contenedor principal con scroll vertical */}
      <div className="flex-1 overflow-y-auto">
        <div className="pb-4">
          {/* Check if there are messages to display */}
          {messages.length > 0 ? (
            messages.map((message, index) => {
              // Obtiene el mensaje anterior para comparar
              const previousMessage = index > 0 ? messages[index - 1] : undefined;
              // Determina si debe mostrar el avatar basado en la lógica de Discord
              const showAvatar = shouldShowAvatar(message, previousMessage);

              // Renderiza mensaje con avatar o sin él según la condición
              return showAvatar ? (
                <MessageWithAvatar
                  key={message.id}
                  id={message.id}
                  user={message.user}
                  avatarUrl={message.avatarUrl}
                  date={message.date}
                  text={message.text}
                  // Genera timestamp dinámico basado en el índice
                  timestamp={`${12 + (index % 12)}:${String(index % 60).padStart(2, "0")} PM`}
                />
              ) : (
                <MessageSimple
                  key={message.id}
                  text={message.text}
                  timestamp={`${12 + (index % 12)}:${String(index % 60).padStart(2, "0")} PM`}
                />
              );
            })
          ) : (
            /* Mensaje de bienvenida cuando no hay mensajes */
            <div className="flex h-full items-center justify-center pt-24 text-gray-400">
              <div className="text-center">
                <Icons.Hashtag className="mx-auto mb-4 size-16 text-gray-600" />
                <h3 className="mb-2 text-xl font-semibold">
                  Welcome to #{serverName || channelName}
                </h3>
                <p className="text-gray-500">This is the start of the #{channelName} channel.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

interface ChannelHeaderProps {
  channelName: string;
  channelDescription?: string;
  serverSlug?: string;
  serverName?: string;
}

// Servers data from ServerNav (including home)
const servers = [
  {
    uniqueSlug: "home",
    img: undefined, // Will use Discord icon
    name: "Discord Home",
    color: "bg-brand",
    isHome: true,
  },
  {
    uniqueSlug: "tailwind-css",
    img: "/images/d-logos/tailwind.png",
    name: "Tailwind CSS",
    color: "bg-brand",
  },
  {
    uniqueSlug: "champion-league",
    img: "/images/d-logos/addi.png",
    name: "Champion League",
    color: "bg-[#1C67D8]",
  },
  {
    uniqueSlug: "art-design",
    img: "/images/d-logos/brand.png",
    name: "Art Design",
    color: "bg-brand",
  },
  {
    uniqueSlug: "tailwind-css-2",
    img: "/images/d-logos/face.png",
    name: "Tailwind CSS 2",
    color: "bg-green-800",
  },
  {
    uniqueSlug: "champion-league-2",
    img: "/images/d-logos/perzcool.png",
    name: "Champion League 2",
    color: "bg-brand",
  },
];

/**
 * Converts server slug to readable display name
 */
function getServerName(uniqueSlug?: string): string {
  if (!uniqueSlug) return "General";

  // Convertir el slug a un nombre legible
  return uniqueSlug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Renders sidebar content inside the mobile drawer
 */
function DrawerSidebarContent({
  context,
  serverSlug,
  onChannelClick,
}: {
  context: "home" | "server";
  serverSlug?: string;
  onChannelClick: () => void;
}) {
  const [closedCategories, setClosedCategories] = useState<string[]>([]);
  const location = useLocation();

  // Importar datos y mapeo (copiado del Sidebar original)
  const typedData = data as DataStructure;
  const serverSlugMapping: Record<string, keyof DataStructure> = {
    "tailwind-css": "tailwind-css",
    "tailwind-css-2": "tailwind-css", // Usa los mismos datos que tailwind-css
    "champion-league": "champion-league",
    "champion-league-2": "champion-league", // Usa los mismos datos que champion-league
    "art-design": "art-design",
  };

  function getServerDataKey(uniqueSlug?: string): keyof DataStructure {
    return uniqueSlug ? serverSlugMapping[uniqueSlug] || "tailwind-css" : "tailwind-css";
  }

  const serverKey = context === "home" ? "discord-home" : getServerDataKey(serverSlug);
  const serverData = typedData[serverKey];

  const toggleCategory = (categoryId: string | number) => {
    const idToString = categoryId.toString();
    setClosedCategories((prev) =>
      prev.includes(idToString) ? prev.filter((id) => id !== idToString) : [...prev, idToString]
    );
  };

  const isCategoryClosed = (categoryId: string | number) => {
    return closedCategories.includes(categoryId.toString());
  };

  const getChannelState = (channel: any) => {
    const channelPath = channel.label.toLowerCase().replace(/\s+/g, "-");
    const to = context === "home" ? `/home/${channelPath}` : `/${serverSlug}/${channelPath}`;
    const isActive = location.pathname === to;
    return isActive ? "active" : channel.unread ? "inactiveUnread" : "inactiveRead";
  };

  return (
    <div className="flex flex-col gap-1">
      {serverData.categories.map((categorie: any) => (
        <div className="flex flex-col gap-1 pt-3" key={categorie.id}>
          {categorie.label && (
            <Button
              onClick={() => toggleCategory(categorie.id)}
              variant="none"
              className="group hover:bg-gray-550/24 relative flex cursor-pointer items-center justify-start gap-0 rounded py-1.5 text-sm text-gray-200 uppercase transition-colors hover:text-gray-100"
              size="sm"
            >
              <ChevronDownIcon
                className={`mr-1 size-3 transition-transform ${
                  isCategoryClosed(categorie.id) ? "-rotate-90" : ""
                }`}
              />
              <span>{categorie.label}</span>
            </Button>
          )}

          <div className="space-y-0.5 px-1">
            {categorie.channels
              .filter((channel: any) => {
                if (!isCategoryClosed(categorie.id)) return true;
                return getChannelState(channel) === "inactiveUnread";
              })
              .map((channel: any) => (
                <DrawerChannelLink
                  key={channel.id}
                  channel={channel}
                  context={context}
                  serverSlug={serverSlug}
                  onClick={onChannelClick}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Channel link component for the mobile drawer
 */
function DrawerChannelLink({
  channel,
  context,
  serverSlug,
  onClick,
}: {
  channel: any;
  context: "home" | "server";
  serverSlug?: string;
  onClick: () => void;
}) {
  const location = useLocation();
  const navigate = useNavigate();

  const iconMap: Record<string, keyof typeof Icons> = {
    Book: "Book",
    Speakerphone: "Speakerphone",
  };

  const Icon = channel.icon
    ? Icons[iconMap[channel.icon] as keyof typeof Icons] || Icons.Hashtag
    : Icons.Hashtag;

  const channelPath = channel.label.toLowerCase().replace(/\s+/g, "-");
  const to = context === "home" ? `/home/${channelPath}` : `/${serverSlug}/${channelPath}`;
  const isActive = location.pathname === to;

  const state = isActive ? "active" : channel.unread ? "inactiveUnread" : "inactiveRead";

  const getChannelStyles = (status: string) => {
    const baseStyles =
      "group relative flex cursor-pointer items-center gap-2 rounded px-3 py-1.5 text-sm transition-colors";

    switch (status) {
      case "active":
        return `${baseStyles} bg-gray-550/30 text-white hover:bg-gray-550/50`;
      case "inactiveUnread":
        return `${baseStyles} text-white hover:bg-gray-550/50`;
      case "inactiveRead":
        return `${baseStyles} text-gray-200 hover:bg-gray-550/50 hover:text-white`;
      default:
        return baseStyles;
    }
  };

  const handleClick = () => {
    navigate(to);
    onClick(); // Cerrar el drawer
  };

  return (
    <button onClick={handleClick} className={getChannelStyles(state)}>
      <Icon className="size-5 text-gray-200" />
      {channel.label}
      <Icons.AddPerson className="ml-auto size-4 opacity-0 transition-opacity group-hover:opacity-70 hover:opacity-100" />
      {state === "inactiveUnread" && (
        <div className="absolute top-1/2 -left-1 h-2 w-0.5 origin-left -translate-y-1/2 scale-x-100 rounded-r-xs bg-gray-100" />
      )}
    </button>
  );
}

export function ChannelHeader({
  channelName,
  channelDescription,
  serverSlug,
  serverName,
}: ChannelHeaderProps) {
  // Usar sessionStorage para persistir el estado del drawer entre navegaciones
  const [isDrawerOpen, setIsDrawerOpen] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("drawerOpen") === "true";
    }
    return false;
  });

  const location = useLocation();
  const navigate = useNavigate();

  // Persistir el estado del drawer en sessionStorage
  const handleDrawerChange = (open: boolean) => {
    setIsDrawerOpen(open);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("drawerOpen", open.toString());
    }
  };

  // Determines which server is active based on current route
  const getActiveServer = () => {
    // Check if it's home route
    const isHomeRoute = location.pathname === "/" || location.pathname.startsWith("/home");
    if (isHomeRoute) {
      return servers[0]; // Home server
    }

    // Buscar el servidor que coincida exactamente con la ruta
    // Ordenar por longitud de uniqueSlug (más específico primero) para evitar matches parciales
    const sortedServers = servers
      .filter((server) => !server.isHome)
      .sort((a, b) => b.uniqueSlug.length - a.uniqueSlug.length);

    const foundServer = sortedServers.find((server) =>
      location.pathname.startsWith(`/${server.uniqueSlug}`)
    );

    return foundServer || servers[1]; // Default to first non-home server
  };

  const activeServer = getActiveServer();

  return (
    <>
      {/* Mobile Header */}
      <div className="flex h-12 items-center justify-between gap-2 border-b border-gray-400/5 px-3 font-semibold shadow-sm transition-colors md:hidden">
        <div className="flex items-center gap-2">
          <Button
            variant="none"
            size="icon2"
            className="group mr-2 text-gray-200 hover:text-gray-100"
            onClick={() => handleDrawerChange(true)}
          >
            <div className="size-5 space-y-1 py-1">
              <div className="h-0.5 w-full bg-gray-300 group-hover:bg-gray-100"></div>
              <div className="h-0.5 w-full bg-gray-300 group-hover:bg-gray-100"></div>
              <div className="h-0.5 w-full bg-gray-300 group-hover:bg-gray-100"></div>
            </div>
          </Button>
          <Icons.Hashtag className="size-5 font-semibold text-gray-400"></Icons.Hashtag>
          <span className="text-sm font-semibold whitespace-nowrap">
            {channelName.charAt(0).toUpperCase() + channelName.slice(1)}
          </span>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Button variant="none" size="icon2" className="text-gray-200 hover:text-gray-100">
            <Icons.HashtagWithSpeechBubble className="size-5 font-semibold"></Icons.HashtagWithSpeechBubble>
          </Button>

          <Button variant="none" size="icon2" className="text-gray-200 hover:text-gray-100">
            <Icons.People className="size-5 font-semibold"></Icons.People>
          </Button>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden h-12 items-center justify-between gap-2 border-b border-gray-400/5 px-3 font-semibold shadow-sm transition-colors md:flex">
        <div className="flex items-center gap-2">
          <Icons.Hashtag className="size-5 font-semibold text-gray-400"></Icons.Hashtag>
          <span className="text-sm font-semibold whitespace-nowrap">
            {channelName.charAt(0).toUpperCase() + channelName.slice(1)}
          </span>
        </div>
        {channelDescription && (
          <>
            <div className="h-6 w-px bg-white/5"></div>
            <div className="truncate text-sm font-medium text-gray-200">{channelDescription}</div>
          </>
        )}
        <div className="ml-auto flex items-center gap-2">
          <Button variant="none" size="icon2" className="text-gray-200 hover:text-gray-100">
            <Icons.HashtagWithSpeechBubble className="size-5 font-semibold"></Icons.HashtagWithSpeechBubble>
          </Button>
          <Button variant="none" size="icon2" className="text-gray-200 hover:text-gray-100">
            <Icons.Bell className="size-5 font-semibold"></Icons.Bell>
          </Button>
          <Button variant="none" size="icon2" className="text-gray-200 hover:text-gray-100">
            <Icons.Pin className="size-5 font-semibold"></Icons.Pin>
          </Button>
          <Button variant="none" size="icon2" className="text-gray-200 hover:text-gray-100">
            <Icons.People className="size-5 font-semibold"></Icons.People>
          </Button>
          <div className="relative mx-2 w-full">
            <Input
              placeholder="Search"
              className="w-36 pr-8 font-medium placeholder:text-gray-400"
            />

            <Icons.Spyglass className="pointer-events-none absolute top-1/2 right-2 size-4 -translate-y-1/2 text-gray-400" />
          </div>
          <Button variant="none" size="icon2" className="text-gray-200 hover:text-gray-100">
            <Icons.Inbox className="size-6 font-semibold"></Icons.Inbox>
          </Button>
          <Button variant="none" size="icon2" className="text-gray-200 hover:text-gray-100">
            <Icons.QuestionCircle className="size-5 font-semibold"></Icons.QuestionCircle>
          </Button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <Drawer
        open={isDrawerOpen}
        onOpenChange={handleDrawerChange}
        snapPoints={[1]}
        activeSnapPoint={1}
        fadeFromIndex={0}
      >
        <DrawerContent className="flex h-[95vh] flex-col bg-gray-900 text-white">
          <DrawerHeader className="relative flex-shrink-0 pb-2">
            <DrawerTitle className="mb-3 text-center text-lg font-semibold text-white">
              Navegación
            </DrawerTitle>
            <DrawerClose className="absolute top-4 right-4 rounded-full bg-gray-800 p-2 text-white transition-colors hover:bg-gray-700">
              <Icons.Close className="size-4" />
            </DrawerClose>
          </DrawerHeader>

          {/* Servidores en horizontal con estilo ServerLinks */}
          <div className="scrollbar-hide flex flex-shrink-0 gap-4 overflow-x-auto p-3">
            {servers.map((server) => {
              const isActive = activeServer.uniqueSlug === server.uniqueSlug;
              return (
                <button
                  key={server.uniqueSlug}
                  className={`group relative grid size-12 flex-shrink-0 place-content-center text-gray-100 transition-all duration-200 hover:rounded-2xl hover:text-white active:translate-y-px ${
                    isActive
                      ? `rounded-2xl ${server.color} text-white`
                      : `rounded-3xl bg-gray-700 text-gray-100 hover:rounded-2xl hover:${server.color} transition-all duration-200 hover:text-white`
                  }`}
                  onClick={() => {
                    if (server.isHome) {
                      navigate("/");
                      // NO cerrar drawer para navegación home - mantener abierto
                    } else {
                      navigate(`/${server.uniqueSlug}`);
                      // NO cerrar drawer para permitir navegación fluida entre servidores
                    }
                  }}
                  title={server.name}
                >
                  {/* Indicador lateral activo - mejorado */}
                  <div
                    className={`absolute -bottom-5 left-1/2 origin-bottom -translate-x-1/2 -translate-y-1/2 transform rounded-t bg-white transition-all duration-200 ${
                      isActive ? "h-2 w-10 scale-100 opacity-100" : "scale-0 opacity-0"
                    } group-hover:h-8 group-hover:scale-100 group-hover:opacity-100`}
                  ></div>

                  {/* Contenido del servidor */}
                  <div
                    className={`relative size-full overflow-hidden transition-all duration-200 ${
                      isActive ? "rounded-2xl" : "rounded-3xl group-hover:rounded-2xl"
                    }`}
                  >
                    {server.isHome ? (
                      <div className="flex size-full items-center justify-center">
                        <Icons.Discord className="size-8" />
                      </div>
                    ) : (
                      <img src={server.img} alt={server.name} className="size-full object-cover" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Divider */}
          <hr className="mx-4 mb-4 flex-shrink-0 border-gray-700" />

          {/* Contenido del Sidebar - Scrollable */}
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
            {/* Header del servidor */}
            <div className="hover:bg-gray-550/16 flex min-h-12 flex-shrink-0 cursor-pointer items-center gap-2 border-b border-gray-400/5 px-4 font-semibold shadow transition-colors">
              {activeServer.isHome ? (
                <>
                  <div className="relative size-4">
                    <Icons.Verified className="text-gray-550 absolute size-4" />
                    <Icons.Check className="absolute size-4" />
                  </div>
                  Discord Home
                  <Icons.Chevron className="ml-auto size-4.5 opacity-80" />
                </>
              ) : (
                <>{getServerName(activeServer.uniqueSlug)}</>
              )}
            </div>

            {/* Lista de canales - Scrollable */}
            <div className="flex-1 overflow-y-auto px-2">
              <DrawerSidebarContent
                context={activeServer.isHome ? "home" : "server"}
                serverSlug={activeServer.isHome ? undefined : activeServer.uniqueSlug}
                onChannelClick={() => handleDrawerChange(false)}
              />
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
