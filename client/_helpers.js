const { EPOCH_TIME } = require('@liskhq/lisk-constants');

// Function that generates timestamp
export const getTimestamp = () => {
  const millisSinceEpoc = Date.now() - Date.parse(EPOCH_TIME);
  const inSeconds = ((millisSinceEpoc) / 1000).toFixed(0);
  return  parseInt(inSeconds);
};
