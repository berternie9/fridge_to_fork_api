CREATE DATABASE recipe_finder;

CREATE TABLE recipes (
    id SERIAL INTEGER NOT NULL,
    title TEXT NOT NULL,
    user_id INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    is_owned_by_user BOOLEAN NOT NULL DEFAULT false,
);

CREATE TABLE users (
    id SERIAL INTEGER NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
);