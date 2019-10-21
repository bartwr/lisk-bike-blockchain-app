require('dotenv').config()
const fs = require('fs');
const { exec } = require('child_process');

const CreateBikeTransaction = require('../transactions/create-bike');

// const account = JSON.parse(fs.readFileSync('./accounts/'+process.argv[2]+'.json')); 
const url = `http://${process.env.HTTP_HOST}:${process.env.HTTP_PORT}/api/transactions?type=${CreateBikeTransaction.TYPE}`;
// console.log(url);

exec(`curl ${url}`, (err, stdout, stderr) => {
	if (err) {
		//some err occurred
		console.error(err)
	} else {
		// the *entire* stdout and stderr (buffered)
		const bikes = JSON.parse(stdout).data;
		// const allBikesInfo = JSON.parse(stdout).data;
		// const bikes = allBikesInfo.map(bike)
		console.log(bikes);
		//console.log(`stdout: ${stdout}`);
		//console.log(`stderr: ${stderr}`);
	}
});
