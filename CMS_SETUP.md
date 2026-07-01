# Bulbul Farm CMS Setup Guide

Your Bulbul Farm website now includes a complete CMS (Content Management System) for managing articles.

## Features

✅ **Public Articles Page** - Display articles in a grid layout at `/articles`
✅ **Article Detail Pages** - Individual article pages with slug-based URLs
✅ **Admin Dashboard** - Manage articles at `/admin` with password protection
✅ **Image Uploads** - Upload featured images for articles (stored locally in `/public/articles`)
✅ **SQLite Database** - Articles stored in `data/articles.db`
✅ **Full CRUD** - Create, read, update, and delete articles

## Environment Variables Required

You need to set two environment variables for the admin dashboard to work:

### 1. `NEXT_PUBLIC_ADMIN_PASSWORD`
Used for the admin login form. Non-technical users (farm team) will enter this password.

### 2. `ADMIN_KEY`
Used for API authentication when creating/updating/deleting articles. Must be the same as `NEXT_PUBLIC_ADMIN_PASSWORD` for simplicity.

### Setting Variables in Vercel

1. Go to your Vercel project settings
2. Navigate to **Environment Variables** (or **Vars** in the project settings)
3. Add these two variables with the same value (your desired admin password):
   - `NEXT_PUBLIC_ADMIN_PASSWORD` = `your-secure-password`
   - `ADMIN_KEY` = `your-secure-password`
4. Redeploy or restart your development server

### Setting Variables Locally

Create or update `.env.local` in your project root:

```bash
NEXT_PUBLIC_ADMIN_PASSWORD=your-secure-password
ADMIN_KEY=your-secure-password
```

## Using the CMS

### Admin Dashboard
Visit: `http://localhost:3000/admin`

1. Enter your admin password
2. You'll see:
   - **Left panel**: Form to create or edit articles
   - **Right panel**: List of all articles with edit/delete buttons

### Creating an Article
1. Fill in the title
2. Write the description (can include multiple paragraphs)
3. Upload a featured image (optional)
4. Click "Create Article"

### Editing an Article
1. Click the "Edit" button next to an article
2. The form will populate with existing data
3. Make changes and click "Update Article"

### Deleting an Article
1. Click the "Delete" button next to an article
2. Confirm the deletion

### Public Articles Page
Users can view articles at: `http://localhost:3000/articles`

Articles are displayed as cards with:
- Featured image (if provided)
- Title
- Description preview
- Publication date

Clicking an article shows the full article page with:
- Full article content
- Publication date
- Related articles section

## Database

The SQLite database is stored at `data/articles.db` and is **not tracked in git** (see `.gitignore`).

### Database Schema

```sql
CREATE TABLE articles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  featured_image TEXT,           -- path like /articles/1234567890-image.jpg
  slug TEXT UNIQUE NOT NULL,     -- auto-generated from title
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## File Storage

Article images are stored locally in:
- **Directory**: `/public/articles/`
- **Naming**: `{timestamp}-{original-filename}`
- **Access**: Images are served at URLs like `/articles/1234567890-filename.jpg`

The `/public/articles/` directory is **not tracked in git** (see `.gitignore`).

## Seeding Sample Articles

Three sample articles have been automatically created when the database was initialized:
1. "The Importance of Indigenous Trees"
2. "Seasonal Care for Your Tree Saplings"
3. "Understanding Soil Quality for Tree Growth"

To regenerate sample data, run:
```bash
npm run seed
```

Or manually:
```bash
node scripts/seed-articles.js
```

## File Locations

- **Database**: `/data/articles.db`
- **Database Module**: `/lib/db.ts`
- **API Routes**:
  - `GET /api/articles` - List all articles
  - `POST /api/articles` - Create article (requires auth)
  - `GET /api/articles/[id]` - Get single article
  - `PUT /api/articles/[id]` - Update article (requires auth)
  - `DELETE /api/articles/[id]` - Delete article (requires auth)
- **Components**: `/app/components/ArticleForm.tsx`
- **Pages**:
  - `/app/articles/page.tsx` - Articles list
  - `/app/articles/[slug]/page.tsx` - Article detail
  - `/app/admin/page.tsx` - Admin dashboard

## Troubleshooting

### Admin Login Not Working
- Check that `NEXT_PUBLIC_ADMIN_PASSWORD` is set correctly
- Make sure you're using the exact password you configured
- Restart the dev server after adding environment variables

### Images Not Uploading
- Ensure `/public/articles/` directory exists
- Check file size (browser usually has limits)
- Verify disk space on your server

### Articles Not Showing Up
- Make sure the database was initialized (run `node scripts/seed-articles.js`)
- Check that the SQLite file exists at `data/articles.db`
- Check browser console for any API errors

## Notes

- The admin password is stored in environment variables and checked client-side and server-side
- For production, consider using stronger authentication (OAuth, tokens, etc.)
- Images are stored on the server's filesystem - for scaling, consider cloud storage (S3, Vercel Blob, etc.)
- Article slugs are auto-generated from titles and must be unique

## Next Steps

1. Set the environment variables (`NEXT_PUBLIC_ADMIN_PASSWORD` and `ADMIN_KEY`)
2. Visit `/admin` and log in with your password
3. Create your first article!
4. View articles at `/articles`
