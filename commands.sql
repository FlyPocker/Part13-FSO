CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes integer DEFAULT 0
);

INSERT INTO blogs (author, url, title) VALUES ('Dan Abramov', 'https://overreacted.io', 'Overreacted');
INSERT INTO blogs (url, title, likes) VALUES ('https://fullstackopen.com', 'Full Stack Open', 10);

DROP TABLE blogs;