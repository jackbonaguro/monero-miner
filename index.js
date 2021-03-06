const CoinHive = require('coin-hive');
const http = require('http');  

(async () => {

  var os = require('os'), cpuCount = os.cpus().length;

  var threads = Math.max(1,Math.floor(cpuCount/4));

  // Create miner
  const miner = await CoinHive('vLAANrDcATRQM8RI1nCpFADCdvS0sg4O', {throttle: 0.85, threads: threads}); // Coin-Hive's Site Key

  // Start miner
  await miner.start();
 
  // Listen on events
  miner.on('found', () => console.log('Found!!'))
  miner.on('accepted', () => console.log('Accepted!!'))
  miner.on('update', data => console.log(`
    Hashes per second: ${data.hashesPerSecond}
    Total hashes: ${data.totalHashes}
    Accepted hashes: ${data.acceptedHashes}
  `));
 
  const requestHandler = (request, response) => {  
    console.log(request.url)
    response.end('Running the Monero Miner!!')
  }

  const server = http.createServer(requestHandler)

  server.listen(process.env.PORT, (err) => {  
    if (err) {
      return console.log('something bad happened', err)
    }

    console.log(`server is listening`)
  })

  // Stop miner
  //setTimeout(async () => await miner.stop(), 60000);
})();