The Server Code :

Because of the time and challanges that came with the deployments
I couldnt fit in the main repository the servers but their code can be shown in here:

The MongoDb Server Code :

```
require("dotenv").config();
var cors = require("cors");
const { MongoClient } = require("mongodb");
const express = require("express");
const uri = `mongodb+srv://maxim:${process.env.MONGODB_PASSWORD}@codeblocks.6ywgpyd.mongodb.net/?retryWrites=true&w=majority`;
const app = express();
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());

let db;
let collection;
console.log("Before connecting to the database");
client.connect();
db = client.db("Moveo-HA-DB");
collection = db.collection("Code-Blocks");
app.use(express.json());

app.get("/", async (req, res) => {
  const Code = await collection.find({}).limit(1).toArray();
  res.send(Code);
});

// READ
app.get("/Code-Block", async (req, res) => {
  const devices = await collection.find({}).limit(4).toArray();
  res.send(devices);
});
// UPDATE
app.put("/Code-Blocks-Update/:Title", async (req, res) => {
  const Title = req.params.Title;
  const updatedDevice = req.body;
  const device = await collection.find({ Title: Title }).toArray();
  const result = await collection.updateOne(
    { Title: Title },
    {
      $set: { Code: updatedDevice.code },
      $currentDate: { lastUpdated: true },
    }
  );
  res.send(result);
});

//INSERT
app.put("/Code-Blocks-Insert", async (req, res) => {
  const Title = req.params.Title;
  const NewCode = req.body.data;
  const device = await collection.findOne({ Title: Title });

  let result1;
  if (device) {
    //return that there's allready an existing object with the same title
    result1 = true;
  } else {
    const result = await collection.insertOne(NewCode);
    result1 = result;
  }
  res.send(result1);
});
// DELETE
app.delete("/devices/:id", async (req, res) => {
  const id = req.params.id;
  const result = await collection.deleteOne({ _id: id });
  res.send(result);
});

app.listen(process.env.PORT || 2999, () => {
  console.log("Express app listening on port 2999!");
});
```

The socketio server code:

```
require("dotenv").config();
var cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const ObjectId = require("mongodb").BSON;
const express = require("express");
const { Socket } = require("dgram");
const app = express();

app.use(express.json());
app.use(cors());
const server = http.createServer(app);
//https://maxim-moveo-home-assignment.netlify.app client web url
//http://localhost:3000 client local url
const io = new Server(server, {
  cors: {
    origin:
      "https://63ecf070856c0000083ae0ec--fluffy-granita-65639e.netlify.app",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("updateText", (newText) => {
    console.log(`Text updated: ${newText}`);
    io.emit("updateText", newText);
  });
});

//process.env.PORT ||
server.listen(process.env.PORT || 3001, () => {
  console.log("Server (socket.io) is listening on http://localhost:3001");
});
```
