DROP TABLE tempData;

CREATE TABLE user (
  -- UUID compliant with RFC 4122
  userId BINARY(16) PRIMARY KEY NOT NULL,
  -- JSON Stringified uphold user object
  upholdUserObject TEXT,
  -- wallet address of the user
  walletAddress BINARY(20) PRIMARY KEY NOT NULL,
);
