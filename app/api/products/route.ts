import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@libsql/client/web';

const db = createClient({
  url: process.env.TURSO_DATABASE_URL || '',
  authToken: process.env.TURSO_AUTH_TOKEN || '',
});

async function initDB() {
  await db.execute(`
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
}

// GET /api/products
export async function GET() {
  try {
    await initDB();
    const result = await db.execute('SELECT * FROM products ORDER BY id DESC');
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

// POST /api/products
export async function POST(req: NextRequest) {
  try {
    const adminKey = process.env.ADMIN_KEY || process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
    const authHeader = req.headers.get('authorization');

    if (adminKey && authHeader !== `Bearer ${adminKey}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { commonName, binomialName, description, price, size, image, matureImage } = body;

    await initDB();
    const result = await db.execute({
      sql: `
        INSERT INTO products (commonName, binomialName, description, price, size, image, matureImage)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      args: [
        commonName || '',
        binomialName || '',
        description || '',
        price || '',
        size || '',
        image || '',
        matureImage || '',
      ],
    });

    return NextResponse.json(
      { message: 'Product created successfully', id: Number(result.lastInsertRowid) },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
