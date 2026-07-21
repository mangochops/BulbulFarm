import { NextRequest, NextResponse } from 'next/server';
import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'database.db');

function getDB() {
  return new Database(dbPath);
}

type Props = {
  params: Promise<{ id: string }> | { id: string };
};

// GET /api/products/[id]
export async function GET(req: NextRequest, { params }: Props) {
  try {
    const { id } = await params;
    const db = getDB();
    const product = db.prepare('SELECT * FROM products WHERE id = ?').get(id);

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}

// PUT /api/products/[id]
export async function PUT(req: NextRequest, { params }: Props) {
  try {
    const adminKey = process.env.ADMIN_KEY;
    const authHeader = req.headers.get('authorization');

    if (adminKey && authHeader !== `Bearer ${adminKey}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    const { commonName, binomialName, description, price, size, image, matureImage } = body;

    const db = getDB();
    const stmt = db.prepare(`
      UPDATE products 
      SET commonName = ?, binomialName = ?, description = ?, price = ?, size = ?, image = ?, matureImage = ?
      WHERE id = ?
    `);

    const result = stmt.run(
      commonName || '',
      binomialName || '',
      description || '',
      price || '',
      size || '',
      image || '',
      matureImage || '',
      id
    );

    if (result.changes === 0) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Product updated successfully' });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

// DELETE /api/products/[id]
export async function DELETE(req: NextRequest, { params }: Props) {
  try {
    const adminKey = process.env.ADMIN_KEY;
    const authHeader = req.headers.get('authorization');

    if (adminKey && authHeader !== `Bearer ${adminKey}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const db = getDB();
    const stmt = db.prepare('DELETE FROM products WHERE id = ?');
    const result = stmt.run(id);

    if (result.changes === 0) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}