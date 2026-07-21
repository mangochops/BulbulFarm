import { NextResponse } from 'next/server';
import Database from 'better-sqlite3';

const db = new Database('database.db');

// Ensure products table exists
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

// GET /api/products
export async function GET() {
  try {
    const products = db.prepare('SELECT * FROM products ORDER BY id DESC').all();
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

// POST /api/products
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { commonName, binomialName, description, price, size, image, matureImage } = body;

    const stmt = db.prepare(`
      INSERT INTO products (commonName, binomialName, description, price, size, image, matureImage)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(commonName, binomialName, description, price, size, image, matureImage);

    return NextResponse.json(
      { message: 'Product created successfully', id: result.lastInsertRowid },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}