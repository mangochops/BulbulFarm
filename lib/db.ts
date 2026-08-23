import { createClient } from '@libsql/client';

const url = process.env.TURSO_DATABASE_URL || 'file:data/articles.db';
const authToken = process.env.TURSO_AUTH_TOKEN;

export const db = createClient({
  url,
  authToken,
});

let isInitialized = false;

export async function initializeSchema() {
  if (isInitialized) return;

  await db.batch([
    `CREATE TABLE IF NOT EXISTS articles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      featured_image TEXT,
      slug TEXT UNIQUE NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );`,
    `CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);`,
    `CREATE INDEX IF NOT EXISTS idx_articles_created_at ON articles(created_at);`
  ], 'write');

  isInitialized = true;
}

export interface Article {
  id: number;
  title: string;
  description: string;
  featured_image: string | null;
  slug: string;
  created_at: string;
  updated_at: string;
}

export async function getAllArticles(): Promise<Article[]> {
  await initializeSchema();
  const result = await db.execute('SELECT * FROM articles ORDER BY created_at DESC');
  return result.rows as unknown as Article[];
}

export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  await initializeSchema();
  const result = await db.execute({
    sql: 'SELECT * FROM articles WHERE slug = ?',
    args: [slug],
  });
  return result.rows[0] as unknown as Article | undefined;
}

export async function getArticleById(id: number): Promise<Article | undefined> {
  await initializeSchema();
  const result = await db.execute({
    sql: 'SELECT * FROM articles WHERE id = ?',
    args: [id],
  });
  return result.rows[0] as unknown as Article | undefined;
}

export async function createArticle(
  title: string,
  description: string,
  featured_image: string | null,
  slug: string
): Promise<Article> {
  await initializeSchema();
  const result = await db.execute({
    sql: 'INSERT INTO articles (title, description, featured_image, slug) VALUES (?, ?, ?, ?)',
    args: [title, description, featured_image, slug],
  });

  const insertedId = Number(result.lastInsertRowid);
  const article = await getArticleById(insertedId);
  return article!;
}

export async function updateArticle(
  id: number,
  title: string,
  description: string,
  featured_image: string | null,
  slug: string
): Promise<Article> {
  await initializeSchema();
  await db.execute({
    sql: 'UPDATE articles SET title = ?, description = ?, featured_image = ?, slug = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
    args: [title, description, featured_image, slug, id],
  });

  const article = await getArticleById(id);
  return article!;
}

export async function deleteArticle(id: number): Promise<void> {
  await initializeSchema();
  await db.execute({
    sql: 'DELETE FROM articles WHERE id = ?',
    args: [id],
  });
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}