# Ticket Generator App

This project was bootstrapped with Vite and includes Cloudinary configuration for image uploads.

## Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager
- A Cloudinary account

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Configure Environment Variables:

Create a `.env` file in the root directory and add your Cloudinary credentials:

```env
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

3. Start the development server:

```bash
npm run dev
```

## Environment Variables Setup

To set up Cloudinary environment variables:

1. Log in to your Cloudinary Dashboard
2. Get your Cloud Name from the dashboard
3. Create an upload preset:
   - Go to Settings > Upload
   - Scroll to Upload Presets
   - Click "Add Upload Preset"
   - Set signing mode to "unsigned"
   - Save the preset name

## Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Builds the app for production
- `npm run preview` - Previews the production build locally
