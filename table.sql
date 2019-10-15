create table users (
    name text,
    username text,
    password text,
    highscore integer,
    level integer,
    admin boolean
);

create table logger(
    id serial not null,
    username text,
    event text,
    time text
);