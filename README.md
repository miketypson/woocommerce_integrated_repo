# Privacy-Focused Website

This is a privacy-focused website built with Next.js, featuring a blue and white color scheme (RAL 5005) and showcasing privacy products including secure phones with GrapheneOS, faraday bags, and prepaid data SIMs.

## Features

- Privacy-focused product pages with detailed specifications
- App selection functionality for phones
- Open-source transparency with links to GrapheneOS
- Educational content about privacy importance
- Responsive design for all devices
- Blue and white color scheme using RAL 5005 (Signal Blue)

## Getting Started

Follow these steps to run the website locally:

1. **Install dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
```

2. **Run the development server**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

3. **Open in browser**

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Build for Production

To build the website for production:

```bash
npm run build
```

The static files will be generated in the `out` directory.

## Project Structure

- `src/app`: Next.js pages
- `src/components`: Reusable UI components
- `src/hooks`: Custom React hooks
- `public`: Static assets

## Customization

- Edit product details in the respective page files
- Modify the color scheme in globals.css and tailwind.config.ts
- Update content in the page.tsx files
- Add your own GitHub repository links throughout the site

## Technologies Used

- Next.js 15
- React 19
- Tailwind CSS
- TypeScript
