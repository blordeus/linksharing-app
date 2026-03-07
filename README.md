
# Link Sharing App

A full-stack link sharing platform where users can create a profile, manage their links, and share a public page containing all of their social and professional links.

Live app:

https://linksharing-app-five.vercel.app

Users can build a profile, add links to various platforms, and share a public page such as:

https://linksharing-app-five.vercel.app/u/username

---

# Features

## Authentication
- User signup and login
- Session handling with Supabase Auth
- Protected dashboard routes using middleware

## Profile Management
- Edit username
- Add first name and last name
- Store email information
- Copy public profile link

## Link Management
- Add multiple platform links
- Edit existing links
- Delete links
- Automatic URL normalization
- Ordered links stored in the database

## Public Profile Page
Each user gets a shareable page displaying their profile and links.

Example:
/u/username

Links open the associated platforms in a new tab.

## Live Preview
The dashboard includes a phone preview showing how the public profile will appear.

## Deployment
The application is deployed on **Vercel** and uses **Supabase** for backend services.

---

# Tech Stack

## Frontend
- Next.js (App Router)
- React
- Tailwind CSS

## Backend
- Supabase Auth
- Supabase Postgres
- Supabase SSR Client

## Deployment
- Vercel

---

# Project Structure

src
 ├ app
 │ ├ dashboard
 │ │ ├ links
 │ │ └ profile
 │ ├ login
 │ ├ signup
 │ ├ u
 │ │ └ [username]
 │ └ page.tsx
 │
 ├ components
 │ ├ CopyProfileLinkButton
 │ ├ LogoutButton
 │ ├ PhonePreview
 │
 ├ lib
 │ └ supabase
 │    ├ browser.ts
 │    └ server.ts
 │
 └ middleware.ts

---

# Database Schema

## profiles

| column | description |
|------|------|
| id | Supabase auth user id |
| username | public profile identifier |
| first_name | user first name |
| last_name | user last name |
| email | user email |
| avatar_url | (future enhancement) |

## links

| column | description |
|------|------|
| id | unique link id |
| user_id | reference to profile |
| platform | platform name |
| url | external link |
| sort_order | ordering index |

---

# Environment Variables

Create a `.env.local` file:

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

These values come from your Supabase project settings.

---

# Running the Project Locally

Install dependencies:

yarn install

Run the development server:

yarn dev

The app will run at:

http://localhost:3000

---

# Authentication Configuration

In Supabase, configure:

Site URL:
https://linksharing-app-five.vercel.app

Redirect URLs:
http://localhost:3000/**
https://linksharing-app-five.vercel.app/**

---

# Deployment

The project is deployed with **Vercel**.

Steps:

1. Push repository to GitHub
2. Import the project into Vercel
3. Add environment variables
4. Deploy

Vercel automatically builds and deploys the Next.js application.

---

# Future Improvements

Planned UI and feature enhancements:

- Platform icons and branded link buttons
- Profile image upload using Supabase Storage
- Improved mobile responsiveness
- Visual polish to match the Frontend Mentor design
- Drag-and-drop link ordering
- Enhanced preview component

---

# License

This project was built as part of a Frontend Mentor challenge and is intended for educational and portfolio use.
