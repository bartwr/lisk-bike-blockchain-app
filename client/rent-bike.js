require('dotenv').config()
const { APIClient } = require('@liskhq/lisk-client');
const RentBikeTransaction = require('../transactions/rent-bike');

const { getTimestamp } = require('./_helpers.js');

const client = new APIClient([`http://${process.env.HTTP_HOST}:${process.env.HTTP_PORT}`]);

const getBike = () => {
  return client.accounts.get({
    address: '1391163426858015119L'
  }).then(response => {
    console.log(response.data[0].asset);
  }).catch(error => {
    console.error(error);
  });
}

const bike = getBike();

const rentBike = (bike) => {
  return (dispatch, getState) => {

    const tx =  new RentBikeTransaction({
        asset: {
            id: bike.id,
        },
        amount: bike.deposit,
        senderPublicKey: getState().account.publicKey,
        recipientId: bike.companyAccount.address,
        timestamp: getTimestamp(),
    });

    tx.sign(getState().account.passphrase);

    return client.transactions.broadcast(tx.toJSON())
    .then(() => tx)
    .catch(err => {
        return Promise.reject(err);
    });
  }
}
