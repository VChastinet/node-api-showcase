

SELECT * FROM users WHERE email = $1;
INSERT INTO users (email, name, password) VALUES ($1, $2, $3);
SELECT a.*, uf.nome AS nome_estado, uf.uf AS sigla FROM artist AS a INNER JOIN estado AS uf ON uf.id = a.estado;
SELECT a.*, uf.nome AS nome_estado, uf.uf AS sigla FROM artist AS a INNER JOIN estado AS uf ON uf.id = a.estado WHERE estado = $1;
SELECT a.*, uf.nome AS nome_estado, uf.uf AS sigla FROM artist AS a INNER JOIN estado AS uf ON uf.id = a.estado WHERE LOWER(tags) LIKE LOWER('%$1%');
SELECT a.*, uf.nome AS nome_estado, uf.uf AS sigla FROM artist AS a INNER JOIN estado AS uf ON uf.id = a.estado WHERE LOWER(name) LIKE LOWER('%$1%');
UPDATE artist SET (name, instagram_url, instagram_username, url, tags, estado) = ($1, $2, $3, $4, $5, $6) WHERE id = $7;
INSERT INTO artist (name, instagram_url, instagram_username, url, tags, estado) VALUES ($1, $2, $3, $4, $5, $6);