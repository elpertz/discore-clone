# 🎮 Discord Clone

A modern Discord clone built with React, TypeScript, and Tailwind CSS featuring clean URLs, responsive design, intuitive navigation, and a realistic messaging system with local avatars.

![Discord Clone](https://img.shields.io/badge/Status-Active-brightgreen)
![React](https://img.shields.io/badge/React-18+-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8+-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1+-06B6D4)

## ✨ Features

### 🏠 **Home & Server Navigation**

- **Clean URLs**: `/server/channel` instead of `/server/123/channel`
- **Smart Context**: Automatic switching between home and server modes
- **Unique Slugs**: Handles duplicate server names elegantly (`server-2`)
- **Active State Management**: Visual feedback for current location

### 💬 **Realistic Messaging System**

- **Discord-Style Messages**: Smart message grouping (consecutive same-user messages)
- **Local Avatar System**: 12 unique avatars stored locally (`/public/avatars/Avatar/`)
- **MessageWithAvatar**: Full messages with user info and timestamps
- **MessageSimple**: Grouped messages without repetitive user info
- **Dynamic Content**: Faker.js integration for realistic message generation

### 🎯 **Channel Management**

- **Dynamic Descriptions**: Contextual channel descriptions from JSON data
- **Unread Indicators**: Visual markers for unread channels
- **Category Toggles**: Collapsible channel categories
- **Welcome Messages**: Beautiful empty state when no messages exist

### 🎨 **Modern UI/UX**

- **Responsive Sidebar**: Adaptive to different screen sizes
- **Server Icons**: Custom server avatars and branding
- **Dark Theme**: Discord-inspired color scheme
- **Smooth Animations**: Polished transitions and interactions
- **Search Integration**: Built-in search functionality

### 🔧 **Technical Excellence**

- **TypeScript**: Full type safety with proper interfaces and assertions
- **React Router**: Advanced routing with dynamic parameters
- **Component Architecture**: Reusable MessageWithAvatar/MessageSimple components
- **Performance**: Optimized rendering and state management
- **Error-Free**: Zero TypeScript compilation errors

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/elpertz/discore-clone.git
cd discore-clone

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Build for Production

```bash
# Build the project
pnpm build

# Preview production build
pnpm preview
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (Button, Input, etc.)
│   │   ├── messagesend.tsx # MessageWithAvatar & MessageSimple components
│   │   └── ...         # Other UI components
│   ├── icons-d/        # Custom Discord-style icons
│   ├── ChannelView.tsx # Main channel content area with message rendering
│   ├── ServerNav.tsx   # Server navigation sidebar with home detection
│   └── Sidebar.tsx     # Channel sidebar with smart context switching
├── pages/              # Page components
│   ├── Home.tsx        # Home/DM context with discord-home server
│   └── ServerDynamic.tsx # Server context handler with slug mapping
├── assets/             # Static assets and data
│   ├── data.js         # Server and channel configurations with Faker.js
│   └── data.d.ts       # TypeScript type definitions
├── lib/                # Utility functions
└── entry/              # Application entry point
public/
├── avatars/Avatar/     # Local avatar images (Image-60.png to Image-60-12.png)
└── images/             # Server logos and assets
```

## 🆕 Recent Updates

### **v2.1.0 - Messaging System Overhaul**

- ✅ **Discord-Style Message Grouping**: Smart consecutive message detection
- ✅ **Local Avatar System**: 12 unique avatars, no external dependencies
- ✅ **Component Split**: MessageWithAvatar vs MessageSimple for performance
- ✅ **TypeScript Fixes**: Zero compilation errors, proper type assertions
- ✅ **Faker.js Update**: Updated deprecated `userName()` to `username()`
- ✅ **Layout Consistency**: Fixed Home vs ServerDynamic layout differences

### **v2.0.0 - Clean URL Architecture**

- ✅ **URL Restructure**: Removed ID-based URLs, implemented slug system
- ✅ **Server Navigation**: Unique slug handling with duplicate resolution
- ✅ **Context Switching**: Seamless Home ↔ Server transitions
- ✅ **Channel Descriptions**: Dynamic descriptions from data source

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript 5.8
- **Styling**: Tailwind CSS 4.1, Radix UI
- **Routing**: React Router 7.6
- **Build Tool**: Vite 6.3
- **Code Quality**: ESLint, Prettier

## 🎯 URL Structure

### Home Routes

- `/` - Home dashboard
- `/:channelName` - Home channel (e.g., `/general`)

### Server Routes

- `/:serverSlug` - Server overview (e.g., `/tailwind-css`)
- `/:serverSlug/:channelName` - Server channel (e.g., `/art-design/character-design`)

### Unique Server Handling

- Primary: `/tailwind-css/general`
- Duplicate: `/tailwind-css-2/general`

## 🎨 Customization

### Adding New Servers

Edit `src/assets/data.json`:

```json
{
  "my-server": {
    "label": "My Awesome Server",
    "categories": [
      {
        "id": 1,
        "label": "General",
        "channels": [
          {
            "id": 1,
            "label": "welcome",
            "description": "Welcome to our server!",
            "icon": "Book"
          }
        ]
      }
    ]
  }
}
```

### Adding Server Navigation

Update `src/components/ServerNav.tsx`:

```typescript
const servers = [
  {
    uniqueSlug: "my-server",
    dataKey: "my-server",
    img: "/images/my-server-logo.png",
    name: "MS",
    color: "bg-purple-500",
  },
];
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🔗 Links

- **Live Demo**: [Coming Soon]
- **GitHub**: [https://github.com/elpertz/discore-clone](https://github.com/elpertz/discore-clone)
- **Issues**: [Report a Bug](https://github.com/elpertz/discore-clone/issues)

---

Built with ❤️ by [elpertz](https://github.com/elpertz)
