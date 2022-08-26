const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { ConsoleSqlOutlined } = require("@ant-design/icons");

const thebody = {
  _links: {
    self: {
      href: "https://YOUR_SERVICE_URL",
    },
  },
  arena: {
    dims: [4, 3], // width, height
    state: {
      "https://cloud2-run-hackathon-nodejs-oz34qothoq-uc.a.run.app/": {
        x: 0, // zero-based x position, where 0 = left
        y: 0, // zero-based y position, where 0 = top
        direction: "N", // N = North, W = West, S = South, E = East
        wasHit: true,
        score: 420,
      },
      "https://cloud-run-hackathon-nodejs-oz34qothoq-uc.a.run.app/": {
        x: 3, // zero-based x position, where 0 = left
        y: 4, // zero-based y position, where 0 = top
        direction: "E", // N = North, W = West, S = South, E = East
        wasHit: true,
        score: 0,
      },
      "https://cloud3-run-hackathon-nodejs-oz34qothoq-uc.a.run.app/": {
        x: 6, // zero-based x position, where 0 = left
        y: 6, // zero-based y position, where 0 = top
        direction: "N", // N = North, W = West, S = South, E = East
        wasHit: true,
        score: 100,
      },
    },
  },
};

app.use(bodyParser.json());

app.get("/", function (req, res) {
  req.body = thebody; //remove this when done
  const moves = ["F", "T", "L", "R"];
  const me = "https://cloud-run-hackathon-nodejs-oz34qothoq-uc.a.run.app/";

  // create player map
  const players = new Map();
  Object.entries(req.body.arena.state).forEach((x, index) => {
    if (x[0] == me) {
      players.set("me", x[1]);
    } else {
      players.set(index, x[1]);
    }
  });

  // get my data
  const meX = players.get("me").x;
  const meY = players.get("me").y;
  const meDir = players.get("me").direction;

  // if there is a viable target in front, shoot.
  for (const [key, value] of players) {
    if (key == "me") {
      continue;
    }

    if (meDir == "N") {
      if (value.x == meX) {
        if (value.y == meY + 1 || value.y == meY + 2 || value.y == meY + 3) {
          res.send(moves[1]);
        }
      }
    }

    if (meDir == "S") {
      if (value.x == meX) {
        if (value.y == meY - 1 || value.y == meY - 2 || value.y == meY - 3) {
          res.send(moves[1]);
        }
      }
    }

    if (meDir == "W") {
      if (value.y == meY) {
        if (value.x == meX - 1 || value.x == meX - 2 || value.x == meX - 3) {
          res.send(moves[1]);
        }
      }
    }

    if (meDir == "E") {
      if (value.y == meY) {
        if (value.x == meX + 1 || value.x == meX + 2 || value.x == meX + 3) {
          res.send(moves[1]);
        }
      }
    }
  }

  // look for the closest dry enemy
  let minDist = 99999;
  let distance = 0;
  let target;
  for (const [key, value] of players) {
    if (key == "me") {
      continue;
    }
    distance = Math.sqrt(
      Math.pow(value.x - meX, 2) + Math.pow(value.y - meY, 2)
    );

    if (value.wasHit && distance < minDist) {
      minDist = distance;
      target = key;
    }
  }

  console.log("Targer is " + target);

  // check if there is viable target in front

  // calculate move

  // const dir = thebody.arena.state[me].wasHit;
  // console.log("i am " + me);
  // console.log("details ", dir);
  res.send("Let the battle begin!");
});

app.post("/", function (req, res) {
  // req.body = thebody; //remove this when done
  const moves = ["F", "T", "L", "R"];
  const me = "https://cloud-run-hackathon-nodejs-oz34qothoq-uc.a.run.app/";

  // create player map
  const players = new Map();
  Object.entries(req.body.arena.state).forEach((x, index) => {
    if (x[0] == me) {
      players.set("me", x[1]);
    } else {
      players.set(index, x[1]);
    }
  });

  // get my data
  const meX = players.get("me").x;
  const meY = players.get("me").y;
  const meDir = players.get("me").direction;

  // if there is a viable target in front, shoot.
  for (const [key, value] of players) {
    if (key == "me") {
      continue;
    }

    if (meDir == "N") {
      if (value.x == meX) {
        if (value.y == meY + 1 || value.y == meY + 2 || value.y == meY + 3) {
          res.send(moves[1]);
        }
      }
    }

    if (meDir == "S") {
      if (value.x == meX) {
        if (value.y == meY - 1 || value.y == meY - 2 || value.y == meY - 3) {
          res.send(moves[1]);
        }
      }
    }

    if (meDir == "W") {
      if (value.y == meY) {
        if (value.x == meX - 1 || value.x == meX - 2 || value.x == meX - 3) {
          res.send(moves[1]);
        }
      }
    }

    if (meDir == "E") {
      if (value.y == meY) {
        if (value.x == meX + 1 || value.x == meX + 2 || value.x == meX + 3) {
          res.send(moves[1]);
        }
      }
    }
  }

  res.send(moves[Math.floor(Math.random() * moves.length)]);
});

app.listen(process.env.PORT || 8080);
