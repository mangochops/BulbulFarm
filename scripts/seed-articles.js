const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

// Create data directory if it doesn't exist
const dataDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'articles.db');
const db = new Database(dbPath);

// Initialize schema
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

// Insert sample articles
const sampleArticles = [
  {
    title: 'The Importance of Indigenous Trees',
    description: 'Indigenous trees play a crucial role in maintaining ecological balance and supporting local biodiversity. They are adapted to local climate conditions and require minimal maintenance once established. In this article, we explore why protecting and cultivating indigenous trees is essential for a sustainable future.',
    featured_image: null,
    slug: 'importance-of-indigenous-trees'
  },
  {
    title: 'Seasonal Care for Your Tree Saplings',
    description: 'Proper care during the growing seasons ensures healthy development of your tree saplings. Each season brings different challenges and opportunities. From spring planting to winter dormancy, we guide you through the best practices for nurturing your saplings throughout the year.',
    featured_image: null,
    slug: 'seasonal-care-tree-saplings'
  },
  {
    title: 'Understanding Soil Quality for Tree Growth',
    description: 'Soil quality is the foundation of healthy tree growth. Understanding the composition, pH levels, and nutrient content of your soil can make the difference between thriving trees and struggling ones. Learn how to test and improve your soil for optimal tree cultivation.',
    featured_image: null,
    slug: 'soil-quality-tree-growth'
  }
];

const stmt = db.prepare(
  'INSERT OR IGNORE INTO articles (title, description, featured_image, slug) VALUES (?, ?, ?, ?)'
);

sampleArticles.forEach(article => {
  try {
    stmt.run(article.title, article.description, article.featured_image, article.slug);
    console.log(`✓ Created article: ${article.title}`);
  } catch (error) {
    console.error(`✗ Error creating article: ${article.title}`, error.message);
  }
});

console.log('\n✓ Seed completed successfully!');
db.close();
