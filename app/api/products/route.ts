import { NextRequest, NextResponse } from 'next/server';
import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'database.db');

function getDB() {
  const db = new Database(dbPath);
  db.pragma('journal_mode = WAL');
  db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      commonName TEXT NOT NULL,
      binomialName TEXT NOT NULL,
      description TEXT,
      price TEXT,
      size TEXT,
      image TEXT,
      matureImage TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  return db;
}

// GET /api/products
export async function GET() {
  try {
    const db = getDB();
    const products = db.prepare('SELECT * FROM products ORDER BY id DESC').all();
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

// POST /api/products
export async function POST(req: NextRequest) {
  try {
    const adminKey = process.env.ADMIN_KEY;
    const authHeader = req.headers.get('authorization');

    if (adminKey && authHeader !== `Bearer ${adminKey}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { commonName, binomialName, description, price, size, image, matureImage } = body;

    const db = getDB();
    const stmt = db.prepare(`
      INSERT INTO products (commonName, binomialName, description, price, size, image, matureImage)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      commonName || '',
      binomialName || '',
      description || '',
      price || '',
      size || '',
      image || '',
      matureImage || ''
    );

    return NextResponse.json(
      { message: 'Product created successfully', id: result.lastInsertRowid },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}