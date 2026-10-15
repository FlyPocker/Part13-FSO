require('dotenv').config()



module.exports = {
  // Jeśli środowisko to test, bierzemy URL z TEST_DATABASE_URL, inaczej ze standardowego DATABASE_URL
  DATABASE_URL: process.env.TESTING 
    ? process.env.TEST_DATABASE_URL 
    : process.env.DATABASE_URL,
  PORT: process.env.PORT || 3001,
  SECRET: process.env.SECRET,
  TESTING: process.env.TESTING
}