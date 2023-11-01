ALTER TABLE users ADD COLUMN role VARCHAR(255) NOT NULL;

UPDATE users SET role = 'CUSTOMER' where role='';