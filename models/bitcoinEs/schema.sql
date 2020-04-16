DROP TABLE btcRequests;
DROP TABLE btcBlocks;
DROP TABLE btcDeposits;

CREATE TABLE btcRequests (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  satoshiAmount INT NOT NULL,
  esAddress BINARY(20) NOT NULL,
  btcDepositTxHash BINARY(32) UNIQUE,
  esAmountTwoDec INT, -- es amount * 100
  esWithdrawalTxHash BINARY(32) UNIQUE,
  status enum('waiting', 'suspended', 'btcdeposited', 'espending', 'essent') DEFAULT 'waiting',
  createdAt TIMESTAMP DEFAULT NOW(),
  INDEX(satoshiAmount, esAddress, status, btcDepositTxHash)
);

-- for recording the actual transaction responses from btc provider in case of discreprency
-- also the table will be checked for
CREATE TABLE btcBlocks (
  blockHeight INT NOT NULL PRIMARY KEY,
  blockHash BINARY(32) NOT NULL,
  -- transactions array will be stored in JSON encoded
  transactions TEXT,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);

-- transactions waiting for confirmation these transactions also might be
CREATE TABLE btcDeposits (
  transactionHash BINARY(32) PRIMARY KEY NOT NULL,
  blockHeight INT NOT NULL,
  value INT NOT NULL,
  btcRequestId INT,
  INDEX(blockHeight, value)
);



INSERT INTO btcRequests (satoshiAmount, esAddress)
  SELECT * FROM (SELECT
    10000002,
    0x1234567812345678123456781234567812345678
  ) AS tmp
  WHERE NOT EXISTS (
    SELECT satoshiAmount FROM btcRequests WHERE btcDepositTxHash = NULL
  ) LIMIT 1;

INSERT INTO btcRequests (satoshiAmount, esAddress)
  SELECT * FROM (SELECT
    10000032,
    0x9234567812345678123456781234567812345678
  ) AS tmp
  WHERE NOT EXISTS (
    SELECT satoshiAmount FROM btcRequests WHERE btcDepositTxHash = NULL
  ) LIMIT 1;

INSERT INTO btcDeposits (transactionHash, blockHeight, value)
  VALUES (0x3434567812345678123456781234567812345678123456781234567812345678, 2394, 10000002);

INSERT INTO btcDeposits (transactionHash, blockHeight, value, btcRequestId)
  VALUES (0x123456781234567812345678123456781234567812345678123456781234567A, 2395, 10000002, 45);

INSERT INTO btcDeposits (transactionHash, blockHeight, value)
  VALUES (0x5634567812345678123456781234567812345678123456781234567812345679, 2394, 10000032);


SELECT * FROM btcRequests;
SELECT * FROM btcDeposits;


-- // an invalid select which also collects finalised entries
-- SELECT * FROM btcRequests
--   INNER JOIN btcDeposits
--   ON btcRequests.satoshiAmount = btcDeposits.value;

-- // a select which only joins fresh btcRequests and fresh btcDeposits
-- SELECT * FROM btcRequests
--   INNER JOIN btcDeposits
--   ON btcRequests.status = 'waiting'
--     AND btcDeposits.btcRequestId IS NULL
--     AND btcDeposits.blockHeight < 10000
--     AND btcRequests.satoshiAmount = btcDeposits.value;

-- // select waiting for confirmation transactions of user
SELECT
  btcRequests.id AS id,
  btcDeposits.transactionHash AS transactionHash,
  btcDeposits.blockHeight AS blockHeight
FROM btcRequests
  INNER JOIN btcDeposits
  ON btcRequests.status = 'waiting'
    AND btcDeposits.btcRequestId IS NULL
    AND btcRequests.satoshiAmount = btcDeposits.value
    AND btcRequests.esAddress = 0x1234567812345678123456781234567812345678;




-- // to update two tables at once
-- UPDATE btcRequests
--   INNER JOIN btcDeposits
--   ON btcRequests.status = 'waiting'
--     AND btcDeposits.btcRequestId IS NULL
--     AND btcDeposits.blockHeight < 10000
--     AND btcRequests.satoshiAmount = btcDeposits.value
--   SET
--     btcDeposits.btcRequestId = btcRequests.id,
--     btcRequests.btcDepositTxHash = btcDeposits.transactionHash,
--     btcRequests.status = 'btcdeposited';



SELECT * FROM btcRequests;
SELECT * FROM btcDeposits;
