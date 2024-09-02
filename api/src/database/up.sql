DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id VARCHAR(32) PRIMARY KEY,
  password VARCHAR(255) NOT NULL,
  document VARCHAR(32) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(32) NOT NULL, 
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(32) REFERENCES users(id) ON DELETE CASCADE,
  salary DECIMAL(10, 2) NOT NULL,
  description TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);