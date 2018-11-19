-- GET USER
SELECT * FROM users WHERE email = $1;
-- * --

-- CREATE NEW USER
INSERT INTO users (email, name, password) VALUES ($1, $2, $3);
-- * --

-- GET ALL ARTISTS
SELECT a.id, a.name, a.instagram_username, a.instagram_url, a.url, uf.nome AS estado, uf.uf AS sigla
FROM artist AS a
       INNER JOIN estado AS uf ON uf.id = a.estado
-- * --

-- GET ALL ARTISTS BY UF
SELECT a.id, a.name, a.instagram_username, a.instagram_url, a.url, uf.nome AS estado, uf.uf AS sigla
FROM artist AS a
       INNER JOIN estado AS uf ON uf.id = a.estado
       WHERE uf.id = $1;
-- * --

-- GET ALL ARTISTS BY TAGS
SELECT a.id, a.name, a.instagram_username, a.instagram_url, a.url, t.name AS tags, uf.nome AS estado, uf.uf AS sigla
FROM artist AS a
       INNER JOIN estado AS uf ON uf.id = a.estado
       LEFT JOIN artists_tags AS a_t ON a_t.artist_id = a.id
       LEFT JOIN tags t on a_t.tag_id = t.id
       WHERE t.id = $1;
-- * --

-- GET ARTIST BY NAME
SELECT a.id, a.name, a.instagram_username, a.instagram_url, a.url, t.name AS tags, uf.nome AS estado, uf.uf AS sigla
FROM artist AS a
       INNER JOIN estado AS uf ON uf.id = a.estado
       LEFT JOIN artists_tags AS a_t ON a_t.artist_id = a.id
       LEFT JOIN tags t on a_t.tag_id = t.id WHERE LOWER(a.name) LIKE LOWER('%$1%');
-- * --

-- GET ARTIST'S TAGS
SELECT t.*
FROM tags AS t
       INNER JOIN artists_tags AS a_t ON a_t.tag_id = t.id
       LEFT JOIN artist AS a on a_t.artist_id = a.id
WHERE a.id = 1;
-- *--

-- UPDATE ARTIST
UPDATE artist SET (name, instagram_url, instagram_username, url, estado) = ($1, $2, $3, $4, $5) WHERE id = $6;
    -- deleted tags
    DELETE FROM artists_tags WHERE tag_id = $1 AND artist_id = $2;
    -- added tags
    SELECT id FROM tags WHERE LOWER(name) = LOWER($1);
    INSERT INTO artists_tags(artist_id, tag_id) VALUES ($1, $2);
        -- tag doesn't exists
        INSERT INTO tags (name) VALUES ($1);
        INSERT INTO artists_tags(artist_id, tag_id) VALUES ($1, $2);
-- * --

-- CREATE NEW ARTIST
INSERT INTO artist (name, instagram_url, instagram_username, url, estado) VALUES ($1, $2, $3, $4, $5);
    -- has tags
    SELECT id FROM tags WHERE LOWER(name) = LOWER($1);
    INSERT INTO artists_tags(artist_id, tag_id) VALUES ($1, $2);
        -- tag doesn't exists
        INSERT INTO tags (name) VALUES ($1);
        INSERT INTO artists_tags(artist_id, tag_id) VALUES ($1, $2);
-- * --