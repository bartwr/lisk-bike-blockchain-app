# Lisk.Bike Documentation

In this repository you find the code for running a Lisk sidechain meant for running Lisk.Bike.

The code is based on @JesusTheHun's work in [github.com/JesusTheHun/lisk-bike](https://github.com/JesusTheHun/lisk-bike)

## Introduction: This is the flow

### Preparing the blockchain

- dotenv error: do npm install in the file named 'client'
- make sure that node version 12 is running: nvm use 12

- pm2 start --name lisk-bike-blockchain-app index.js
- add to index.js: configDevnet.modules.http_api.access.public = true;
- run the blockchain: node index.js | npx bunyan -o short

### Preparing client
- in 'tests' edit .env file: HTTP_HOST=brainz.lisk.bike 
- TIME error: make sure that the time is sychronised. Check with time with command: date

### Preparing lock

- Charge lock

- Remove SIM PIN
- Disable SIM voicemail
- Send sms to self via SIM
- Put SIM in lock

- Send SMS to lock containing 'bladiebla-server-ip'

Now the lock is connected to a server running https://github.com/bartwr/commonbike-site/blob/feature/testing/zandbak/testbt10/index.js

### Onboarding lock to the Lisk.Bike blockchain

- Lock sends the 'login' command to server
- Server creates wallet for lock using `./tests/create-account.js`
- Server registers lock onto the blockchain using `./tests/create-bike.js`

Now there's a connection between the lock and the pubkey, in the Lisk blockchain.

## 1. Create bike account (wallet)

    cd tests
    node create-account.test.js renter1
    node create-account.test.js bike1

Based on account creation, you get an address (pubkey).

## 2. Register bike on the blockchain

First, check the balance of bike1:

    node balance.js bike1

Only proceed if bike1 has a balance.

    cd tests
    node create-bike.test.js bike1

The bike is registered using its pubkey. This is the bikes' bikeId.

The server stores the IMEI & bikeId (= pubkey) in its database.
This is how the server knows what bike transactions are related to this IMEI.

## X. Get (max 10) bike locations

    cd tests
    node bike_locations.js

## X. Store GPS location on blockchain

    cd tests
    node update-bike-location.test.js bike1 lat lon
    node update-bike-location.test.js bike1 51.9227954 4.4253305

Every x minutes the server receives the GPS location.
The server looks up the account of the lock in its database, based on IMEI.
The locks privkey then signs the 'update-bike-location' transaction.

## X. Rent bike

    cd tests
    node rent-bike.test.js renter1 bike1

Sometimes you get the 'Invalid transaction timestamp. Timestamp is in the future' error.

If this is the case: Try the command again. Mostly the second time works.

## X. Return bike

    cd tests
    node return-bike.test.js renter1 bike1



NOT USED/TESTED:

## 4. Store lock status on blockchain

If lock opens/closed, the lock sends a command to the server.
The server looks up the account of the lock in its database, based on IMEI.
The locks privkey then signs the 'update-lock-status' transaction.

- Lock: Lock opened
- Lock: Lock closed

## 5. 

User: Please open lock
User: Please close lock
