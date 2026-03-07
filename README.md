# Link Sharing App

A full-stack link sharing application that allows users to create a
customizable public profile containing links to their social platforms.

Users can manage links, upload a profile avatar, customize a theme
color, and share a public profile page.

Live App\
https://linksharing-app-five.vercel.app

------------------------------------------------------------------------

## Features

### Authentication

-   Supabase email authentication
-   Protected dashboard routes using middleware

### Link Management

-   Add, edit, remove links
-   Drag-and-drop link reordering
-   Automatic URL normalization
-   Platform icons and branded button colors

### Profile Customization

-   Username and profile details editor
-   Avatar upload using Supabase Storage
-   Theme color customization
-   Copy profile link functionality

### Preview System

-   Live phone preview inside the dashboard
-   Dedicated preview page for final profile
-   Public profile page at `/u/[username]`

### UI / UX Improvements

-   Responsive layout
-   Empty states and loading states
-   Toast notifications for save actions
-   Styled phone mockup preview
-   Clean dashboard layout

------------------------------------------------------------------------

## Tech Stack

### Frontend

-   Next.js 14 (App Router)
-   React
-   Tailwind CSS
-   dnd-kit (drag and drop)

### Backend

-   Supabase Authentication
-   Supabase PostgreSQL
-   Supabase Storage (avatars)

### Deployment

-   Vercel

### Icons

-   React Icons

------------------------------------------------------------------------

## Architecture

    Next.js App Router
    │
    ├── Dashboard
    │   ├── Links Editor
    │   ├── Profile Editor
    │   └── Live Phone Preview
    │
    ├── Public Profile
    │   └── /u/[username]
    │
    ├── Preview Page
    │
    └── Supabase
        ├── Auth
        ├── Profiles Table
        ├── Links Table
        └── Avatar Storage

------------------------------------------------------------------------

## Database Schema

### profiles

    id (uuid)
    username (text)
    first_name (text)
    last_name (text)
    email (text)
    avatar_url (text)
    theme_color (text)

### links

    id (uuid)
    user_id (uuid)
    platform (text)
    url (text)
    sort_order (integer)

------------------------------------------------------------------------

## Local Development

Clone the repository:

    git clone https://github.com/YOUR_USERNAME/link-sharing-app.git
    cd link-sharing-app

Install dependencies:

    npm install

Create `.env.local`:

    NEXT_PUBLIC_SUPABASE_URL=your_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key

Run the development server:

    npm run dev

------------------------------------------------------------------------

## Environment Variables

    NEXT_PUBLIC_SUPABASE_URL
    NEXT_PUBLIC_SUPABASE_ANON_KEY

------------------------------------------------------------------------

## Project Structure

    app
     ├ dashboard
     │  ├ links
     │  └ profile
     │
     ├ preview
     │
     └ u
        └ [username]

    components
     ├ PhonePreview
     ├ SortableLinkItem
     ├ Toast
     └ CopyProfileLinkButton

    lib
     ├ supabase
     └ platforms

------------------------------------------------------------------------

## What This Project Demonstrates

-   Full-stack Next.js application architecture
-   Supabase authentication and database integration
-   File uploads using Supabase Storage
-   Drag-and-drop UI with persistent ordering
-   Dynamic public routing
-   Responsive UI design
-   Component-driven architecture

------------------------------------------------------------------------

## Future Improvements

-   Analytics for profile visits
-   Additional social platform integrations
-   Custom profile themes
-   QR code sharing
-   Link click tracking

------------------------------------------------------------------------

## License

MIT
