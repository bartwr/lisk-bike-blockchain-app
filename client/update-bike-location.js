require('dotenv').config()
const fs = require('fs');
const { APIClient } = require('@liskhq/lisk-client');
const UpdateBikeLocationTransaction = require('../transactions/update-bike-location.js');

const { getTimestamp, getBike } = require('./_helpers.js');

const client = new APIClient([`http://${process.env.HTTP_HOST}:${process.env.HTTP_PORT}`]);
const bikeAccount = JSON.parse(fs.readFileSync('./accounts/fiets1.json')); 


// const accountOfBike = {
//   publicKey: 'pubkey',
//   address: "ddsajuidsajldq8732"
// }

// const rentedBike = {
//   id: 'pubkey',
//   // Previous location
//   location: {
//     latitude: null,
//     longitude: null,
//   },
// }



const updateBikeLocation = (bikeAccount, bike, coords) => {

  const tx = new UpdateBikeLocationTransaction({
    asset: {
      id: bike.id,
      previousLatitude: bike.location.latitude,
      previousLongitude: bike.location.longitude,
      latitude: Number(coords.latitude).toString(),
      longitude: Number(coords.longitude).toString(),
    },
    senderPublicKey: bikeAccount.publicKey,
    recipientId: bikeAccount.address,
    timestamp: getTimestamp() // dateToLiskEpochTimestamp(new Date()),
  });

  tx.sign(bikeAccount.passphrase);

  return client.transactions.broadcast(tx.toJSON())
  .then(() => tx)
  .catch(err => {
    console.error("err:", err);
    // return Promise.reject(err);
  });
}


// test-coode
getBike(client, bikeAccount).then(bike => {
  console.log("bike:", bike);

  // Current location
  const coords = {
    latitude: "100",
    longitude: "200",
  }

  updateBikeLocation(bikeAccount, bike, coords).then(updateResult => {
    console.log(updateResult);
  });
})

