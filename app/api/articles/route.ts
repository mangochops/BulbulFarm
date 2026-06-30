import { getAllArticles, createArticle, slugify } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const articles = getAllArticles();
    return NextResponse.json(articles);
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const adminKey = process.env.ADMIN_KEY;
    const authHeader = request.headers.get('authorization');

    if (!adminKey || authHeader !== `Bearer ${adminKey}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const file = formData.get('featured_image') as File | null;

    if (!title || !description) {
      return NextResponse.json({ error: 'Title and description are required' }, { status: 400 });
    }

    let imagePath = null;

    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Create articles directory if it doesn't exist
      const articlesDir = path.join(process.cwd(), 'public', 'articles');
      if (!fs.existsSync(articlesDir)) {
        fs.mkdirSync(articlesDir, { recursive: true });
      }

      // Generate filename with timestamp
      const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
      const filepath = path.join(articlesDir, filename);
      fs.writeFileSync(filepath, buffer);
      imagePath = `/articles/${filename}`;
    }

    const slug = slugify(title);
    const article = createArticle(title, description, imagePath, slug);

    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    console.error('Error creating article:', error);
    return NextResponse.json({ error: 'Failed to create article' }, { status: 500 });
  }
}
