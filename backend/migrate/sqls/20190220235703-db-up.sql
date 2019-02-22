CREATE TABLE users (
    id    INTEGER       PRIMARY KEY ASC AUTOINCREMENT,
    email VARCHAR (255) UNIQUE
                        NOT NULL,
    pass  VARCHAR (255) NOT NULL
);
