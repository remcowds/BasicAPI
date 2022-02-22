const createServer = require('./createServer');

//main omdat anders await niet werkt
async function main() {
	// loggen welke waarde de NODE_ENV krijgt
	// .env leeg --> standaard development
	// const selectedConfig = config.get('test.eig1');
	// console.log(selectedConfig, config.get('env') === selectedConfig);
	try {
		const server = await createServer();
		await server.start();

		const onClose = async () => {
			await server.stop();
			process.exit(0);
		};

		process.on('SIGTERM', onClose); //algemeen signaal bij afsluiten
		process.on('SIGQUIT', onClose); //zelfde + core dump
	} catch (error) {
		process.exit(-1);
	}
}

main();