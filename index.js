//index.js
const { Application, genesisBlockDevnet, configDevnet } = require('lisk-sdk'); // require application class, the default genesis block and the default config for the application
const CreateBikeTransaction = require('./transactions/create-bike'); // require the newly created transaction type 'HelloTransaction'
const FaucetTransaction = require('./transactions/faucet'); // require the newly created transaction type 'HelloTransaction'
const UpdateBikeLocationTransaction = require('./transactions/update-bike-location'); // require the newly created transaction type 'HelloTransaction'
const HelloTransaction = require('./transactions/hello_transaction'); // require the newly created transaction type 'HelloTransaction'

configDevnet.app.label = 'lisk-bike-blockchain-app'; // change the label of the app
configDevnet.components.storage.password = 'lisk123'; // replace password with the password for your database user

// Create the application instance
const app = new Application(genesisBlockDevnet, configDevnet);

// Register custom transactions
app.registerTransaction(CreateBikeTransaction);
app.registerTransaction(FaucetTransaction);
app.registerTransaction(UpdateBikeLocationTransaction);
app.registerTransaction(HelloTransaction);

// the code block below starts the application and doesn't need to be changed
app
    .run()
    .then(() => app.logger.info('App started...'))
    .catch(error => {
        console.error('Faced error in application', error);
        process.exit(1);
    });
