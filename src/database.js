import initSqlJs from 'sql.js';

const initializeDatabase = async () => {
  const SQL = await initSqlJs({
    locateFile: file => `https://sql.js.org/dist/${file}`
  });
  const db = new SQL.Database();

  // Create tables
  db.run(`
    CREATE TABLE monthly_data (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      month TEXT,
      last_year INTEGER,
      this_year INTEGER
    );
  `);

  db.run(`
    CREATE TABLE product_data (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product TEXT,
      sold_amount INTEGER,
      unit_price REAL,
      revenue REAL,
      rating REAL
    );
  `);

  // Insert data into monthly_data table
  db.run(`
    INSERT INTO monthly_data (month, last_year, this_year) VALUES
    ('Jan', 5000, 6000),
    ('Feb', 10000, 2000),
    ('Mar', 20000, 40000),
    ('Apr', 32000, 21000),
    ('May', 12000, 9200),
    ('Jun', 13000, 8700);
  `);

  // Insert data into product_data table
  db.run(`
    INSERT INTO product_data (product, sold_amount, unit_price, revenue, rating) VALUES
    ('Camera Mi 360', 432, 120, 51320, 4.81),
    ('Message Gun', 120, 60, 23901, 3.44),
    ('Redmi Note 9', 190, 87.6, 87211, 2.5),
    ('One Plus Nord CE Lite 2', 140, 24.1, 29809, 4.65);
  `);

  return db;
};

export default initializeDatabase;