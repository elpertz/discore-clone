import SendMessage from "./ui/messagesend";
import { Button } from "./ui/button";
import * as Icons from "./icons-d/icons";
import { Input } from "./ui/input";

interface ChannelViewProps {
  channelName: string;
  channelDescription?: string;
  serverSlug?: string;
}

export default function ChannelView({
  channelName,
  channelDescription,
  serverSlug,
}: ChannelViewProps) {
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
      <div className="flex-1 space-y-2 overflow-y-scroll py-3">
        {[...Array(32)].map((_, index) => {
          const isProfile = index % 3 === 0;
          return (
            <SendMessage
              key={index}
              variant={isProfile ? "profile" : "simple"}
              avatar={isProfile ? "/images/pertz.png" : undefined}
              name={isProfile ? "Pertz" : undefined}
              date={isProfile ? "01/15/2025" : undefined}
              time={`${1 + index}:${12 + index} pm`}
              message={
                isProfile
                  ? "Hey @Leon Strydom, I've been making some updates to my personal brand design system (mostly typography and colors) and will release an update soon."
                  : `Message number ${index + 1} with simple variant`
              }
            />
          );
        })}
      </div>
    </>
  );
}
