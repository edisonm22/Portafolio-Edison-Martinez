# Portfolio - Claude Code Context

## Tech Stack
- React 19 + TypeScript (strict mode)
- Vite + SWC (fast dev/build)
- Tailwind CSS v4 (`@tailwindcss/vite` plugin)
- Vitest (testing)
- ESLint

## Project Structure
```
src/
  components/
    layout/     # Navbar, Footer
    sections/   # Hero, Projects, Skills, Services, Contact, CV sub-sections
    ui/         # Input, Textarea, Select
  context/      # ThemeContext (dark/light mode)
  hooks/        # useScrollSpy, useTheme
  styles/       # globals.css (Tailwind v4 + custom classes)
  test/         # Test files (Hero.test.tsx)
```

## Architecture
- All components are TypeScript (`.tsx`)
- Sections use named exports
- UI components use default exports
- Theme via React Context (ThemeProvider wraps App)
- CSS: Tailwind v4 @theme in globals.css, no tailwind.config.js

## Commands
- `npm run dev` - Start dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npx tsc --noEmit` - TypeScript type check
- `npx vitest` - Run tests
- `npx serve -p 62850 dist/` - Serve dist on port 62850

## Conventions
- PascalCase for component filenames
- camelCase for hooks, utilities
- No default exports for section components
- No unused locals/params (tsconfig strict)
- No JSX comments
