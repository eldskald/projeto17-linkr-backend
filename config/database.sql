CREATE TABLE users (
	id SERIAL NOT NULL PRIMARY KEY,
	"name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(254) NOT NULL UNIQUE,
	"password" TEXT NOT NULL,
    "profilePictureUrl" TEXT NOT NULL,
    "createdAt" DATE NOT NULL DEFAULT NOW()
);

CREATE TABLE sessions (
    id SERIAL NOT NULL PRIMARY KEY,
    "userId" INTEGER NOT NULL REFERENCES users(id),
    "createdAt" DATE NOT NULL DEFAULT NOW()
);

CREATE TABLE posts (
    id SERIAL NOT NULL PRIMARY KEY,
    "userId" INTEGER NOT NULL REFERENCES users(id),
    "link" TEXT NOT NULL,
    "description" VARCHAR(255),
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE likes (
    id SERIAL NOT NULL PRIMARY KEY,
    "userId" INTEGER NOT NULL REFERENCES users(id),
    "postId" INTEGER NOT NULL REFERENCES posts(id)
);

CREATE TABLE hashtags (
    id SERIAL NOT NULL PRIMARY KEY,
    "name" VARCHAR(254) NOT NULL UNIQUE
);

CREATE TABLE "postsHashtags" (
    id SERIAL NOT NULL PRIMARY KEY,
    "postId" INTEGER NOT NULL REFERENCES posts(id),
    "hashtagId" INTEGER NOT NULL REFERENCES hashtags(id)
);
