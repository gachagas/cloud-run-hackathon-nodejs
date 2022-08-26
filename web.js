const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// const thebody = {
//   "_links": {
//     "self": {
//       "href": "https://YOUR_SERVICE_URL"
//     }
//   },
//   "arena": {
//     "dims": [4, 3], // width, height
//     "state": {
//       "https://cloud-run-hackathon-nodejs-oz34qothoq-uc.a.run.app/": {
//         "x": 0, // zero-based x position, where 0 = left
//         "y": 0, // zero-based y position, where 0 = top
//         "direction": "N", // N = North, W = West, S = South, E = East
//         "wasHit": false,
//         "score": 0
//       }

//     }
//   }
// }

app.use(bodyParser.json());

app.get('/', function (req, res) {
  const width = thebody.arena.dims[0]
  const height = thebody.arena.dims[1]
  const me = "https://cloud-run-hackathon-nodejs-oz34qothoq-uc.a.run.app/"

  const dir = thebody.arena.state[me].wasHit;
  console.log("i am " + me)
  console.log("details ", dir);
  res.send('Let the battle begin!');


});

app.post('/', function (req, res) {
  console.log(req.body);
  const moves = ['F', 'T', 'L', 'R'];
  res.send(moves[Math.floor(Math.random() * moves.length)]);
});

app.listen(process.env.PORT || 8080);
