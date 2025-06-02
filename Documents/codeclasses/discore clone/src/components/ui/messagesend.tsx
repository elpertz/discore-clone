import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
  if (variant === "profile")
    return (
      <div className="flex gap-4 px-4 py-1 hover:bg-gray-800/30">
        <Avatar className="size-10">
          <AvatarImage src={avatar} />
          <AvatarFallback>{name?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="space-y-2">
          <p className="inline-flex items-baseline gap-2 font-medium">
            <span className="text-sm text-green-500">{name}</span>
            <span className="text-xs text-gray-400"> {date}</span>
            <span className="text-xs text-gray-400"> {time}</span>
          </p>
          <p className="text-gray-200">{message}</p>
        </div>
      </div>
    );

  return (
    <div className="relative mt-1 flex gap-2 px-4 py-1 hover:bg-gray-800/30">
      <span className="absolute top-1.5 text-xs text-gray-400">{time}</span>
      <p className="pl-14 text-gray-200">{message}</p>
    </div>
  );
}

export default SendMessage;
