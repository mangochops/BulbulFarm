import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@libsql/client/web';

function getDbClient() {
  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  if (!url || !authToken) {
    throw new Error('TURSO_DATABASE_URL or TURSO_AUTH_TOKEN is missing.');
  }

  return createClient({ url, authToken });
}

type Props = {
  params: Promise<{ id: string }> | { id: string };
};

// GET /api/products/[id]
export async function GET(req: NextRequest, { params }: Props) {
  try {
    const { id } = await params;
    const db = getDbClient();
    const result = await db.execute({
      sql: 'SELECT * FROM products WHERE id = ?',
      args: [id],
    });

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('Error fetching product:', message);
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}

// PUT /api/products/[id]
export async function PUT(req: NextRequest, { params }: Props) {
  try {
    const adminKey = process.env.ADMIN_KEY || process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
    const authHeader = req.headers.get('authorization');

    if (adminKey && authHeader !== `Bearer ${adminKey}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    const { commonName, binomialName, description, price, size, image, matureImage } = body;

    const db = getDbClient();
    const result = await db.execute({
      sql: `
        UPDATE products 
        SET commonName = ?, binomialName = ?, description = ?, price = ?, size = ?, image = ?, matureImage = ?
        WHERE id = ?
      `,
      args: [
        commonName || '',
        binomialName || '',
        description || '',
        price || '',
        size || '',
        image || '',
        matureImage || '',
        id,
      ],
    });

    if (result.rowsAffected === 0) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Product updated successfully' });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('Error updating product:', message);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

// DELETE /api/products/[id]
export async function DELETE(req: NextRequest, { params }: Props) {
  try {
    const adminKey = process.env.ADMIN_KEY || process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
    const authHeader = req.headers.get('authorization');

    if (adminKey && authHeader !== `Bearer ${adminKey}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const db = getDbClient();
    const result = await db.execute({
      sql: 'DELETE FROM products WHERE id = ?',
      args: [id],
    });

    if (result.rowsAffected === 0) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('Error deleting product:', message);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
