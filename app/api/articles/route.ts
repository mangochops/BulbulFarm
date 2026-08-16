import { getAllArticles, createArticle, slugify } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';


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
    // Check Authorization
    const expectedKey = process.env.ADMIN_KEY || process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
    const authHeader = request.headers.get('authorization');

    if (!expectedKey || authHeader !== `Bearer ${expectedKey}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title, description, featured_image } = await request.json();

    if (!title || !description) {
      return NextResponse.json({ error: 'Title and description are required' }, { status: 400 });
    }

    const slug = slugify(title);
    const article = createArticle(title, description, featured_image || null, slug);

    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    console.error('Error creating article:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create article' },
      { status: 500 }
    );
  }
}