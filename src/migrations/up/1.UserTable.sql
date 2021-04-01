START TRANSACTION;
  CREATE TABLE "user" (
      id serial PRIMARY KEY,
      fname varchar NOT NULL,
      lname varchar NOT NULL,
  );
COMMIT;