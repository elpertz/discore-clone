# 🎮 Discord Clone

A modern Discord clone built with React, TypeScript, and Tailwind CSS featuring clean URLs, responsive design, and intuitive navigation.

![Discord Clone](https://img.shields.io/badge/Status-Active-brightgreen)
![React](https://img.shields.io/badge/React-18+-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8+-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1+-06B6D4)

## ✨ Features

### 🏠 **Home & Server Navigation**

- **Clean URLs**: `/server/channel` instead of `/server/123/channel`
- **Smart Context**: Automatic switching between home and server modes
- **Unique Slugs**: Handles duplicate server names elegantly (`server-2`)

### 🎯 **Channel Management**

- **Dynamic Descriptions**: Contextual channel descriptions from JSON data
- **Unread Indicators**: Visual markers for unread channels
- **Category Toggles**: Collapsible channel categories
- **Active States**: Clear navigation state indication

### 🎨 **Modern UI/UX**

- **Responsive Sidebar**: Adaptive to different screen sizes
- **Server Icons**: Custom server avatars and branding
- **Dark Theme**: Discord-inspired color scheme
- **Smooth Animations**: Polished transitions and interactions

### 🔧 **Technical Excellence**

- **TypeScript**: Full type safety and IntelliSense
- **React Router**: Advanced routing with dynamic parameters
- **Component Architecture**: Reusable and maintainable components
- **Performance**: Optimized rendering and state management

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
│   ├── icons-d/        # Custom Discord-style icons
│   ├── ChannelView.tsx # Main channel content area
│   ├── ServerNav.tsx   # Server navigation sidebar
│   └── Sidebar.tsx     # Channel sidebar with smart context
├── pages/              # Page components
│   ├── Home.tsx        # Home/DM context
│   └── ServerDynamic.tsx # Server context handler
├── assets/             # Static assets and data
│   └── data.json       # Server and channel configurations
├── lib/                # Utility functions
└── entry/              # Application entry point
```

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
