CREATE TABLE users (
	user_id UUID NOT NULL PRIMARY KEY,
	org_name varchar(50) NOT NULL,
	username varchar(50) NOT NULL,
	category varchar(50) NOT NULL,
	email varchar(50) NOT NULL,
	phone_number  varchar(50) NOT NULL,
	user_password varchar(80) NOT NULL,
	description  varchar(200)
)


CREATE TABLE user_products (
    product_id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(user_id),
    name VARCHAR(255),
    description TEXT,
    price DECIMAL(10, 2),
    product_count INT DEFAULT 0
);