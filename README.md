# Todo List Application

This is a Vue 3 to-do list application using Vite as the build tool, Pinia for state management, Tailwind CSS for styling, and json-server for a mock API.

## Features

- Vue 3 Composition API
- State management using Pinia
- Router with Vue Router
- API communication using Axios
- Styling with Tailwind CSS
- Development server with Vite
- Mock API using json-server
- TypeScript support

## Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/)
- [Git](https://git-scm.com/)

## Getting Started

### Clone the Repository

To clone the repository, run the following command in your terminal:

```bash
git clone https://github.com/JSebasART/ToDo-List.git
cd todo-list
```

### Installation

After cloning the repository, install the dependencies using npm or yarn:

```bash
# Using npm
npm install
```

### Development Setup

Once the dependencies are installed, you can start the development server:

```bash
npm run dev
```

This will start the Vite development server, and the project will be available at \`http://localhost:5173/\` by default. The \`--host\` flag allows access from other devices in the network.

### Mock API Setup

The project uses \`json-server\` as a mock API. To start the mock server, run:

```bash
npx json-server --watch db.json --port 3000
```

This will serve the mock API on `http://localhost:3000/`.

### Production Build

To build the project for production, run:

```bash
npm run build
```

This will generate optimized production assets in the `dist` folder.

### Previewing the Production Build

After building the project, you can preview the production build locally using Vite's preview command:

```bash
npm run preview
```

The preview server will be available at \`http://localhost:4173/\`.

## Project Structure

```
├── src/
│   ├── assets/       # Static assets (images, fonts, etc.)
│   ├── components/   # Vue components
│   ├── store/        # Pinia stores
│   ├── views/        # Pages and views
│   ├── router/       # Vue Router setup
│   ├── App.vue       # Main App component
│   └── main.ts       # Application entry point
├── public/           # Public files
├── db.json           # Mock database for json-server
├── tailwind.config.js# Tailwind CSS configuration
├── vite.config.ts    # Vite configuration
└── package.json      # Project dependencies and scripts
```

## Scripts

- `npm run dev`: Start the development server with Vite.
- `npm run build`: Build the project for production.
- `npm run preview`: Preview the production build.
- `npx json-server --watch db.json --port 3000`: Start json-server as the mock API.

## Dependencies

- `vue`: The Vue.js framework.
- `pinia`: State management library for Vue.
- `vue-router`: Router for Vue.js.
- `axios`: Promise-based HTTP client for the browser and Node.js.
- `json-server`: A full fake REST API for testing.

## DevDependencies

- `vite`: A fast build tool for modern web projects.
- `tailwindcss`: A utility-first CSS framework.
- `typescript`: TypeScript support for the project.
- `@vitejs/plugin-vue`: Vue 3 plugin for Vite.
- `json-server`: Simple mock server for API calls.