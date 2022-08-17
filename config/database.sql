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

--sprint 2


CREATE TABLE "follows" (
	"id" serial NOT NULL PRIMARY KEY,
	"followerId" int NOT NULL,
	"followedId" int NOT NULL CHECK ("followedId"!="followerId")
);


CREATE TABLE "reposts" (
	"id" serial NOT NULL PRIMARY KEY,
	"reposterId" int NOT NULL,
	"repostedPost" int NOT NULL,
	"createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);



CREATE TABLE "comments" (
	"id" serial NOT NULL PRIMARY KEY,
	"postId" int NOT NULL,
	"comment" TEXT NOT NULL,
	"userId" int NOT NULL,
	"createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);




ALTER TABLE "follows" ADD CONSTRAINT "follows_fk0" FOREIGN KEY ("followerId") REFERENCES "users"("id");
ALTER TABLE "follows" ADD CONSTRAINT "follows_fk1" FOREIGN KEY ("followedId") REFERENCES "users"("id");

ALTER TABLE "reposts" ADD CONSTRAINT "reposts_fk0" FOREIGN KEY ("reposterId") REFERENCES "users"("id");
ALTER TABLE "reposts" ADD CONSTRAINT "reposts_fk1" FOREIGN KEY ("repostedPost") REFERENCES "posts"("id");

ALTER TABLE "comments" ADD CONSTRAINT "comments_fk0" FOREIGN KEY ("postId") REFERENCES "posts"("id");
ALTER TABLE "comments" ADD CONSTRAINT "comments_fk1" FOREIGN KEY ("userId") REFERENCES "users"("id");










