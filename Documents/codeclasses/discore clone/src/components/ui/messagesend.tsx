import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface MessageProps {
  id: number;
  user: string;
  avatarUrl: string;
  date: string;
  text: string;
  timestamp?: string;
}

// Componente para mensajes con avatar (primer mensaje del usuario o después de tiempo)
export function MessageWithAvatar({ user, avatarUrl, date, text, timestamp }: MessageProps) {
  return (
    <div className="group flex gap-4 px-4 py-2 hover:bg-gray-800/30">
      <Avatar className="mt-0.5 size-10">
        <AvatarImage src={avatarUrl} alt={user} />
        <AvatarFallback className="bg-gray-600 text-sm text-white">
          {user?.charAt(0)?.toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-1">
        <div className="flex items-baseline gap-2">
          <span className="cursor-pointer text-sm font-medium text-green-400 hover:underline">
            {user}
          </span>
          <span className="text-xs text-gray-400 hover:text-gray-300">{date}</span>
          {timestamp && (
            <span className="text-xs text-gray-500 opacity-0 transition-opacity group-hover:opacity-100">
              {timestamp}
            </span>
          )}
        </div>
        <p className="text-sm leading-relaxed break-words text-gray-200">{text}</p>
      </div>
    </div>
  );
}

// Componente para mensajes simples (mismo usuario, secuencial)
export function MessageSimple({
  text,
  timestamp,
}: Pick<MessageProps, "text"> & { timestamp?: string }) {
  return (
    <div className="group relative flex gap-4 px-4 py-0.5 hover:bg-gray-800/30">
      {/* Espacio para avatar pero invisible */}
      <div className="size-10 flex-shrink-0">
        {timestamp && (
          <span className="absolute top-1 left-2 text-xs text-gray-500 opacity-0 transition-opacity group-hover:opacity-100">
            {timestamp}
          </span>
        )}
      </div>
      <div className="flex-1">
        <p className="text-sm leading-relaxed break-words text-gray-200">{text}</p>
      </div>
    </div>
  );
}

// Componente legacy para compatibilidad (se puede eliminar después)
interface MessageSendProps {
  avatar?: string;
  name?: string;
  date?: string;
  time?: string;
  message?: string;
  variant?: "profile" | "simple";
}

export function SendMessage({
  avatar,
  name,
  date,
  time,
  message,
  variant = "profile",
}: MessageSendProps) {
  if (variant === "profile") {
    return (
      <MessageWithAvatar
        id={0}
        user={name || "Unknown"}
        avatarUrl={avatar || ""}
        date={date || ""}
        text={message || ""}
        timestamp={time}
      />
    );
  }

  return <MessageSimple text={message || ""} timestamp={time} />;
}

export default SendMessage;
