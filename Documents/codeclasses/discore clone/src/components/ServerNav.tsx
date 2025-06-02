import { ServerLinks } from "./ui/server-link";
import * as Icons from "./icons-d/icons";
import { useLocation, useNavigate } from "react-router-dom";
import React from "react";

// Notes: Componente de navegación de servidores
// Goal: Renderizar la barra lateral con los enlaces de servidores disponibles

// Notes: Componente especial para el link del home que detecta rutas home vs servidor
// Goal: Mantener activo el home cuando navegamos por sus canales
function HomeServerLink({
  activeColor = "bg-brand",
  hoverColor = "hover:bg-brand",
  children,
}: {
  activeColor?: string;
  hoverColor?: string;
  children: React.ReactNode;
}) {
  const location = useLocation();
  const navigate = useNavigate();

  // Una ruta es de HOME si NO coincide con el patrón de servidor: /:serverSlug/:channelName o /:serverSlug
  const isHomeRoute =
    !location.pathname.match(/^\/[^\/]+(?:\/[^\/]+)?$/) || location.pathname === "/";

  // Más específico: si la URL tiene exactamente el patrón /palabra o /palabra/palabra, podría ser servidor
  // Pero si es solo "/" definitivamente es home
  const isServerRoute = location.pathname.match(
    /^\/(?:tailwind-css|tailwind-css-2|champion-league|champion-league-2|art-design)(?:\/|$)/
  );
  const finalIsHomeRoute = !isServerRoute;

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div
      onClick={handleClick}
      className={
        `group relative grid size-12 cursor-pointer place-content-center text-gray-100 transition-all duration-200 hover:rounded-2xl hover:text-white active:translate-y-px ` +
        (finalIsHomeRoute
          ? `rounded-2xl ${activeColor} text-white`
          : `rounded-3xl bg-gray-700 text-gray-100 hover:rounded-2xl ${hoverColor} transition-all duration-200 hover:text-white`)
      }
    >
      <div
        className={`absolute top-1/2 -left-3 h-5 w-1 origin-left -translate-y-1/2 rounded-r bg-white transition-all duration-200 ${
          finalIsHomeRoute ? "h-10 scale-100 opacity-100" : "scale-0 opacity-0"
        } group-hover:scale-100 group-hover:opacity-100`}
      ></div>
      <div
        className={
          `relative size-full overflow-hidden transition-all duration-200 ` +
          (finalIsHomeRoute ? "rounded-2xl" : "rounded-3xl group-hover:rounded-2xl")
        }
      >
        {children}
      </div>
    </div>
  );
}

// Servers data
const servers = [
  {
    uniqueSlug: "tailwind-css",
    dataKey: "tailwind-css",
    img: "/images/d-logos/tailwind.png",
    name: "S4",
    color: "bg-brand",
  },
  {
    uniqueSlug: "champion-league",
    dataKey: "champion-league",
    img: "/images/d-logos/addi.png",
    name: "S1",
    color: "bg-[#1C67D8]",
  },
  {
    uniqueSlug: "art-design",
    dataKey: "art-design",
    img: "/images/d-logos/brand.png",
    name: "S2",
    color: "bg-brand",
  },
  {
    uniqueSlug: "tailwind-css-2",
    dataKey: "tailwind-css",
    img: "/images/d-logos/face.png",
    name: "S3",
    color: "bg-green-800",
  },
  {
    uniqueSlug: "champion-league-2",
    dataKey: "champion-league",
    img: "/images/d-logos/perzcool.png",
    name: "S5",
    color: "bg-brand",
  },
];

export function ServerNav() {
  return (
    <div className="space-y-2 overflow-y-scroll bg-gray-900 p-3">
      <HomeServerLink activeColor="bg-brand" hoverColor="hover:bg-brand">
        <Icons.Discord className="size-8" />
      </HomeServerLink>
      <hr className="mx-2 border-t-2 border-t-white/6" />

      {/* Server Links  */}
      {servers.map((server) => (
        <ServerLinks
          key={server.uniqueSlug}
          to={`/${server.uniqueSlug}`}
          activeColor={server.color}
          hoverColor={server.color}
        >
          <img src={server.img} alt={server.name} />
        </ServerLinks>
      ))}
    </div>
  );
}
