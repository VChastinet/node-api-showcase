-- GET USER
SELECT * FROM users WHERE email = $1;
-- * --

-- CREATE NEW USER
INSERT INTO users (email, name, password) VALUES ($1, $2, $3);
-- * --

-- GET ALL ARTISTS
SELECT a.id, a.name, a.instagram_username, a.instagram_url, a.url, a.tags uf.nome AS estado, uf.uf AS sigla
FROM artist AS a
       INNER JOIN estado AS uf ON uf.id = a.estado
-- * --

-- GET ALL ARTISTS BY UF
SELECT a.id, a.name, a.instagram_username, a.instagram_url, a.url, a.tags, uf.nome AS estado, uf.uf AS sigla
FROM artist AS a
       INNER JOIN estado AS uf ON uf.id = a.estado
       WHERE uf.id = $1;
-- * --

-- GET ALL ARTISTS BY TAGS
SELECT a.id, a.name, a.instagram_username, a.instagram_url, a.url, a.tags, uf.nome AS estado, uf.uf AS sigla
FROM artist AS a
       INNER JOIN estado AS uf ON uf.id = a.estado
       WHERE tags LIKE LOWER('%${tag}%');
-- * --

-- GET ARTIST BY NAME
SELECT a.id, a.name, a.instagram_username, a.instagram_url, a.url, a.tags, uf.nome AS estado, uf.uf AS sigla
FROM artist AS a
       INNER JOIN estado AS uf ON uf.id = a.estado
       WHERE LOWER(a.name) LIKE LOWER('%${name}%');
-- * --

-- UPDATE ARTIST
UPDATE artist SET (name, instagram_url, instagram_username, url, estado, tags) = ($1, $2, $3, $4, $5, $6) WHERE id = $7;
-- * --
-- CREATE NEW ARTIST
INSERT INTO artist (name, instagram_url, instagram_username, url, estado, tags) VALUES ($1, $2, $3, $4, $5, $6);
-- * --