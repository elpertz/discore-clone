/**
 * @fileoverview Data configuration for Discord clone
 * @typedef {import('./data.d.ts').DataStructure} DataStructure
 */
import { faker } from "@faker-js/faker";
import { format } from "date-fns";

function getMessages() {
  return [...Array(faker.number.int({ min: 7, max: 25 }))]
    .map(() => {
      let user = faker.internet.username();
      let avatarNumber = faker.number.int({ min: 1, max: 12 });
      let avatarUrl =
        avatarNumber === 1
          ? `/avatars/Avatar/Image-60.png`
          : `/avatars/Avatar/Image-60-${avatarNumber}.png`;

      return [...Array(faker.number.int({ min: 1, max: 4 }))].map(() => ({
        id: faker.number.int(),
        user,
        avatarUrl,
        date: format(new Date(faker.date.past()), "MM/dd/yyyy"),
        text: faker.lorem.sentences(faker.number.int({ min: 1, max: 3 })),
      }));
    })
    .flat();
}

export const data = {
  "discord-home": {
    label: "Discord Home",
    categories: [
      {
        id: 1,
        label: "",
        channels: [
          {
            id: 1,
            label: "welcome",
            icon: "Book",
            description: "Welcome to Discord! Start your journey here.",
            messages: getMessages(),
          },
          {
            id: 2,
            label: "announcements",
            icon: "Speakerphone",
            unread: true,
            description: "Important Discord updates and news",
            messages: getMessages(),
          },
        ],
      },
      {
        id: 2,
        label: "General",
        channels: [
          {
            id: 3,
            label: "general",
            description: "General conversations and community chat",
            messages: getMessages(),
          },
          {
            id: 4,
            label: "help",
            description: "Need help? Ask questions here!",
            messages: getMessages(),
          },
          {
            id: 5,
            label: "random",
            unread: true,
            description: "Random discussions and fun conversations",
            messages: getMessages(),
          },
        ],
      },
    ],
  },
  "tailwind-css": {
    label: "Tailwind CSS",
    categories: [
      {
        id: 1,
        label: "",
        channels: [
          {
            id: 1,
            label: "welcome",
            icon: "Book",
            description:
              "Welcome to the Tailwind CSS community! Get started with our utility-first CSS framework.",
            messages: getMessages(),
          },
          {
            id: 2,
            label: "announcements",
            icon: "Speakerphone",
            unread: true,
            description: "Stay updated with the latest Tailwind CSS news and updates",
            messages: getMessages(),
          },
        ],
      },
      {
        id: 2,
        label: "Tailwind CSS",
        channels: [
          {
            id: 3,
            label: "general",
            description: "General discussions about Tailwind CSS and web development",
            messages: getMessages(),
          },
          {
            id: 4,
            label: "plugins",
            unread: true,
            description: "Share and discover Tailwind CSS plugins",
            messages: getMessages(),
          },
          {
            id: 5,
            label: "help",
            messages: getMessages(),
          },
          {
            id: 6,
            label: "internals",
            unread: true,
            description: "Deep dive into Tailwind CSS internals and architecture",
            messages: getMessages(),
          },
        ],
      },
      {
        id: 3,
        label: "Tailwind Labs",
        channels: [
          {
            id: 7,
            label: "tailwind-ui",
            unread: true,
            description: "Official Tailwind UI components and templates",
            messages: getMessages(),
          },
          {
            id: 8,
            label: "headless-ui",
            messages: getMessages(),
          },
          {
            id: 9,
            label: "refactoring-ui",
            messages: getMessages(),
          },
          {
            id: 10,
            label: "heroicons",
            unread: true,
            description: "Beautiful hand-crafted SVG icons by the makers of Tailwind CSS",
            messages: getMessages(),
          },
        ],
      },
      {
        id: 4,
        label: "Off topic",
        channels: [
          {
            id: 11,
            label: "design",
            description: "Discuss design principles and trends",
            messages: getMessages(),
          },
          {
            id: 12,
            label: "development",
            unread: true,
            messages: getMessages(),
          },
          {
            id: 13,
            label: "random",
            description: "Casual conversations and fun discussions",
            messages: getMessages(),
          },
        ],
      },
      {
        id: 5,
        label: "Community",
        channels: [
          {
            id: 14,
            label: "jobs",
            unread: true,
            description: "Find Tailwind CSS related job opportunities",
            messages: getMessages(),
          },
          {
            id: 15,
            label: "showcase",
            description: "Show off your Tailwind CSS projects",
            messages: getMessages(),
          },
          {
            id: 16,
            label: "bots",
            unread: true,
            messages: getMessages(),
          },
        ],
      },
    ],
  },
  "champion-league": {
    label: "Champion League",
    categories: [
      {
        id: 1,
        label: "",
        channels: [
          {
            id: 1,
            label: "welcome",
            icon: "Book",
            description:
              "Welcome to the Champions League community! Join us for the ultimate European football experience.",
            messages: getMessages(),
          },
          {
            id: 2,
            label: "announcements",
            icon: "Speakerphone",
            unread: true,
            description: "Important updates and news about the Champions League",
            messages: getMessages(),
          },
        ],
      },
      {
        id: 2,
        label: "Match Center",
        channels: [
          {
            id: 3,
            label: "live-matches",
            unread: true,
            description: "Live match discussions and updates",
            messages: getMessages(),
          },
          {
            id: 4,
            label: "match-schedule",
            description: "Upcoming Champions League fixtures and schedules",
            messages: getMessages(),
          },
          {
            id: 5,
            label: "results",
            unread: true,
            messages: getMessages(),
          },
          {
            id: 6,
            label: "standings",
            description: "Current group standings and knockout stage brackets",
            messages: getMessages(),
          },
        ],
      },
      {
        id: 3,
        label: "Teams",
        channels: [
          {
            id: 7,
            label: "team-news",
            description: "Latest news and updates from all participating teams",
            messages: getMessages(),
          },
          {
            id: 8,
            label: "transfers",
            unread: true,
            messages: getMessages(),
          },
          {
            id: 9,
            label: "injuries",
            description: "Track player injuries and availability",
            messages: getMessages(),
          },
          {
            id: 10,
            label: "tactics",
            unread: true,
            description: "Discuss team strategies and formations",
            messages: getMessages(),
          },
        ],
      },
      {
        id: 4,
        label: "Community",
        channels: [
          {
            id: 11,
            label: "match-predictions",
            unread: true,
            description: "Share your predictions for upcoming matches",
            messages: getMessages(),
          },
          {
            id: 12,
            label: "fantasy-league",
            messages: getMessages(),
          },
          {
            id: 13,
            label: "memes",
            unread: true,
            description: "Football memes and humor",
            messages: getMessages(),
          },
        ],
      },
      {
        id: 5,
        label: "Media",
        channels: [
          {
            id: 14,
            label: "highlights",
            description: "Match highlights and memorable moments",
            messages: getMessages(),
          },
          {
            id: 15,
            label: "interviews",
            unread: true,
            messages: getMessages(),
          },
          {
            id: 16,
            label: "press-conferences",
            description: "Post-match press conferences and player interviews",
            messages: getMessages(),
          },
        ],
      },
    ],
  },
  "art-design": {
    label: "Art & Design",
    categories: [
      {
        id: 1,
        label: "",
        channels: [
          {
            id: 1,
            label: "welcome",
            icon: "Book",
            description:
              "Welcome to the Art & Design community! A space for artists and designers to connect and share their work.",
            messages: getMessages(),
          },
          {
            id: 2,
            label: "announcements",
            icon: "Speakerphone",
            unread: true,
            description: "Community announcements and important updates",
            messages: getMessages(),
          },
        ],
      },
      {
        id: 2,
        label: "Digital Art",
        channels: [
          {
            id: 3,
            label: "digital-painting",
            unread: true,
            description: "Share your digital paintings and techniques",
            messages: getMessages(),
          },
          {
            id: 4,
            label: "illustration",
            description: "Digital and traditional illustration discussions",
            messages: getMessages(),
          },
          {
            id: 5,
            label: "character-design",
            unread: true,
            messages: getMessages(),
          },
          {
            id: 6,
            label: "concept-art",
            description: "Concept art for games, movies, and other media",
            messages: getMessages(),
          },
        ],
      },
      {
        id: 3,
        label: "Traditional Art",
        channels: [
          {
            id: 7,
            label: "sketching",
            description: "Share your sketches and drawing techniques",
            messages: getMessages(),
          },
          {
            id: 8,
            label: "painting",
            unread: true,
            description: "Traditional painting techniques and materials",
            messages: getMessages(),
          },
          {
            id: 9,
            label: "drawing",
            messages: getMessages(),
          },
          {
            id: 10,
            label: "sculpture",
            unread: true,
            description: "Sculpture and 3D art discussions",
            messages: getMessages(),
          },
        ],
      },
      {
        id: 4,
        label: "Design",
        channels: [
          {
            id: 11,
            label: "graphic-design",
            unread: true,
            description: "Graphic design principles and projects",
            messages: getMessages(),
          },
          {
            id: 12,
            label: "ui-ux",
            description: "User interface and experience design discussions",
            messages: getMessages(),
          },
          {
            id: 13,
            label: "typography",
            unread: true,
            messages: getMessages(),
          },
          {
            id: 14,
            label: "branding",
            description: "Brand identity and logo design",
            messages: getMessages(),
          },
        ],
      },
      {
        id: 5,
        label: "Resources",
        channels: [
          {
            id: 15,
            label: "tutorials",
            description: "Share and find art and design tutorials",
            messages: getMessages(),
          },
          {
            id: 16,
            label: "references",
            unread: true,
            messages: getMessages(),
          },
          {
            id: 17,
            label: "tools",
            description: "Discuss art and design tools and software",
            messages: getMessages(),
          },
          {
            id: 18,
            label: "software",
            unread: true,
            messages: getMessages(),
          },
        ],
      },
      {
        id: 6,
        label: "Community",
        channels: [
          {
            id: 19,
            label: "art-share",
            unread: true,
            description: "Share your artwork with the community",
            messages: getMessages(),
          },
          {
            id: 20,
            label: "critique",
            description: "Get feedback on your artwork",
            messages: getMessages(),
          },
          {
            id: 21,
            label: "collaboration",
            unread: true,
            messages: getMessages(),
          },
          {
            id: 22,
            label: "events",
            messages: getMessages(),
          },
        ],
      },
      {
        id: 7,
        label: "Inspiration",
        channels: [
          {
            id: 23,
            label: "galleries",
            messages: getMessages(),
          },
          {
            id: 24,
            label: "artists",
            unread: true,
            messages: getMessages(),
          },
          {
            id: 25,
            label: "trends",
            messages: getMessages(),
          },
          {
            id: 26,
            label: "exhibitions",
            unread: true,
            messages: getMessages(),
          },
        ],
      },
    ],
  },
};

// Export data for use in components
export default data;
