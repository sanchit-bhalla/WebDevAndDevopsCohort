const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
const port = process.env.PORT || 3000;
const JWT_SECRET = "xxx!@#%$#@acdg123!";

app.use(express.json());

// Our in memory DB
const users = [];

const generateToken = () => {
  let options = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ];

  let n = options.length;
  let token = "";
  for (let i = 0; i < 32; i++) {
    token += options[Math.floor(Math.random() * n)];
  }
  return token;
};

function auth(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).send({
          message: "Unauthorized",
        });
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    res.status(401).send({
      message: "Unauthorized",
    });
  }
}

// Way 1
app.use(express.static("./public"));

// Way 2
// app.get("/", (req, res) => {
//     res.sendFile(__dirname + "/public/index.html")
// })

app.post("/signup", (req, res) => {
  const { username, password } = req.body;

  try {
    users.push({
      username,
      password,
    });

    res.send({
      message: "You have signed up successfully !",
    });
  } catch (err) {
    res.send({
      message: "Error occurs while signing up. Please try again later.",
    });
  }
});

app.post("/signin", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    // const token= generateToken()
    const token = jwt.sign(
      {
        username,
      },
      JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    user.token = token;
    res.send({
      token,
    });
    console.log(users);
  } else {
    res.status(403).send({ message: "Invalid username or password" });
  }
});

app.get("/me", auth, (req, res) => {
  const user = req.user;

  res.send({
    username: user.username,
  });
});

app.listen(port, (err) => {
  console.log("server is runnig on port: " + port);
});
