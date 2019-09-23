//index.js
const { Application, genesisBlockDevnet, configDevnet } = require('lisk-sdk'); // require application class, the default genesis block and the default config for the application

configDevnet.app.label = 'lisk-bike-blockchain-app'; // change the label of the app
//configDevnet.components.storage.user = '<username>'; // If you gave a different user than 'lisk' access to the database lisk_dev, you need to update the username in the config
configDevnet.components.storage.password = 'lisk123'; // replace password with the password for your database user

const app = new Application(genesisBlockDevnet, configDevnet); // create the application instance

// the code block below starts the application and doesn't need to be changed
app
    .run()
    .then(() => app.logger.info('App started...'))
    .catch(error => {
        console.error('Faced error in application', error);
        process.exit(1);
    });
