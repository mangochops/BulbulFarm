import { NextResponse } from 'next/server';
import Database from 'better-sqlite3';

const db = new Database('database.db');

interface RouteParams {
  params: {
    id: string;
  };
}

// GET /api/products/[id]
export async function GET(req: Request, { params }: RouteParams) {
  try {
    const product = db.prepare('SELECT * FROM products WHERE id = ?').get(params.id);

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
export async function PUT(req: Request, { params }: RouteParams) {
  try {
    const body = await req.json();
    const { commonName, binomialName, description, price, size, image, matureImage } = body;

    const stmt = db.prepare(`
      UPDATE products 
      SET commonName = ?, binomialName = ?, description = ?, price = ?, size = ?, image = ?, matureImage = ?
      WHERE id = ?
    `);

    const result = stmt.run(commonName, binomialName, description, price, size, image, matureImage, params.id);

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
export async function DELETE(req: Request, { params }: RouteParams) {
  try {
    const stmt = db.prepare('DELETE FROM products WHERE id = ?');
    const result = stmt.run(params.id);

    if (result.changes === 0) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}