DROP DATABASE IF EXISTS launchstoredb

CREATE DATABASE launchstoredb

CREATE TABLE "products" (
  "id" SERIAL PRIMARY KEY,
  "category_id" int NOT NULL,
  "user_id" int ,
  "name" text NOT NULL,
  "description" text NOT NULL,
  "old_Price" int,
  "price" int NOT NULL,
  "quantity" int DEFAULT 0,
  "status" int DEFAULT 1,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now())
);

CREATE TABLE "categories" (
  "id" SERIAL PRIMARY KEY,
  "name" text NOT NULL
);

CREATE TABLE "files" (
  "id" SERIAL PRIMARY KEY,
  "name" text,
  "path" text NOT NULL,
  "product_id" int 
);

ALTER TABLE "products" ADD FOREIGN KEY ("category_id") REFERENCES "categories" ("id");

ALTER TABLE "files" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");



CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "name" text NOT NULL,
  "email" text UNIQUE NOT NULL,
  "password" text NOT NULL,
  "cpf_cnpj" int UNIQUE NOT NULL,
  "cep" text,
  "adress" text,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now())
);

-- Foreing key 

ALTER TABLE "products" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

-- create procedure

  CREATE FUNCTION trigger_set_timestamp()
  RETURNS TRIGGER AS $$
  BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
  END;
  $$ LANGUAGE plpgsql;

  -- AUTO updated_ai products 

  CREATE TRIGGER set_timestamp
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE PROCEDURE trigger_set_timestamp();


   -- AUTO updated_ai users 

  CREATE TRIGGER set_timestamp
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE PROCEDURE trigger_set_timestamp();


insert into categories(name) VALUES ('comida');
insert into categories(name) VALUES ('eletronicos');
insert into categories(name) VALUES ('automoveis');