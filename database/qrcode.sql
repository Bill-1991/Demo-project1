CREATE TABLE sites(id INTEGER PRIMARY KEY, name TEXT, photo TEXT, count INT);
CREATE TABLE vcards(id INTEGER PRIMARY KEY, name TEXT, photo TEXT, firstname TEXT, lastname TEXT, title TEXT,
 vcardphoto TEXT, email TEXT, address TEXT, tel INT, contacturl TEXT, notes TEXT, count INT);
CREATE TABLE previews(id INTEGER PRIMARY KEY, firstname TEXT, lastname TEXT, title TEXT,
 vcardphoto TEXT, email TEXT, address TEXT, tel INT, contacturl TEXT, notes TEXT);
INSERT INTO sites(id, name, photo) VALUES (1, 'lynxweb.eu', 'dummy photo');

SELECT * FROM sites;
SELECT vcardphoto FROM vcards;
SELECT id, firstname, lastname, title, vcardphoto FROM previews;

--DROP TABLE sites;
--DROP TABLE vcards;
--DROP TABLE previews;

--.schema