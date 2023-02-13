require("dotenv").config();
var cors = require("cors");
const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").BSON;
const express = require("express");
const uri = `mongodb+srv://maxim:${process.env.MONGODB_PASSWORD}@codeblocks.6ywgpyd.mongodb.net/?retryWrites=true&w=majority`;
const app = express();
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db;
let collection;
app.use(cors());
console.log("Before connecting to the database");
client.connect();
db = client.db("Moveo-HA-DB");
collection = db.collection("Code-Blocks");
app.use(express.json());

app.post("/CodeBlocks", async (req, res) => {
  const newDevice = req.body;
  const result = await collection.insertOne(newDevice);
  res.send(result.ops[0]);
});

// READ
app.get("/Code-Block", async (req, res) => {
  const devices = await collection.find({}).limit(4).toArray();
  console.log(devices);
  res.send(devices);
});
// UPDATE
app.put("/Code-Blocks-Update/:Title", async (req, res) => {
  const Title = req.params.Title;
  const updatedDevice = req.body;
  console.log(updatedDevice.code);
  const devices = await collection.find().toArray();
  const device = await collection.find({ Title: Title }).toArray();
  console.log(devices);
  console.log(device);
  const result = await collection.updateOne(
    { Title: Title },
    {
      $set: { Code: updatedDevice.code },
      $currentDate: { lastUpdated: true },
    }
  );
  console.log(result);
  res.send(result);
});

// DELETE
app.delete("/devices/:id", async (req, res) => {
  const id = req.params.id;
  const result = await collection.deleteOne({ _id: id });
  res.send(result);
});

app.listen(2999, () => {
  console.log("Express app listening on port 2999!");
});
