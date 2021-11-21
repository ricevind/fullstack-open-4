require('dotenv').config();

const PORT = process.env.PORT || 3001;
const DATABASE_URI = process.env.DATABASE_URI;
const DATABASE_TEST_URI = process.env.DATABASE_TEST_URI;
const NODE_ENV = process.env.NODE_ENV;

module.exports = { 
    PORT,
    DATABASE_URI,
    NODE_ENV, 
    DATABASE_TEST_URI
};
