INSERT INTO products (id, sku, price, attr_id, created_at, updated_at) VALUES (1, 'A', 50, 1, NOW(), NOW());
INSERT INTO products (id, sku, price, attr_id, created_at, updated_at) VALUES (2, 'B', 30, 1, NOW(), NOW());
INSERT INTO products (id, sku, price, attr_id, created_at, updated_at) VALUES (3, 'C', 199, 2, NOW(), NOW());
INSERT INTO products (id, sku, price, attr_id, created_at, updated_at) VALUES (4, 'D', 120, 1, NOW(), NOW());
INSERT INTO products (id, sku, price, attr_id, created_at, updated_at) VALUES (5, 'E', 90, 1, NOW(), NOW());

INSERT INTO sales (sku, value, full_price, free_item_sku, created_at, updated_at) VALUES ('A', 3, 130, null, NOW(), NOW());
INSERT INTO sales (sku, value, full_price, free_item_sku, created_at, updated_at) VALUES ('B', 2, 45, 'E', NOW(), NOW());
INSERT INTO sales (sku, value, full_price, free_item_sku, created_at, updated_at) VALUES ('D', 2, 240, null, NOW(), NOW());

INSERT INTO attributes (id, caption, created_at, updated_at) VALUES (1, 'pc', NOW(), NOW());
INSERT INTO attributes (id, caption, created_at, updated_at) VALUES (2, 'kg', NOW(), NOW());