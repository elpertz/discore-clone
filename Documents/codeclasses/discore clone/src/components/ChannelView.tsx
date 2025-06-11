import { MessageWithAvatar, MessageSimple } from "./ui/messagesend";
import { Button } from "./ui/button";
import * as Icons from "./icons-d/icons";
import { Input } from "./ui/input";

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
  messages?: Message[];
}

export default function ChannelView({
  channelName,
  channelDescription,
  serverSlug, // TODO: Will be used for server-specific features (member list, permissions, etc.)
  messages = [],
}: ChannelViewProps) {
  // Función para determinar si mostrar avatar (Discord logic)
  const shouldShowAvatar = (currentMessage: Message, previousMessage?: Message): boolean => {
    if (!previousMessage) return true; // Primer mensaje siempre muestra avatar

    // Mostrar avatar si es diferente usuario
    if (currentMessage.user !== previousMessage.user) return true;

    // TODO: Agregar lógica de tiempo (si pasaron más de 7 minutos)
    // const timeDiff = new Date(currentMessage.date).getTime() - new Date(previousMessage.date).getTime();
    // if (timeDiff > 7 * 60 * 1000) return true; // 7 minutos

    return false;
  };

  return (
    <>
      <div className="flex h-12 items-center justify-between gap-2 border-b border-gray-400/5 px-3 font-semibold shadow-sm transition-colors">
        <div className="flex items-center gap-2">
          <Icons.Hashtag className="size-5 font-semibold text-gray-400"></Icons.Hashtag>
          <span className="text-sm font-semibold whitespace-nowrap">
            {channelName.charAt(0).toUpperCase() + channelName.slice(1)}{" "}
            {/* chartAt hace que filtre el primer caracter y el toUpperCase lo pone en mayuscula y .slice(1) agrega el resto de la palabra */}
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

      {/* Contenedor principal con scroll vertical */}
      <div className="flex-1 overflow-y-auto">
        <div className="pb-4">
          {/* Verifica si hay mensajes para mostrar */}
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
            <div className="flex h-full items-center justify-center text-gray-400">
              <div className="text-center">
                <Icons.Hashtag className="mx-auto mb-4 size-16 text-gray-600" />
                <h3 className="mb-2 text-xl font-semibold">Welcome to #{channelName}</h3>
                <p className="text-gray-500">This is the start of the #{channelName} channel.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
