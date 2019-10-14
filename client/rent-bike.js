require('dotenv').config()
const fs = require('fs');
const { APIClient } = require('@liskhq/lisk-client');
const RentBikeTransaction = require('../transactions/rent-bike');

const { getTimestamp } = require('./_helpers.js');

const client = new APIClient([`http://${process.env.HTTP_HOST}:${process.env.HTTP_PORT}`]);
const renterAccount = JSON.parse(fs.readFileSync('./accounts/renter1.json')); 
const bikeAccount = JSON.parse(fs.readFileSync('./accounts/fiets1.json')); 

const getBike = (account) => {
  // console.log("account:",account.publicKey);

  return client.accounts.get({
    //address: '1391163426858015119L'
    address: account.address
  }).then(response => {
    const bikes = response.data[0].asset;
    // console.log("bikes:", bikes);
    const thisBike = bikes.bikes[account.address];
    // console.log("thisBike:", thisBike);
    return thisBike;
  }).catch(err => {
    console.error("err1",err);
  });
}

const rentBike = (bike, renterAccount) => {

    const tx =  new RentBikeTransaction({
        asset: {
            id: bike.id, // XXX or use bike.address
        },
        amount: bike.deposit,
        senderPublicKey: renterAccount.publicKey,
        recipientId: bike.id,
        timestamp: getTimestamp(),
    });
    // console.log(tx);

    tx.sign(renterAccount.passphrase);

    return client.transactions.broadcast(tx.toJSON())
    .then(() => tx)
    .catch(err => {
      console.error("err2:", err);
      // return Promise.reject(err);
    });
  }

// test-coode
getBike(bikeAccount).then(bike => {
  console.log("bike:", bike);

  rentBike(bike, renterAccount).then(rentResult => {
    console.log(rentResult);
  });
})

