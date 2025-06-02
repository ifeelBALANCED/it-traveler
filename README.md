# IT Traveler 🌍

A modern travel companion application for tech enthusiasts, built with Vue 3, TypeScript, and Bun.

## 🚀 Features

- Interactive map interface with Leaflet
- User authentication and profile management
- Location markers and travel tracking
- Responsive design with Tailwind CSS
- Type-safe API integration with Orval
- Comprehensive testing setup (Unit + E2E)

## 📋 Prerequisites

- Node.js >= 22.0.0
- Bun package manager
- Git

## 🛠️ Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/it-traveler.git
cd it-traveler
```

2. Install dependencies:

```bash
bun install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

Edit `.env` with your configuration.

## 🏗️ Development

Start the development server:

```bash
bun dev
```

The application will be available at `http://localhost:5173`.

## 🧪 Testing

Run unit tests:

```bash
bun test:unit
```

Run E2E tests:

```bash
bun test:e2e
```

## 🏭 Building

Build for production:

```bash
bun build
```

Preview production build:

```bash
bun preview
```

## 📝 Code Quality

Lint code:

```bash
bun lint
```

Format code:

```bash
bun format
```

Type checking:

```bash
bun type-check
```

## 🔄 API Generation

Generate API client from OpenAPI spec:

```bash
bun generate:api
```

## 🏗️ Project Structure

```
src/
├── app/          # Application setup and configuration
├── shared/       # Shared components, utilities, and types
├── entities/     # Business entities
├── features/     # Feature modules
├── widgets/      # Reusable UI widgets
└── pages/        # Page components
```

## 🛠️ Tech Stack

- **Framework**: Vue 3
- **Language**: TypeScript
- **Build Tool**: Vite
- **Package Manager**: Bun
- **Styling**: Tailwind CSS
- **State Management**: Pinia
- **Routing**: Vue Router
- **Form Validation**: Vee-Validate + Valibot
- **Maps**: Leaflet
- **Testing**: Vitest + Playwright
- **API Client**: Orval
- **Linting**: ESLint
- **Formatting**: Prettier
- **Git Hooks**: Lefthook

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
