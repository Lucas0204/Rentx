require('dotenv/config');

module.exports = {
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_NAME,
    "migrations": [ "./src/database/migrations/*.ts" ],
    "cli": {
        "migrationsDir": "./src/database/migrations"
    }
}
