const express = require("express");
const dotenv = require("dotenv");
const http = require("http");
//Load env vars
dotenv.config({ path: "./config/config.env" });

const bodyParser = require("body-parser");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 4000;

const app = express();
let webSocketServer = http.createServer(app);
var socketio = require("socket.io")(webSocketServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}))
app.use(
  bodyParser.json({ limit: "50mb", extended: true, parameterLimit: 50000 })
);
app.use(cookieParser());
if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}

app.use(express.static(__dirname + '/public'));

// require("./sockets/index")(socketio);
require("./routes/index")(app);

const connect = mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});
connect.then(
  (db) => {
    webSocketServer.listen(PORT, "localhost", () => {
      console.log("server running", PORT);
    });
  },
  (err) => {
    console.log(err);
  }
);  