const { APIClient } = require('@liskhq/lisk-client');
const transactions = require('@liskhq/lisk-transactions');
const client = new APIClient([`http://${process.env.HTTP_HOST}:${process.env.HTTP_PORT}`]);
const { getTimestamp } = require('./_helpers.js');

// Get custom transaction types
const CreateBikeTransaction = require('../transactions/create-bike'); // require the newly created transaction type 'HelloTransaction'

// Get 'account'
const account = JSON.parse(fs.readFileSync('./account.json'));

// Get bike ID
const bikeId = 'pubkeyOfAccount--see-create-account.js';

// Create tx
const tx = new CreateBikeTransaction({
  senderPublicKey: account.publicKey,
  recipientId: account.address,
  timestamp: getTimestamp(),
  asset: {
    id: Number(bikeId).toString(),
    pricePerHour: transactions.utils.convertLSKToBeddows("1"),
    deposit: transactions.utils.convertLSKToBeddows("300"),
    latitude: null,
    longitude: null
  }
});

// Sign transaction
tx.sign(account.passphrase);

// Broadcast the tx to the blockchain
const broadcastedTx = client.transactions.broadcast(tx.toJSON())

broadcastedTx.then(() => {
  console.info(`Bike #${bikeId} created`);
})
.catch(error => {
  console.error(error);
});


