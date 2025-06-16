// src/components/Sidebar.tsx
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { ChevronDownIcon } from "lucide-react";
import * as Icons from "./icons-d/icons";
import data from "../assets/data.js";
import { useState } from "react";
import type { DataStructure } from "../assets/data.d";

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
 * Gets the dataKey of the server based on the uniqueSlug
 * Maps uniqueSlug to semantic names to access the correct data
 */
function getServerDataKey(uniqueSlug?: string): keyof DataStructure {
  return uniqueSlug ? serverSlugMapping[uniqueSlug] || "tailwind-css" : "tailwind-css";
}

interface SidebarProps {
  context: "home" | "server"; // ← Esto define el comportamiento
  serverSlug?: string; // ← uniqueSlug del servidor (ej: "tailwind-css", "art-design")
  className?: string;
}

export function Sidebar({ context, serverSlug, className }: SidebarProps) {
  // useState debe estar DENTRO del componente
  const [closedCategories, setClosedCategories] = useState<string[]>([]);
  const location = useLocation();

  // Obtener los datos del servidor correcto
  const serverKey = context === "home" ? "discord-home" : getServerDataKey(serverSlug);
  const serverData = typedData[serverKey];

  /**
   * Toggles the open/closed state of a category by adding or removing its ID from the closedCategories array
   */
  const toggleCategory = (categoryId: string | number) => {
    const idToString = categoryId.toString();
    setClosedCategories(
      (prev) =>
        prev.includes(idToString)
          ? prev.filter((id) => id !== idToString) // Si está cerrada, la abrimos
          : [...prev, idToString] // Si está abierta, la cerramos
    );
  };
  /**
   * Checks if a category is closed by verifying if its ID exists in the closedCategories array
   */
  const isCategoryClosed = (categoryId: string | number) => {
    return closedCategories.includes(categoryId.toString());
  };

  /**
   * Determines the visual state of a channel (active, unread, or read) based on the current route and channel properties
   */
  const getChannelState = (channel: any) => {
    const channelPath = channel.label.toLowerCase().replace(/\s+/g, "-");
    const to = context === "home" ? `/home/${channelPath}` : `/${serverSlug}/${channelPath}`;
    const isActive = location.pathname === to;
    return isActive ? "active" : channel.unread ? "inactiveUnread" : "inactiveRead";
  };

  return (
    <div className={`flex flex-col ${className || "w-60 bg-gray-800"}`}>
      {/* Header dinámico según el contexto */}
      <div className="hover:bg-gray-550/16 flex min-h-12 cursor-pointer items-center gap-2 border-b border-gray-400/5 px-4 font-semibold shadow transition-colors">
        {context === "home" ? (
          <>
            <div className="relative size-4">
              <Icons.Verified className="text-gray-550 absolute size-4" />
              <Icons.Check className="absolute size-4" />
            </div>
            {serverData.label}
            <Icons.Chevron className="ml-auto size-4.5 opacity-80" />
          </>
        ) : (
          <>{serverData.label}</>
        )}
      </div>

      {/* Lista de canales usando los datos del servidor correcto */}
      <div className="flex flex-1 flex-col gap-1 overflow-y-auto px-2">
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

            {/* Show channels: all if open, only unread if closed */}
            <div className="space-y-0.5 px-1">
              {categorie.channels
                .filter((channel: any) => {
                  // Si la categoría está abierta, mostrar todos los canales
                  if (!isCategoryClosed(categorie.id)) return true;

                  // Si está cerrada, solo mostrar los canales unread
                  return getChannelState(channel) === "inactiveUnread";
                })
                .map((channel: any) => (
                  <ChannelLink
                    key={channel.id}
                    channel={channel}
                    context={context}
                    serverSlug={serverSlug}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface ChannelLinkProps {
  channel: any;
  context: "home" | "server";
  serverSlug?: string;
}

/**
 * Smart link that builds URL based on context
 * Reuses the same component for home and server
 */
function ChannelLink({ channel, context, serverSlug }: ChannelLinkProps) {
  const location = useLocation();
  // Mapeo de iconos
  const iconMap: Record<string, keyof typeof Icons> = {
    Book: "Book",
    Speakerphone: "Speakerphone",
  };

  const Icon = channel.icon
    ? Icons[iconMap[channel.icon] as keyof typeof Icons] || Icons.Hashtag
    : Icons.Hashtag;

  // Build URL based on context (home vs server)
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
        return `${baseStyles} text-white hover:bg-gray-550/50 `;
      case "inactiveRead":
        return `${baseStyles} text-gray-200 hover:bg-gray-550/50 hover:text-white`;
      default:
        return baseStyles;
    }
  };

  return (
    <Link to={to} className={getChannelStyles(state)}>
      <Icon className="size-5 text-gray-200" />
      {channel.label}
      {/* Indicador visual para unread */}

      <Icons.AddPerson className="ml-auto size-4 opacity-0 transition-opacity group-hover:opacity-70 hover:opacity-100" />
      {state === "inactiveUnread" && (
        <div className="absolute top-1/2 -left-1 h-2 w-0.5 origin-left -translate-y-1/2 scale-x-100 rounded-r-xs bg-gray-100" />
      )}
    </Link>
  );
}
