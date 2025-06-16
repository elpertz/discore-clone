# 🎮 Discord Clone - Complete Implementation

A fully-featured Discord clone built with React, TypeScript, and Tailwind CSS. Features responsive design, mobile-first navigation, realistic messaging system, and seamless server/channel management.

![Discord Clone](https://img.shields.io/badge/Status-Complete-brightgreen)
![React](https://img.shields.io/badge/React-19+-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8+-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1+-06B6D4)
![Vite](https://img.shields.io/badge/Vite-6.3+-646CFF)

## ✨ Features

### 📱 **Mobile-First Design**

- **Responsive Drawer Navigation**: Full-screen mobile drawer with server and channel navigation
- **Touch-Optimized**: Drag-to-close, snap points, and smooth animations
- **Persistent State**: Drawer state maintained across navigation using sessionStorage
- **Hidden Scrollbars**: Clean horizontal server navigation without visible scrollbars

### 🏠 **Advanced Navigation System**

- **Clean URLs**: `/server/channel` structure with semantic routing
- **Smart Context Switching**: Automatic home ↔ server mode detection
- **Unique Slug Handling**: Resolves duplicate server names (`tailwind-css-2`)
- **Active State Management**: Visual feedback with animated indicators

### 💬 **Discord-Style Messaging**

- **Smart Message Grouping**: Consecutive same-user messages grouped automatically
- **Local Avatar System**: 12 unique avatars stored locally, no external dependencies
- **Dual Component System**: MessageWithAvatar vs MessageSimple for performance
- **Dynamic Timestamps**: Realistic time generation for messages

### 🎯 **Channel & Server Management**

- **Dynamic Descriptions**: Context-aware channel descriptions from JSON data
- **Unread Indicators**: Visual markers for unread channels with sidebar positioning
- **Collapsible Categories**: Toggle channel categories with smooth animations
- **Welcome States**: Beautiful empty states when no messages exist

### 🎨 **Modern UI/UX**

- **Dark Theme**: Discord-inspired color scheme with custom gray palette
- **Smooth Animations**: Polished transitions using Tailwind CSS animations
- **Server Icons**: Custom server avatars with hover states and active indicators
- **Search Integration**: Built-in search functionality in desktop header

### 🔧 **Technical Excellence**

- **Full TypeScript**: Complete type safety with proper interfaces
- **Zero Errors**: Clean compilation with no TypeScript or linting errors
- **Performance Optimized**: Efficient rendering and state management
- **Component Architecture**: Reusable, maintainable component structure

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/discord-clone.git
cd discord-clone

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

## 🏗️ Project Architecture

### 📁 Directory Structure

```
discord-clone/
├── public/
│   ├── avatars/Avatar/          # Local avatar images (Image-60.png to Image-60-12.png)
│   └── images/d-logos/          # Server logos and branding assets
├── src/
│   ├── components/
│   │   ├── ui/                  # Base UI components
│   │   │   ├── messagesend.tsx  # MessageWithAvatar & MessageSimple
│   │   │   ├── drawer.tsx       # Mobile drawer component (Vaul)
│   │   │   ├── button.tsx       # Reusable button component
│   │   │   └── server-link.tsx  # Server navigation links
│   │   ├── icons-d/             # Custom Discord-style icons
│   │   │   └── icons.tsx        # Icon components library
│   │   ├── ChannelView.tsx      # Main channel content with mobile drawer
│   │   ├── ServerNav.tsx        # Desktop server navigation sidebar
│   │   └── Sidebar.tsx          # Channel sidebar with context switching
│   ├── pages/
│   │   ├── Home.tsx             # Home/DM context handler
│   │   └── ServerDynamic.tsx    # Server context with slug mapping
│   ├── assets/
│   │   ├── data.js              # Server/channel configurations with Faker.js
│   │   └── data.d.ts            # TypeScript type definitions
│   ├── lib/                     # Utility functions and helpers
│   └── entry/                   # Application entry point
├── components.json              # Shadcn/ui configuration
├── tsconfig.json                # TypeScript configuration
└── vite.config.ts               # Vite build configuration
```

### 🔄 Component Flow

```
App.tsx
├── ServerNav (desktop only)
└── Routes
    ├── Home.tsx
    │   ├── Sidebar (context: "home")
    │   └── ChannelView
    │       └── ChannelHeader (mobile drawer)
    └── ServerDynamic.tsx
        ├── Sidebar (context: "server")
        └── ChannelView
            └── ChannelHeader (mobile drawer)
```

### 📱 Mobile Drawer Architecture

```
ChannelHeader
└── Drawer (Vaul)
    ├── DrawerHeader (title + close button)
    ├── Server Navigation (horizontal scroll)
    ├── Divider
    └── DrawerSidebarContent
        ├── Server Header
        └── Channel List (scrollable)
            └── DrawerChannelLink (auto-close on click)
```

## 🆕 Version History

### **v3.0.0 - Mobile-First Complete** ✨

- ✅ **Mobile Drawer Navigation**: Full-screen drawer with server/channel navigation
- ✅ **Persistent Drawer State**: SessionStorage maintains state across navigation
- ✅ **Touch Optimizations**: Drag-to-close, snap points, smooth animations
- ✅ **Server Indicator Enhancement**: Bottom-positioned with horizontal expansion
- ✅ **Scrollbar Hiding**: Clean horizontal navigation without visible scrollbars
- ✅ **Navigation Bug Fixes**: Resolved duplicate server selection issues
- ✅ **Responsive Improvements**: Hidden desktop sidebar on mobile, drawer-only navigation

### **v2.1.1 - Routing & Navigation**

- ✅ **URL Conflict Resolution**: Fixed home vs server routing ambiguity
- ✅ **Clean Home URLs**: `/home/:channelName` pattern implementation
- ✅ **Route Prioritization**: Specific routes prevent conflicts
- ✅ **Navigation Consistency**: Seamless context switching

### **v2.1.0 - Messaging System**

- ✅ **Discord-Style Grouping**: Smart consecutive message detection
- ✅ **Local Avatar System**: 12 unique avatars, zero external dependencies
- ✅ **Component Architecture**: MessageWithAvatar vs MessageSimple split
- ✅ **TypeScript Compliance**: Zero compilation errors
- ✅ **Faker.js Updates**: Modern API usage

### **v2.0.0 - Clean URL Foundation**

- ✅ **Slug-Based URLs**: Semantic routing without IDs
- ✅ **Server Management**: Unique slug handling with duplicates
- ✅ **Context System**: Home ↔ Server transitions
- ✅ **Dynamic Content**: Channel descriptions from data

## 🛠️ Tech Stack

### **Core Technologies**

- **React 19**: Latest React with concurrent features
- **TypeScript 5.8**: Full type safety and modern syntax
- **Vite 6.3**: Lightning-fast build tool and dev server
- **React Router 7.6**: Advanced routing with dynamic parameters

### **Styling & UI**

- **Tailwind CSS 4.1**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **Vaul**: Mobile drawer component for touch interactions
- **Lucide React**: Modern icon library

### **Development Tools**

- **ESLint**: Code quality and consistency
- **TypeScript**: Static type checking
- **Vite**: Fast development and optimized builds

## 🎯 URL Structure & Routing

### Home Routes (Discord Home)

```
/                           # Home dashboard
/home/welcome              # Welcome channel
/home/announcements        # Announcements channel
/home/general             # General home channel
```

### Server Routes

```
/tailwind-css             # Tailwind CSS server overview
/tailwind-css/general     # General channel in Tailwind server
/art-design/character-design  # Character design channel
/champion-league/results  # Results channel
```

### Duplicate Server Handling

```
/tailwind-css             # Primary Tailwind server
/tailwind-css-2           # Secondary Tailwind server (same data)
/champion-league          # Primary Champion League
/champion-league-2        # Secondary Champion League (same data)
```

## 🎨 Customization Guide

### Adding New Servers

Edit `src/assets/data.js`:

```javascript
export default {
  "my-server": {
    label: "My Awesome Server",
    categories: [
      {
        id: 1,
        label: "General",
        channels: [
          {
            id: 1,
            label: "welcome",
            description: "Welcome to our server!",
            icon: "Book",
            unread: false,
            messages: [],
          },
        ],
      },
    ],
  },
};
```

### Adding Server to Navigation

Update `src/components/ServerNav.tsx`:

```javascript
const servers = [
  {
    uniqueSlug: "my-server",
    dataKey: "my-server",
    img: "/images/d-logos/my-logo.png",
    name: "My Server",
    color: "bg-purple-600",
  },
];
```

### Custom Icons

Add to `src/components/icons-d/icons.tsx`:

```javascript
export function MyIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      {/* Your SVG path */}
    </svg>
  );
}
```

## 📱 Mobile Features

### Drawer Navigation

- **Full-Screen Experience**: 95vh height with snap points
- **Server Selection**: Horizontal scrollable server list
- **Channel Navigation**: Scrollable channel list with categories
- **Auto-Close**: Channels close drawer, servers keep it open
- **Persistent State**: Maintains open/closed state across navigation

### Touch Interactions

- **Drag to Close**: Natural mobile gesture support
- **Smooth Animations**: 200ms transitions for all interactions
- **Visual Feedback**: Active states and hover effects
- **Optimized Scrolling**: Hidden scrollbars with smooth scrolling

## 🔧 Development

### Available Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm preview      # Preview production build
pnpm lint         # Run ESLint
pnpm type-check   # Run TypeScript checks
```

### Code Quality

- **TypeScript Strict Mode**: Full type safety enabled
- **ESLint Configuration**: Consistent code style
- **Zero Warnings**: Clean compilation output
- **Component Documentation**: Inline comments for all major functions

## 🚀 Deployment

### Build Optimization

- **Tree Shaking**: Unused code elimination
- **Code Splitting**: Automatic route-based splitting
- **Asset Optimization**: Image and CSS optimization
- **Modern Bundles**: ES2020+ target for modern browsers

### Recommended Hosting

- **Vercel**: Zero-config deployment with React Router support
- **Netlify**: SPA redirect rules for client-side routing
- **GitHub Pages**: Static hosting with proper routing setup

## 📄 License

MIT License - feel free to use this project for learning or as a foundation for your own Discord clone.

## 🤝 Contributing

This project is complete but open to improvements:

1. Fork the repository
2. Create a feature branch
3. Make your changes with proper TypeScript types
4. Test on both desktop and mobile
5. Submit a pull request

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**
