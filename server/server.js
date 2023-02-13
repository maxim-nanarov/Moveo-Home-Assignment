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

let db;
let collection;
app.use(cors());
console.log("Before connecting to the database");
client.connect(async (err) => {
  if (err) {
    console.error(err);
    return;
  }
});
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
app.put("/Code-Blocks-Update/:id", async (req, res) => {
  const id = req.params.id;
  const updatedDevice = req.body;
  console.log(updatedDevice.code);
  try {
    const result = await collection.updateOne(
      { _id: id },
      {
        $set: { Code: updatedDevice.code },
        $currentDate: { lastUpdated: true },
      }
    );
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Update failed" });
  }
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
