DROP TABLE users;
DROP TABLE transfers;

CREATE TABLE users (
  -- UUID compliant with RFC 4122
  userId BINARY(16) PRIMARY KEY NOT NULL,
  -- JSON Stringified uphold user object
  upholdUserObject TEXT,
  -- wallet address of the user
  walletAddress BINARY(20),
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP
);

CREATE TABLE transfers (
  -- UUID compliant with RFC 4122
  transactionId BINARY(16) PRIMARY KEY NOT NULL,
  -- JSON Stringified uphold user object
  upholdTransactionObject TEXT,
  -- UUID compliant with RFC 4122
  userId BINARY(16) NOT NULL,
  btcAmount FLOAT,
  esAmount FLOAT,
  walletAddress BINARY(20) NOT NULL,
  status ENUM('pending', 'cancelled', 'received', 'processed'),
  -- transaction of processed ES withdrawal
  txHash BINARY(32),
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP,
  INDEX(userId, status)
);
