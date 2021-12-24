const sqlite3 = require('sqlite3').verbose();

const DBSOURCE = './db/db.sqlite';

const database = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    // Cannot open database
    console.error(err.message);
    throw err;
  } else {
    console.info('Connected to the SQLite database.');
    database.run(
      `CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            firstname text, 
            lastname text,
            role CHECK( role IN ('ADMIN', 'USER', 'MODERATOR')),
            country text,
            address text,
            zipCode text
            );

        CREATE TABLE IF NOT EXISTS orders (
                             id INTEGER PRIMARY KEY AUTOINCREMENT,
                             userId INTEGER,
                             items text,
                             status CHECK( status IN ('PENDING', 'CANCELLED', 'COMPLETE'))
      );     
            `,
      (err) => {
        if (err) {
          console.info('Table already created');
        } else {
          console.info('Table just created, creating some rows');
          // const insertUsers = `INSERT INTO users (
          //          firstname,
          //          lastname,
          //          role,
          //          country,
          //          address,
          //          zipCode
          //          ) VALUES (?,?,?,?,?,?)`;
          //
          // const insertOrders = `INSERT INTO orders (
          //          userId,
          //          items,
          //          status
          //          ) VALUES (?,?,?)`;

          // database.run(insertUsers, [
          //   'Andrew',
          //   'lastname',
          //   'ADMIN',
          //   'country1',
          //   'address1',
          //   'zipCode1',
          // ]);
          //
          // database.run(insertUsers, [
          //   'User1',
          //   'lastname',
          //   'MODERATOR',
          //   'country2',
          //   'address2',
          //   'zipCode2',
          // ]);
          //
          // database.run(insertUsers, [
          //   'User2',
          //   'lastname',
          //   'USER',
          //   'country3',
          //   'address3',
          //   'zipCode3',
          // ]);

          // database.run(insertOrders, [
          //   3,
          //   'item1',
          //   'PENDING',
          // ]);
          //
          // database.run(insertOrders, [
          //   3,
          //   'item2, item3',
          //   'CANCELLED',
          // ]);
          //
          // database.run(insertOrders, [
          //   3,
          //   'item4, item5, item6',
          //   'COMPLETE',
          // ]);

          console.info('Done :)');
        }
      },
    );
  }
});

module.exports = database;
