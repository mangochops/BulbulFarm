import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const dbPath = path.join(process.cwd(), 'data', 'articles.db');

let db: Database.Database;

export function getDB() {
  if (!db) {
    // Ensure the data directory exists
    const dataDir = path.dirname(dbPath);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    db = new Database(dbPath);
    db.pragma('journal_mode = WAL');
    initializeSchema();
  }
  return db;
}

function initializeSchema() {
  const schema = `
    CREATE TABLE IF NOT EXISTS articles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      featured_image TEXT,
      slug TEXT UNIQUE NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
    CREATE INDEX IF NOT EXISTS idx_articles_created_at ON articles(created_at);
  `;

  const statements = schema.split(';').filter(s => s.trim());
  statements.forEach(statement => {
    try {
      db.exec(statement);
    } catch (error) {
      console.error('Error executing statement:', statement, error);
    }
  });
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

export function getAllArticles(): Article[] {
  const db = getDB();
  return db.prepare('SELECT * FROM articles ORDER BY created_at DESC').all() as Article[];
}

export function getArticleBySlug(slug: string): Article | undefined {
  const db = getDB();
  return db.prepare('SELECT * FROM articles WHERE slug = ?').get(slug) as Article | undefined;
}

export function createArticle(
  title: string,
  description: string,
  featured_image: string | null,
  slug: string
): Article {
  const db = getDB();
  const result = db.prepare(
    'INSERT INTO articles (title, description, featured_image, slug) VALUES (?, ?, ?, ?)'
  ).run(title, description, featured_image, slug);

  return getArticleById(result.lastInsertRowid as number)!;
}

export function updateArticle(
  id: number,
  title: string,
  description: string,
  featured_image: string | null,
  slug: string
): Article {
  const db = getDB();
  db.prepare(
    'UPDATE articles SET title = ?, description = ?, featured_image = ?, slug = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
  ).run(title, description, featured_image, slug, id);

  return getArticleById(id)!;
}

export function deleteArticle(id: number): void {
  const db = getDB();
  db.prepare('DELETE FROM articles WHERE id = ?').run(id);
}

export function getArticleById(id: number): Article | undefined {
  const db = getDB();
  return db.prepare('SELECT * FROM articles WHERE id = ?').get(id) as Article | undefined;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}
