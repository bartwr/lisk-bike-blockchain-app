const {UpdateBikeLocationTransaction} = require '../transactions/update-bike-location.js';

const accountOfBike = {
  publicKey: 'pubkey',
  address: "ddsajuidsajldq8732"
}

const rentedBike = {
  id: 'pubkey',
  // Previous location
  location: {
    latitude: null,
    longitude: null,
  },
}

// Current location
const coords: {
  latitude: null,
  longitude: null,
}

const tx = new UpdateBikeLocationTransaction({
  asset: {
    id: rentedBike.id,
    previousLatitude: rentedBike.location.latitude,
    previousLongitude: rentedBike.location.longitude,
    latitude: Number(coords.latitude).toString(),
    longitude: Number(coords.longitude).toString(),
  },
  senderPublicKey: accountOfBike.publicKey,
  recipientId: accountOfBike.address,
  timestamp: dateToLiskEpochTimestamp(new Date()),
});
