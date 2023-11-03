import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1699023828013 implements MigrationInterface {
    name = 'Init1699023828013'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "brands" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(255) NOT NULL, "image" varchar(255) NOT NULL, "created_at" time NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" time NOT NULL DEFAULT (CURRENT_TIMESTAMP), CONSTRAINT "UQ_96db6bbbaa6f23cad26871339b6" UNIQUE ("name"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(255) NOT NULL, "description" text NOT NULL, "price" integer NOT NULL, "stock" integer NOT NULL, "image" varchar NOT NULL, "created_at" time NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" time NOT NULL DEFAULT (CURRENT_TIMESTAMP), "brand_id" integer, CONSTRAINT "UQ_4c9fb58de893725258746385e16" UNIQUE ("name"))`);
        await queryRunner.query(`CREATE INDEX "IDX_75895eeb1903f8a17816dafe0a" ON "products" ("price") `);
        await queryRunner.query(`CREATE INDEX "IDX_4fbc36ad745962e5c11001e1a8" ON "products" ("price", "stock") `);
        await queryRunner.query(`CREATE TABLE "categories" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(255) NOT NULL, "created_at" time NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" time NOT NULL DEFAULT (CURRENT_TIMESTAMP), CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar(255) NOT NULL, "password" varchar(255) NOT NULL, "role" varchar(100) NOT NULL, "created_at" time NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" time NOT NULL DEFAULT (CURRENT_TIMESTAMP), "customer_id" integer, CONSTRAINT "REL_c7bc1ffb56c570f42053fa7503" UNIQUE ("customer_id"))`);
        await queryRunner.query(`CREATE TABLE "orders_items" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created_at" time NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" time NOT NULL DEFAULT (CURRENT_TIMESTAMP), "quantity" integer NOT NULL, "productId" integer, "orderId" integer)`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created_at" time NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" time NOT NULL DEFAULT (CURRENT_TIMESTAMP), "customerId" integer)`);
        await queryRunner.query(`CREATE TABLE "customers" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(255) NOT NULL, "last_name" varchar(255) NOT NULL, "phone" varchar(255) NOT NULL, "created_at" time NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" time NOT NULL DEFAULT (CURRENT_TIMESTAMP))`);
        await queryRunner.query(`CREATE TABLE "products_categories" ("product_id" integer NOT NULL, "category_id" integer NOT NULL, PRIMARY KEY ("product_id", "category_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f2c76a4306a82c696d620f81f0" ON "products_categories" ("product_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_19fe0fe8c2fcf1cbe1a80f639f" ON "products_categories" ("category_id") `);
        await queryRunner.query(`DROP INDEX "IDX_75895eeb1903f8a17816dafe0a"`);
        await queryRunner.query(`DROP INDEX "IDX_4fbc36ad745962e5c11001e1a8"`);
        await queryRunner.query(`CREATE TABLE "temporary_products" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(255) NOT NULL, "description" text NOT NULL, "price" integer NOT NULL, "stock" integer NOT NULL, "image" varchar NOT NULL, "created_at" time NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" time NOT NULL DEFAULT (CURRENT_TIMESTAMP), "brand_id" integer, CONSTRAINT "UQ_4c9fb58de893725258746385e16" UNIQUE ("name"), CONSTRAINT "FK_1530a6f15d3c79d1b70be98f2be" FOREIGN KEY ("brand_id") REFERENCES "brands" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_products"("id", "name", "description", "price", "stock", "image", "created_at", "updated_at", "brand_id") SELECT "id", "name", "description", "price", "stock", "image", "created_at", "updated_at", "brand_id" FROM "products"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`ALTER TABLE "temporary_products" RENAME TO "products"`);
        await queryRunner.query(`CREATE INDEX "IDX_75895eeb1903f8a17816dafe0a" ON "products" ("price") `);
        await queryRunner.query(`CREATE INDEX "IDX_4fbc36ad745962e5c11001e1a8" ON "products" ("price", "stock") `);
        await queryRunner.query(`CREATE TABLE "temporary_users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar(255) NOT NULL, "password" varchar(255) NOT NULL, "role" varchar(100) NOT NULL, "created_at" time NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" time NOT NULL DEFAULT (CURRENT_TIMESTAMP), "customer_id" integer, CONSTRAINT "REL_c7bc1ffb56c570f42053fa7503" UNIQUE ("customer_id"), CONSTRAINT "FK_c7bc1ffb56c570f42053fa7503b" FOREIGN KEY ("customer_id") REFERENCES "customers" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_users"("id", "email", "password", "role", "created_at", "updated_at", "customer_id") SELECT "id", "email", "password", "role", "created_at", "updated_at", "customer_id" FROM "users"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`ALTER TABLE "temporary_users" RENAME TO "users"`);
        await queryRunner.query(`CREATE TABLE "temporary_orders_items" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created_at" time NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" time NOT NULL DEFAULT (CURRENT_TIMESTAMP), "quantity" integer NOT NULL, "productId" integer, "orderId" integer, CONSTRAINT "FK_a64e204bf61651554cedd2988f1" FOREIGN KEY ("productId") REFERENCES "products" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_dbffa0e72d9de7f8b08c83df153" FOREIGN KEY ("orderId") REFERENCES "orders" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_orders_items"("id", "created_at", "updated_at", "quantity", "productId", "orderId") SELECT "id", "created_at", "updated_at", "quantity", "productId", "orderId" FROM "orders_items"`);
        await queryRunner.query(`DROP TABLE "orders_items"`);
        await queryRunner.query(`ALTER TABLE "temporary_orders_items" RENAME TO "orders_items"`);
        await queryRunner.query(`CREATE TABLE "temporary_orders" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created_at" time NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" time NOT NULL DEFAULT (CURRENT_TIMESTAMP), "customerId" integer, CONSTRAINT "FK_e5de51ca888d8b1f5ac25799dd1" FOREIGN KEY ("customerId") REFERENCES "customers" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_orders"("id", "created_at", "updated_at", "customerId") SELECT "id", "created_at", "updated_at", "customerId" FROM "orders"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`ALTER TABLE "temporary_orders" RENAME TO "orders"`);
        await queryRunner.query(`DROP INDEX "IDX_f2c76a4306a82c696d620f81f0"`);
        await queryRunner.query(`DROP INDEX "IDX_19fe0fe8c2fcf1cbe1a80f639f"`);
        await queryRunner.query(`CREATE TABLE "temporary_products_categories" ("product_id" integer NOT NULL, "category_id" integer NOT NULL, CONSTRAINT "FK_f2c76a4306a82c696d620f81f08" FOREIGN KEY ("product_id") REFERENCES "products" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_19fe0fe8c2fcf1cbe1a80f639f1" FOREIGN KEY ("category_id") REFERENCES "categories" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, PRIMARY KEY ("product_id", "category_id"))`);
        await queryRunner.query(`INSERT INTO "temporary_products_categories"("product_id", "category_id") SELECT "product_id", "category_id" FROM "products_categories"`);
        await queryRunner.query(`DROP TABLE "products_categories"`);
        await queryRunner.query(`ALTER TABLE "temporary_products_categories" RENAME TO "products_categories"`);
        await queryRunner.query(`CREATE INDEX "IDX_f2c76a4306a82c696d620f81f0" ON "products_categories" ("product_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_19fe0fe8c2fcf1cbe1a80f639f" ON "products_categories" ("category_id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_19fe0fe8c2fcf1cbe1a80f639f"`);
        await queryRunner.query(`DROP INDEX "IDX_f2c76a4306a82c696d620f81f0"`);
        await queryRunner.query(`ALTER TABLE "products_categories" RENAME TO "temporary_products_categories"`);
        await queryRunner.query(`CREATE TABLE "products_categories" ("product_id" integer NOT NULL, "category_id" integer NOT NULL, PRIMARY KEY ("product_id", "category_id"))`);
        await queryRunner.query(`INSERT INTO "products_categories"("product_id", "category_id") SELECT "product_id", "category_id" FROM "temporary_products_categories"`);
        await queryRunner.query(`DROP TABLE "temporary_products_categories"`);
        await queryRunner.query(`CREATE INDEX "IDX_19fe0fe8c2fcf1cbe1a80f639f" ON "products_categories" ("category_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_f2c76a4306a82c696d620f81f0" ON "products_categories" ("product_id") `);
        await queryRunner.query(`ALTER TABLE "orders" RENAME TO "temporary_orders"`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created_at" time NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" time NOT NULL DEFAULT (CURRENT_TIMESTAMP), "customerId" integer)`);
        await queryRunner.query(`INSERT INTO "orders"("id", "created_at", "updated_at", "customerId") SELECT "id", "created_at", "updated_at", "customerId" FROM "temporary_orders"`);
        await queryRunner.query(`DROP TABLE "temporary_orders"`);
        await queryRunner.query(`ALTER TABLE "orders_items" RENAME TO "temporary_orders_items"`);
        await queryRunner.query(`CREATE TABLE "orders_items" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created_at" time NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" time NOT NULL DEFAULT (CURRENT_TIMESTAMP), "quantity" integer NOT NULL, "productId" integer, "orderId" integer)`);
        await queryRunner.query(`INSERT INTO "orders_items"("id", "created_at", "updated_at", "quantity", "productId", "orderId") SELECT "id", "created_at", "updated_at", "quantity", "productId", "orderId" FROM "temporary_orders_items"`);
        await queryRunner.query(`DROP TABLE "temporary_orders_items"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME TO "temporary_users"`);
        await queryRunner.query(`CREATE TABLE "users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar(255) NOT NULL, "password" varchar(255) NOT NULL, "role" varchar(100) NOT NULL, "created_at" time NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" time NOT NULL DEFAULT (CURRENT_TIMESTAMP), "customer_id" integer, CONSTRAINT "REL_c7bc1ffb56c570f42053fa7503" UNIQUE ("customer_id"))`);
        await queryRunner.query(`INSERT INTO "users"("id", "email", "password", "role", "created_at", "updated_at", "customer_id") SELECT "id", "email", "password", "role", "created_at", "updated_at", "customer_id" FROM "temporary_users"`);
        await queryRunner.query(`DROP TABLE "temporary_users"`);
        await queryRunner.query(`DROP INDEX "IDX_4fbc36ad745962e5c11001e1a8"`);
        await queryRunner.query(`DROP INDEX "IDX_75895eeb1903f8a17816dafe0a"`);
        await queryRunner.query(`ALTER TABLE "products" RENAME TO "temporary_products"`);
        await queryRunner.query(`CREATE TABLE "products" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(255) NOT NULL, "description" text NOT NULL, "price" integer NOT NULL, "stock" integer NOT NULL, "image" varchar NOT NULL, "created_at" time NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" time NOT NULL DEFAULT (CURRENT_TIMESTAMP), "brand_id" integer, CONSTRAINT "UQ_4c9fb58de893725258746385e16" UNIQUE ("name"))`);
        await queryRunner.query(`INSERT INTO "products"("id", "name", "description", "price", "stock", "image", "created_at", "updated_at", "brand_id") SELECT "id", "name", "description", "price", "stock", "image", "created_at", "updated_at", "brand_id" FROM "temporary_products"`);
        await queryRunner.query(`DROP TABLE "temporary_products"`);
        await queryRunner.query(`CREATE INDEX "IDX_4fbc36ad745962e5c11001e1a8" ON "products" ("price", "stock") `);
        await queryRunner.query(`CREATE INDEX "IDX_75895eeb1903f8a17816dafe0a" ON "products" ("price") `);
        await queryRunner.query(`DROP INDEX "IDX_19fe0fe8c2fcf1cbe1a80f639f"`);
        await queryRunner.query(`DROP INDEX "IDX_f2c76a4306a82c696d620f81f0"`);
        await queryRunner.query(`DROP TABLE "products_categories"`);
        await queryRunner.query(`DROP TABLE "customers"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TABLE "orders_items"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP INDEX "IDX_4fbc36ad745962e5c11001e1a8"`);
        await queryRunner.query(`DROP INDEX "IDX_75895eeb1903f8a17816dafe0a"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "brands"`);
    }

}
